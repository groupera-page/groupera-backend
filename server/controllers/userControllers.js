const { User, validate } = require("../models/User.model");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
const Group = require("../models/Group.model");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const { getEvents, deleteEvent } = require("../utils/googleCalendar");

exports.signup = async (req, res, next) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(409).send({ message: "E-Mail bereits in Gebrauch" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
if(req.body.moderator == "One"){
    user = await new User({
      ...req.body,
      password: hashPassword,
      code: randomCode,
      roles: { "User": 2001, "Moderator": 1984 },
      questions: { "Themes": ["Depression", "Anxiety"], "Experience": "None"}
    }).save();
  }
  else {
    user = await new User({
      ...req.body,
      password: hashPassword,
      code: randomCode,
      roles: { "User": 2001 },
      questions: { "Themes": ["Depression", "Anxiety"], "Experience": "None"}
    }).save();
  }
    // await sendEmail(user.email, "Verify Email", user.code);

    // const roles = Object.values(user.roles);


    // const { _id, email } = user;
    // const payload = { _id, email };

    // const authToken = jwt.sign({
		// 	"UserInfo": {
		// 		"_id": _id,
		// 		// "email": email,
		// 		"roles": roles
		// 	}
		// }, process.env.TOKEN_SECRET, {
		// 	algorithm: "HS256",
		// 	expiresIn: "10m",
		// });
    // const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
		// 	algorithm: "HS256",
		// 	expiresIn: "1d",
		// });

    // const currentUser = { ...user, refreshToken };

		// let newUser = await User.updateOne({ _id: user._id }, { currentUser });

		// res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000})

    res.status(201).send(
    //   {
    //   authtoken: authToken,
    // }
    );
  } catch (error) {
    res.status(500).send({ message: `${error}` });
  }
};

exports.forFred = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(400).send({ message: "Ungültiger Email" });

    res.status(200).json(user);
    // res.redirect(`/group/create/${user.email}`)
  } catch (error) {
    res.status(400).send({ message: `${error}` });
  }
};
// ADD TOKEN HERE INSTEAD OF AT SI
exports.verified = async (req, res, next) => {
  try {
    if (req.body.code.length == 4) {
    const user = await User.findOne({ code: req.body.code });
    if (!user) return res.status(400).send({ message: "Ungültiger Code" });

    const roles = Object.values(user.roles);

    const { _id, email } = user;
    const payload = { _id, email };

    const authToken = jwt.sign({
			"UserInfo": {
				"id": _id,
				// "email": email,
				"roles": roles
			}
		}, process.env.TOKEN_SECRET, {
			algorithm: "HS256",
			expiresIn: "10m",
		});
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
			algorithm: "HS256",
			expiresIn: "1d",
		});

    const currentUser = { ...user, refreshToken };

		// let newUser = await User.updateOne({ _id: user._id }, { currentUser });

    await User.updateOne({ _id: user._id }, { currentUser, verified: true, code: "", verificationExpires: null });

		res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000})


    res.status(200).send({
      authtoken: authToken,
    });
    }
    else {
      res.status(400).send({ message: `${error}` });
  }
  } catch (error) {
    res.status(400).send({ message: `${error}` });
  }
};

exports.reset = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(409)
        .send({
          message:
            "Der Benutzer mit der angegebenen E-Mail-Adresse existiert nicht",
        });

    const url = `${process.env.BASE_URL}password-reset/${user._id}`;
    await sendEmail(user.email, "Password Reset", url);

    res
      .status(200)
      .send({
        message:
          "Der Link zum Zurücksetzen des Passworts wurde an Ihre E-Mail-Adresse gesendet",
      });
  } catch (error) {
    res.status(500).send({ message: `${error}` });
  }
};

exports.verifyReset = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    res.status(200).send({ message: "Valid url " });
  } catch (error) {
    res.status(500).send({ message: `${error}` });
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const passwordSchema = Joi.object({
      password: passwordComplexity().required().label("Password"),
    });
    const { error } = passwordSchema.validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user.password = hashPassword;
    await user.save();

    res.status(200).send({ message: "Passwort erfolgreich zurückgesetzt" });
  } catch (error) {
    res.status(500).send({ message: `${error}` });
  }
};

exports.id = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
    res.status(200).send({ user });
  } catch (error) {
    res.status(500).send({ message: `${error}` });
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
    res.status(500).send(`${error}`);
  }
};

exports.edit = async (req, res, next) => {
  try {
    let user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid Link" });

    let newUser = await User.updateOne({ _id: req.params.id }, { ...req.body });
    
    // let newNewUser = await User.findOne({ _id: req.params.id });

    // if (user.email !== newNewUser.email) {
    //   res.status(500).send({ message: `${error}` });
    // }

    res.status(200).send({ message: "Benutzer erfolgreich aktualisiert" });

  } catch (error) {
    res.status(500).send({ message: `${error}` });
  }
};

exports.delete = async (req, res, next) => {
  try {
    let user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid Link" });

    const data = await Group.updateMany(
      {
        users: {
          $in: [req.params.id],
        },
        // moderator: req.params.id
      },
      {
        $pull: {
          users: req.params.id,
          // moderator: req.params.id
        },
      }
    );

    user.moderatedGroups.map(async (groups) => {
      const specGroup = await Group.findOne({ _id: groups });

      await User.updateMany(
        {
          joinedGroups: {
            $in: [groups],
          },
        },
        {
          $pull: {
            joinedGroups: groups,
            meetings: specGroup.meeting,
          },
        }
      );
    });

    user.meetings.map((meetings) => deleteEvent(meetings));

    let deletedGroups = await Group.deleteMany({ moderator: req.params.id });

    user = await User.deleteOne({ _id: req.params.id });

    res.status(200).send({ message: "Benutzer erfolgreich gelöscht", data });
  } catch (error) {
    res.status(500).send({ message: `${error}` });
  }
};

// exports.verifyToken = (req, res, next) => {
//   console.log(`req.payload`, req.payload);
//   res.status(200).json(req.payload);
// };
