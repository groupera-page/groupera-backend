const { User } = require("../models/User.model");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(401)
        .send({ message: "Ungültige E-Mail oder Passwort" });

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword)
      return res
        .status(401)
        .send({ message: "Ungültige E-Mail oder Passwort" });

    if (!user.emailVerified) {
      return res
        .status(400)
        .send({ message: "Bitte bestätigen Sie Ihre E-Mail" });
    };

    console.log(user.id)

    const accessToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.TOKEN_SECRET,
      {
        algorithm: "HS256",
        expiresIn: "10m",
      }
    );


    const refreshToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.REFRESH_SECRET,
      {
        algorithm: "HS256",
        expiresIn: "1d",
      }
    );

    await User.updateOne({ _id: user._id }, { refreshToken: refreshToken });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    // should I send the Mongo formatted ID as the user ID or just the string?

    const userInformation = {
      _id: user._id,
      alias: user.alias,
      email: user.email,
      dob: user.dob,
      questions: user.questions,
      emailVerified: user.emailVerified,
      gender: user.gender,
    };

    res.status(200).send({
      accessToken,
      userInformation,
      message: "Erfolgreich eingeloggt",
    });
  } catch (error) {
    next(error)
  }
};

exports.logout = async (req, res, next) => {
  try {
    const { cookies } = req;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;
    const user = await User.findOne({ refreshToken: refreshToken });
    if (!user) {
      res.clearCookie("jwt", { httpOnly: true });
      return res.sendStatus(204);
    }
    await User.updateOne({ _id: user._id }, { refreshToken: "" });

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.sendStatus(204);
  } catch (error) {
    next(error)
  }
};

// Ask Fritz about using != and keeping foundUser._id like in Middleware versus using !== with toString()
exports.refresh = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({ refreshToken: refreshToken });
    if (!foundUser) return res.status(403).send({ message: "No user found" });
    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
      if (err || foundUser.id !== decoded.id) return res.sendStatus(403);

      const accessToken = jwt.sign(
        {
          id: decoded.id,
        },
        process.env.TOKEN_SECRET,
        {
          algorithm: "HS256",
          expiresIn: "10m",
        }
      );

      res.status(200).send(accessToken);
    });
  } catch (error) {
    next(error)
  }
};

// exports.refresh = async (req, res, next) => {
//   try {
//     const cookies = req.cookies;
//     if (!cookies?.jwt) return res.sendStatus(401);
//     const refreshToken = cookies.jwt;
//     const foundUser = await User.findOne({ refreshToken: refreshToken });
//     if (!foundUser) return res.status(403).send({ message: "No user found" });

//     try {
//       const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

//       console.log(foundUser._id);

//       // if (decoded.id === foundUser._id)
//       const accessToken = jwt.sign(
//         {
//           id: decoded.id,
//         },
//         process.env.TOKEN_SECRET,
//         {
//           algorithm: "HS256",
//           expiresIn: "10m",
//         }
//       );

//       res.status(200).send(accessToken);

//     } catch (error) {
//       res.sendStatus(400);
//     }
//   } catch (error) {
//     next(error)
//   }
// };


const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};
