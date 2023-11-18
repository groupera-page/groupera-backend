const jwt = require("jsonwebtoken");
// const generateToken = require("../utils/videoSDK");

exports.getTokenMod = async (req, res, next) => {
  try {
    const API_KEY = process.env.VIDEO_KEY;
    const SECRET_KEY = process.env.VIDEO_SECRET;

    const options = { expiresIn: "120m", algorithm: "HS256" };

    const payload = {
      apikey: API_KEY,
      permissions: ["allow_join", "allow_mod"], // also accepts "ask_join"
    };

    const videoTokenMod = jwt.sign(payload, SECRET_KEY, options);
    res.json({ videoTokenMod });
    console.log(videoTokenMod);
  } catch (error) {
    next(error)
  }
};

// I don't think this is necessary but I'm gonna take another look at it if I have time this week
exports.getToken = async (req, res, next) => {
  try {
    const API_KEY = process.env.VIDEO_KEY;
    const SECRET_KEY = process.env.VIDEO_SECRET;

    const options = { expiresIn: "120m", algorithm: "HS256" };

    const payload = {
      apikey: API_KEY,
      permissions: ["ask_join"], // also accepts "ask_join"
    };

    const videoTokenUser = jwt.sign(payload, SECRET_KEY, options);
    res.json({ videoTokenUser });
    console.log(videoTokenUser);
  } catch (error) {
    next(error)
  }
};
