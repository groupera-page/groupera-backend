const { User, validate } = require("../models/User.model");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
const Group = require("../models/Group.model");
const jwt = require("jsonwebtoken");
const { getEvents } = require("../utils/googleCalendar");

exports.signup = async (req, res, next) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already exists!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user = await new User({ ...req.body, password: hashPassword }).save();
      // await sendEmail(user.email, "Verify Email", user.code);

    const { _id, email } = user;
    const payload = { _id, email };

    const options = {
      algorithm: "HS256",
      expiresIn: "6h",
    };

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, options);

    res.status(201).send({
      authtoken: authToken,
    });

  } catch (error) {
    res.status(500).send({ message: `${error}` });
  }
};

exports.verified = async (req, res, next) => {
  try {
    const user = await User.findOne({ code: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid code" });
    await User.updateOne({ _id: user._id }, { verified: true, code: "" });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).send({ message: `${error}` });
  }
};

exports.userId = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).populate("groups");
    res.status(200).send({ user });
  } catch (error) {
    res.status(200).send({ message: "Email verified successfully" });
  }
};

exports.viewUserMeetings = async (req, res, next) => {
  try {
    let user = await User.findOne({ _id: req.params.id });
    let start = '2023-10-03T00:00:00.000Z';
    let end = '2024-10-06T00:00:00.000Z';
    let event = await getEvents(start, end)
    let mappedEvent = user.meetings.map((meetings) => event.filter((events) => events.id.includes(meetings)))
    res.status(200).send(mappedEvent);
  } catch (error) {
    res.status(500).send(`${error}`);
  }
};

exports.userEdit = async (req, res, next) => {
  try {
    let user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid Link" });

    user = await User.updateOne({ _id: req.params.id }, { ...req.body });

    res.status(200).send({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).send({ message: `${error}` });
  }
};

exports.userDelete = async (req, res, next) => {
  try {
    let user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid Link" });

    const data = await Group.updateMany(
      {
        users: {
          $in: [req.params.id],
        },
        moderator: req.params.id
      },
      {
        $pull: {
          users: req.params.id,
          moderator: req.params.id
        },
      }
    );

    user = await User.deleteOne({ _id: req.params.id });

    res.status(200).send({ message: "User deleted successfully", data });
  } catch (error) {
    res.status(500).send({ message: `${error}` });
  }
};

exports.verifyToken = (req, res, next) => {
  console.log(`req.payload`, req.payload);
  res.status(200).json(req.payload);
};
