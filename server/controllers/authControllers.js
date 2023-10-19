const { User } = require("../models/User.model");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");


exports.login = async (req, res, next) => {
    try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Ungültige E-Mail oder Passwort" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Ungültige E-Mail oder Passwort" });

		if(!user.verified) {
			return res.status(400).send({message: "Bitte bestätigen Sie Ihre E-Mail"})
		}	
		// const token = user.generateAuthToken();

		const { _id, email } = user;
        const payload = { _id, email };
    
    
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
                algorithm: "HS256",
                expiresIn: "6h",
              });
  
		res.status(200).send({authToken: authToken, message: "Erfolgreich eingeloggt" });
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