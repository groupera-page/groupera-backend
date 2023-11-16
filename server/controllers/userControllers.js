const { User, validate } = require("../models/User.model");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
const { Group } = require("../models/Group.model");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const { getEvents, deleteEvent } = require("../utils/googleCalendar");
const emailTemplates = require("../lib/emailTemplates");

const hashSomething = async (thingToHash) => {
  const salt = await bcrypt.genSalt(Number(process.env.SALT));

  return bcrypt.hash(thingToHash, salt);
};

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    let user = await User.findOne({ email: email });
    if (user)
      return res.status(409).send({ message: "E-Mail bereits in Gebrauch" });

    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    console.log(randomCode);
    const hashPassword = await hashSomething(password);
    const hashCode = await hashSomething(randomCode);

    user = await new User({
      ...req.body,
      passwordHash: hashPassword,
      authCode: hashCode,
      questions: { Themes: ["Depression", "Anxiety"], Experience: "None" },
    }).save();

    await sendEmail(
      user.email,
      "Verify Email",
      emailTemplates.emailVerification(randomCode)
    );

    res.status(201).send(user.email);
  } catch (error) {
    res.status(500).send({ message: `${error}` });
  }
};

exports.verifyEmail = async (req, res) => {
  const { code, email } = req.body;
  try {
    if (code.length == 4) {
      let user = await User.findOne({ email: email });
      if (!user) return res.status(400).send({ message: "Ungültiger Email" });

      const validAuthCode = await bcrypt.compare(code, user.authCode);
      if (!validAuthCode)
        return res.status(401).send({ message: "Incorrect code!" });

      const accessToken = jwt.sign(
        {
          id: user._id,
        },
        process.env.TOKEN_SECRET,
        {
          algorithm: "HS256",
          expiresIn: "30m",
        }
      );
      const refreshToken = jwt.sign(
        {
          id: user._id,
        },
        process.env.REFRESH_SECRET,
        {
          algorithm: "HS256",
          expiresIn: "1d",
        }
      );

      await User.updateOne(
        { _id: user._id },
        {
          emailVerified: true,
          authCode: "",
          emailVerificationExpires: null,
          refreshToken: refreshToken,
        }
      );

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      user = {
        id: user.id,
        alias: user.alias,
        email: user.email,
        dob: user.dob,
        questions: user.questions,
        emailVerified: user.emailVerified,
        gender: user.gender,
      };

      res.status(200).send({
        accessToken,
        user,
        message: `Benutzer erfolgreich verifiziert`,
      });
    } else {
      res.status(400).send({ message: `${error}` });
    }
  } catch (error) {
    res.status(400).send({ message: `${error}` });
  }
};

exports.resetPasswordRequest = async (req, res) => {
  const { email } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (!user)
      return res.status(409).send({
        message:
          "Der Benutzer mit der angegebenen E-Mail-Adresse existiert nicht",
      });

    const url = `${process.env.BASE_URL}password-reset/${user._id}`;
    await sendEmail(
      user.email,
      "Password Reset",
      emailTemplates.passwordReset(user.alias, user.email, url)
    );

    res.status(200).send({
      message:
        "Der Link zum Zurücksetzen des Passworts wurde an Ihre E-Mail-Adresse gesendet",
    });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

exports.verifyResetPasswordToken = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    res.status(200).send({ message: "Valid url " });
  } catch (error) {
    res.status(500).send({ message: `${error}` });
  }
};

exports.resetPasswordId = async (req, res) => {
  const {
    body: { password },
    params: { userId },
  } = req;
  try {
    const passwordSchema = Joi.object({
      password: passwordComplexity().required().label("Password"),
    });
    const { error } = passwordSchema.validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ _id: userId });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const hashPassword = hashSomething(password)
    user.passwordHash = hashPassword;
    await user.save();

    res.status(200).send({ message: "Passwort erfolgreich zurückgesetzt" });
  } catch (error) {
    res.status(500).send({ message: `${error}` });
  }
};

exports.findOne = async (req, res) => {
  const { userId } = req.params;
  const allGroupMeetings = await getEvents();

  try {
    let user = await User.findOne({ _id: userId });
    let groups = await Group.find();
    groups = groups.filter(
      (group) => group.users.includes(user.id) || group.moderatorId == user.id
    );

    user = {
      id: user.id,
      alias: user.alias,
      email: user.email,
      dob: user.dob,
      questions: user.questions,
      emailVerified: user.emailVerified,
      gender: user.gender,
      groups: groups.map((group) => {
        return (group = {
          id: group.id,
          verified: group.verified,
          name: group.name,
          description: group.description,
          topic: group.topic,
          moderator: group.moderatorId,
          meeting: allGroupMeetings.filter((groupMeeting) =>
            groupMeeting.id.includes(group.meeting)
          ),
        });
      }),
    };

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: `${error}` });
  }
};

// Think I made this obsolete...again
exports.meetings = async (req, res) => {
  const { userId } = req.params;
  try {
    let user = await User.findOne({ _id: userId });
    let event = await getEvents();
    let mappedEvent = user.meetings.map((meetings) =>
      event.filter((events) => events.id.includes(meetings))
    );
    res.status(200).send(mappedEvent);
  } catch (error) {
    res.status(500).send(`${error}`);
  }
};

// Same here
exports.groups = async (req, res) => {
  const { userId } = req.params;
  try {
    let groups = await Group.find();

    let foundGroups = groups.filter(
      (groups) => groups.users.includes(userId) || groups.moderatorId == userId
    );
    res.status(200).send(foundGroups);
  } catch (error) {
    res.status(500).send(`${error}`);
  }
};

exports.edit = async (req, res) => {
  const { userId } = req.params;
  const { password } = req.body;
  const createDate = () => new Date(+new Date() + 15 * 60 * 1000);

  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    let user = await User.findOne({ _id: userId });
    if (!user) return res.status(400).send({ message: "Invalid Link" });

    const hashPassword = await hashSomething(password);

    await User.updateOne(
      { _id: userId },
      { ...req.body, passwordHash: hashPassword }
    );

    let newUser = await User.findOne({ _id: userId });

    if (newUser.email !== user.email) {
      const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
      const hashCode = hashSomething(randomCode);

      await User.updateOne(
        { _id: userId },
        {
          emailVerified: false,
          authCode: hashCode,
          emailVerificationExpires: createDate(),
          refreshToken: ""
        }
      );

      await sendEmail(
        newUser.email,
        "Verify Email",
        emailTemplates.emailVerification(randomCode)
      );

      return res.status(200).send(newUser.email);
    }

    res.status(200).send({ message: "Benutzer erfolgreich aktualisiert" });
  } catch (error) {
    res.status(500).send({ message: `${error}` });
  }
};

exports.delete = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) return res.status(400).send({ message: "Invalid Link" });

    await Group.updateMany(
      {
        users: {
          $in: [userId],
        },
      },
      {
        $pull: {
          users: userId,
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

    await Group.deleteMany({ moderator: userId });

    await User.deleteOne({ _id: userId });

    res.status(200).send({ message: "Benutzer erfolgreich gelöscht" });
  } catch (error) {
    res.status(500).send({ message: `${error}` });
  }
};
