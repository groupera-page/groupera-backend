const jwt = require("jsonwebtoken");
// const generateToken = require("../utils/videoSDK");

exports.getTokenMod = async (req, res) => {
  try {
    const API_KEY = process.env.VIDEO_KEY;
    const SECRET_KEY = process.env.VIDEO_SECRET;

    const options = { expiresIn: "120m", algorithm: "HS256" };

    const payload = {
      apikey: API_KEY,
      permissions: ["allow_join", "allow_mod"], // also accepts "ask_join"
    };

    const token = jwt.sign(payload, SECRET_KEY, options);
    res.json({ token });
    console.log(token);
  } catch (error) {
    res.status(400).send({ message: `${error}` });
  }
};

exports.getToken = async (req, res) => {
  try {
    const API_KEY = process.env.VIDEO_KEY;
    const SECRET_KEY = process.env.VIDEO_SECRET;

    const options = { expiresIn: "120m", algorithm: "HS256" };

    const payload = {
      apikey: API_KEY,
      permissions: ["ask_join"], // also accepts "ask_join"
    };

    const token = jwt.sign(payload, SECRET_KEY, options);
    res.json({ token });
    console.log(token);
  } catch (error) {
    res.status(400).send({ message: `${error}` });
  }
};
