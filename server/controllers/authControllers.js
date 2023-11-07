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
    }

    const authToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.TOKEN_SECRET,
      {
        algorithm: "HS256",
        expiresIn: "10m",
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

    await User.updateOne({ _id: user._id }, { refreshToken: refreshToken });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    const userObject = {
      alias: user.alias,
      email: user.email,
      passwordHash: user.passwordHash,
      dob: user.dob,
      questions: user.questions,
      emailVerified: user.emailVerified,
      gender: user.gender,
    };

    res
      .status(200)
      .send({
        authToken: authToken,
        userObject,
        message: "Erfolgreich eingeloggt",
      });
  } catch (error) {
    res.status(500).send({ message: error });
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
    res.status(500).send({ message: error });
  }
};

exports.refresh = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({ refreshToken: refreshToken });
    if (!foundUser) return res.status(403).send({ message: "No user found" });
    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
      if (err || foundUser._id !== decoded._id)
        return res.status(403).send({ message: `${decoded._id}` });
      const accessToken = jwt.sign(
        {
          id: decoded._id,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: "10m" }
      );
      console.log(decoded._id);
      res.json(accessToken);
    });
  } catch (error) {
    res.status(500).send({ message: `${error}` });
  }
};

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};
