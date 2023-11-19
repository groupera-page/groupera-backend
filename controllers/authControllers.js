const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../models/User.model");

const myCustomError = require("../utils/myCustomError")
const { v4: uuidv4 } = require('uuid');
const {
  calcExpirationDate,
  tokenExpired,
  getAuthTokens,
  cookieOptions,
} = require("../utils/auth.helpers");

exports.signup = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(Number(process.env.SALT));

    const hashedPassword = await bcrypt.hash(password, salt);

    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    const hashedRandomCode = await bcrypt.hash(randomCode, salt);

    await new User({
      ...req.body,
      passwordHash: hashedPassword,
      authCode: hashedRandomCode,
    }).save();

    res.locals.user = {email}
    res.locals.authCode = randomCode
    next()
  } catch (error) {
    next(error)
  }
};

exports.verifyEmail = async (req, res, next) => {
  const { code, email } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (!user) throw myCustomError('Ungültiger Email', 401);

    const validAuthCode = await bcrypt.compare(code, user.authCode);
    if (!validAuthCode) throw myCustomError('Incorrect code!', 401)

    user.emailVerified = true
    user.emailVerificationTokenExp = true
    user.authCode = ""

    const {userObject, authToken, refreshToken} = getAuthTokens(user)

    await user.save()

    // should I send the Mongo formatted ID as the user ID or just the string?!
    res
      .cookie("refreshToken", refreshToken, cookieOptions)
      .header("Authorization", authToken)
      .send({
        user: userObject,
        message: "Bentzer erfolgreich verfiziert"
      })
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const {email, password} = req.body

    const user = await User.findOne({ email });
    if (!user) throw myCustomError("Ungültige E-Mail oder Passwort", 401)

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) throw myCustomError("Ungültige E-Mail oder Passwort", 401)

    if (!user.emailVerified) throw myCustomError("Bitte bestätigen Sie Ihre E-Mail Addresse", 400)

    const {userObject, authToken, refreshToken} = getAuthTokens(user)

    // should I send the Mongo formatted ID as the user ID or just the string?!
    res
      .cookie("refreshToken", refreshToken, cookieOptions)
      .header("Authorization", authToken)
      .send({
        user: userObject,
        message: "Erfolgreich eingeloggt"
      })
  } catch (error) {
    next(error)
  }
};

exports.setResetPasswordToken = async (req, res, next) => {
  const { email } = req.body;
  try {
    let user = await User.findOne({ email: email });
    // As security measure we respond always with status code of 200 and the same message
    if (!user) throw myCustomError('Der Link zum Zurücksetzen des Passworts wurde an Ihre E-Mail-Adresse gesendet', 200)

    user.resetPasswordToken = uuidv4()
    user.resetPasswordTokenExp = calcExpirationDate("ResetPasswordToken")

    await user.save()

    const url = `${process.env.FRONTEND_BASE_URL}/auth/resetPassword/${user.resetPasswordToken}`;

    res.locals.user = user
    res.locals.resetPasswordToken = user.resetPasswordToken
    res.locals.resetPasswordTokenExp = user.resetPasswordTokenExp
    res.locals.url = url

    next()
  } catch (error) {
    next(error)
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { body: {password}, params: {resetPasswordToken} } = req;

    const user = await User.findOne({ resetPasswordToken });
    if (!user || !user.resetPasswordTokenExp || tokenExpired(user.resetPasswordTokenExp)) throw myCustomError("Invalid Token" , 400);

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(password, salt);

    user.resetPasswordTokenExp = undefined
    user.resetPasswordToken = undefined
    user.password = hashPassword;
    await user.save()

    const {userObject, authToken, refreshToken} = getAuthTokens(user)
    // should I send the Mongo formatted ID as the user ID or just the string?!
    res
      .cookie("refreshToken", refreshToken, cookieOptions)
      .header("Authorization", authToken)
      .send({
        user: userObject,
        message: "Passwort erfolgreich zurückgesetzt."
      })
  } catch (error) {
    next(error);
  }
}

exports.logout = async (req, res, next) => {
  try {
    res
      .cookie("refreshToken", "")
      .clearCookie("refreshToken", { httpOnly: true, sameSite: "None", secure: true })
      .sendStatus(204)
  } catch (error) {
    next(error)
  }
};

// Ask Fritz about using != and keeping foundUser._id like in Middleware versus using !== with toString()
exports.refresh = async (req, res, next) => {
  try {
    const {refreshToken: currentRefreshToken} = req.cookies
    jwt.verify(currentRefreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);

      const {authToken: newAuthToken, refreshToken: newRefreshToken} = getAuthTokens(decoded.user)

      res
        .cookie("refreshToken", newAuthToken, cookieOptions)
        .header("Authorization", newRefreshToken)
        .send({
          user: decoded.user,
        })
    });
  } catch (error) {
    next(error)
  }
};
