const router = require("express").Router();
const { User, validate } = require("../models/User.model");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");


router.post("/signup", async (req, res) => {
	try {
	  const { error } = validate(req.body);
	  if (error)
		return res.status(400).send({ message: error.details[0].message });
  
	  let user = await User.findOne({ email: req.body.email });
	  if (user)
		return res
		  .status(409)
		  .send({ message: "User with given email already Exist!" });
  
	  const salt = await bcrypt.genSalt(Number(process.env.SALT));
	  const hashPassword = await bcrypt.hash(req.body.password, salt);
  
	  user = await new User({ ...req.body, password: hashPassword }).save();
	  await sendEmail(user.email, "Verify Email", user.code);
  
	  res
		.status(201)
		.send({
		  message: "A verification code has been sent to your email account",
		});
	} catch (error) {
	  res.status(500).send({ message: "Internal Server Error" });
	}
  });

router.get("/verified/:id", async (req, res) => {
	try {
	  const user = await User.findOne({ code: req.params.id });
	  if (!user) return res.status(400).send({ message: "Invalid code" });
	  console.log(user)
	  await User.updateOne({_id: user._id}, { verified: true });
	  res.status(200).send({ message: "Email verified successfully" });
  
	} catch (error) {
	  res.status(400).send({ message: `${error}` });
	}
  });

module.exports = router;