const { User, validate } = require("../models/User.model");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
const Group = require("../models/Group.model");
const jwt = require("jsonwebtoken");

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
        //   await sendEmail(user.email, "Verify Email", user.code);
    
        const { _id, email } = user;
        const payload = { _id, email };
    
    
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
                algorithm: "HS256",
                expiresIn: "6h",
              });
    
    
        res.status(201).send({ authToken: authToken,
          message: "A verification code has been sent to your email account"
        });
    
        console.log(authToken)
    
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
        res.status(200).send({ message: "Email verified successfully" });
      }
};

exports.userId =async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).populate("groups");
        res.status(200).send({ user });
      } catch (error) {
        res.status(200).send({ message: "Email verified successfully" });
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
};

exports.verifyToken = (req, res, next) => {
    console.log(`req.payload`, req.payload);
	res.status(200).json(req.payload);
};