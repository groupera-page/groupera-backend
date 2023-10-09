const { User } = require("../models/User.model");
const bcrypt = require("bcryptjs");
const Joi = require("joi");



exports.login = async (req, res, next) => {
    try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		if(!user.verified) {
			return res.status(400).send({message: "Please validate email"})
		}	

		// const { _id, u } = user;
        // const payload = { _id, username };

		// const authToken = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, {
		// 	algorithm: "HS256",
		// 	expiresIn: "6h",
		//   });

		// const token = user.generateAuthToken();
		res.status(200).send({ message: "logged in successfully" });
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