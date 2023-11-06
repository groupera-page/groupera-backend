const { User, validate } = require("../models/User.model");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
const { Group } = require("../models/Group.model");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const { getEvents, deleteEvent } = require("../utils/googleCalendar");

exports.signup = async (req, res, next) => {
  const { email, password, moderator } = req.body;
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    let user = await User.findOne({ email: email });
    if (user)
      return res.status(409).send({ message: "E-Mail bereits in Gebrauch" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(password, salt);
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    const userRoles =
      moderator == "One" ? { User: 2001, Moderator: 1984 } : { User: 2001 };
    user = await new User({
      ...req.body,
      password: hashPassword,
      code: randomCode,
      roles: userRoles,
      questions: { Themes: ["Depression", "Anxiety"], Experience: "None" },
    }).save();

    // await sendEmail(user.email, "Verify Email", user.code);

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

exports.forFred = async (req, res, next) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).send({ message: "Ungültiger Email" });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

exports.verifyEmail = async (req, res, next) => {
  const { code } = req.body;
  try {
    if (code.length == 4) {
      let user = await User.findOne({ code: code });
      if (!user) return res.status(400).send({ message: "Ungültiger Code" });

      const roles = Object.values(user.roles);

      const { _id  } = user;
      const payload = { _id };

      const authToken = jwt.sign(
        {
          UserInfo: {
            id: _id,
            roles: roles,
          },
        },
        process.env.TOKEN_SECRET,
        {
          algorithm: "HS256",
          expiresIn: "10m",
        }
      );
      const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
        algorithm: "HS256",
        expiresIn: "1d",
      });

      await User.updateOne(
        { _id: _id },
        {
          emailVerified: true,
          code: "",
          verificationExpires: null,
          refreshToken: refreshToken,
        }
      );

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).send({
        authtoken: authToken,
      });
    } else {
      res.status(400).send({ message: error });
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

exports.resetPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (!user)
      return res.status(409).send({
        message:
          "Der Benutzer mit der angegebenen E-Mail-Adresse existiert nicht",
      });

    const url = `${process.env.BASE_URL}password-reset/${user._id}`;
    await sendEmail(user.email, "Password Reset", url);

    res.status(200).send({
      message:
        "Der Link zum Zurücksetzen des Passworts wurde an Ihre E-Mail-Adresse gesendet",
    });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

exports.verifyResetPasswordToken = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    res.status(200).send({ message: "Valid url " });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

exports.resetPasswordId = async (req, res, next) => {
  const {
    body: { password },
    params: { id },
  } = req;
  try {
    const passwordSchema = Joi.object({
      password: passwordComplexity().required().label("Password"),
    });
    const { error } = passwordSchema.validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ _id: id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(password, salt);

    user.password = hashPassword;
    await user.save();

    res.status(200).send({ message: "Passwort erfolgreich zurückgesetzt" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

exports.findOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

exports.meetings = async (req, res, next) => {
  try {
    let user = await User.findOne({ _id: req.params.id });
    let start = "2023-10-03T00:00:00.000Z";
    let end = "2026-10-06T00:00:00.000Z";
    let event = await getEvents(start, end);
    let mappedEvent = user.meetings.map((meetings) =>
      event.filter((events) => events.id.includes(meetings))
    );
    res.status(200).send(mappedEvent);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.groups = async (req, res, next) => {
  try {
    let groups = await Group.find();

    let foundGroups = groups.filter(
      (groups) =>
        groups.users.includes(req.params.id) ||
        groups.moderator == req.params.id
    );
    res.status(200).send(foundGroups);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.edit = async (req, res, next) => {
  const { id } = req.params;
  try {
    let user = await User.findOne({ _id: id });
    if (!user) return res.status(400).send({ message: "Invalid Link" });

    await User.updateOne({ _id: id }, { ...req.body });

    res.status(200).send({ message: "Benutzer erfolgreich aktualisiert" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

exports.delete = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    if (!user) return res.status(400).send({ message: "Invalid Link" });

    await Group.updateMany(
      {
        users: {
          $in: [id],
        },
        // moderator: req.params.id
      },
      {
        $pull: {
          users: id,
          // moderator: req.params.id
        },
      }
    );

    user.moderatedGroups.map(async (groupIds) => {
      const specGroup = await Group.findOne({ _id: groupIds });

      await User.updateMany(
        {
          joinedGroups: {
            $in: [groupIds],
          },
        },
        {
          $pull: {
            joinedGroups: groupIds,
            meetings: specGroup.meeting,
          },
        }
      );
    });

    user.meetings.map((meeting) => deleteEvent(meeting));

    await Group.deleteMany({ moderator: id });

    await User.deleteOne({ _id: id });

    res.status(200).send({ message: "Benutzer erfolgreich gelöscht" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
