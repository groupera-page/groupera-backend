const router = require("express").Router();
const { User, validate } = require("../models/User.model");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
const Group = require("../models/Group.model");
const Statistics = require("../models/Statistics.model");


router.post("/signup", async (req, res) => {
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
    //   await sendEmail(user.email, "Verify Email", user.code);

	const statistics = await Statistics.updateOne({_id: "6515618090c090fefcd887ac"}, {$push: {gender: user.gender}}, {$push: {themen: user.themen}})

    res.status(201).send({
      message: "A verification code has been sent to your email account", statistics
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/verified/:id", async (req, res) => {
  try {
    const user = await User.findOne({ code: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid code" });
    await User.updateOne({ _id: user._id }, { verified: true, code: "" });
    res.status(200).json(user);
  } catch (error) {
    res.status(200).send({ message: "Email verified successfully" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).populate("groups");
    res.status(200).send({ user });
  } catch (error) {
    res.status(200).send({ message: "Email verified successfully" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid Link" });

    user = await User.updateOne({ _id: req.params.id }, { ...req.body });
    res.status(200).send({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).send({ message: `${error}` });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid Link" });

    const data = await Group.updateMany(
      {
        users: {
          $in: [req.params.id],
        },
      },
      {
        $pull: {
          users: req.params.id,
        },
      }
    );

    user = await User.deleteOne({ _id: req.params.id });

    res.status(200).send({ message: "User deleted successfully", data });
  } catch (error) {
    res.status(500).send({ message: `${error}` });
  }
});

module.exports = router;
