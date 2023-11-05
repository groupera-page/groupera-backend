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

		let loggedInUser = await User.updateOne({ _id: user._id }, { refreshToken: refreshToken });


		res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000})
		console.log(authToken)

		res.status(200).send({authToken: authToken, message: "Erfolgreich eingeloggt" });
	} catch (error) {
		res.status(500).send({ message: `${error}` });
	}
};

  exports.logout = async (req, res, next) => {
	try {
		const cookies = req.cookies
		if (!cookies?.jwt) return res.sendStatus(204); // successful, no content
		const refreshToken = cookies.jwt;
		// Is refreshToken in db?
		const user = await User.findOne({ refreshToken: refreshToken })
		if (!user) {
			res.clearCookie('jwt', { httpOnly: true });
			return res.sendStatus(204);
		}
		// Delete refreshToken in db
		let newUser = await User.updateOne({ _id: user._id }, { refreshToken: '' });
	
		res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); // secure: true to serve https
		res.sendStatus(204)
	} catch (error) {
		res.status(500).send({ message: `${error}` });
	}
  };

  exports.refresh = async (req, res, next) => {
	try {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({ refreshToken: refreshToken })
    if (!foundUser) return res.sendStatus(403); //Forbidden 
        jwt.verify(
            refreshToken,
            process.env.REFRESH_SECRET,
            (err, decoded) => {
                if(err || foundUser.email !== decoded.email) return res.sendStatus(403);
				const roles = Object.values(foundUser.roles)
                const accessToken = jwt.sign(
                    // { "username": decoded.username },
					{ "UserInfo": {
						"id": decoded._id,
						"roles": roles
					}
					},
                    process.env.TOKEN_SECRET,
                    { expiresIn: '10m' }
                );
				console.log(decoded._id);
                res.json(accessToken)
            }
        )
	// const cookies = req.cookies
    // if (!cookies?.jwt) return res.sendStatus(401);
    // const refreshToken = cookies.jwt;
    // const foundUser = User.findOne({ refreshToken: refreshToken })
    // if (!foundUser) return res.sendStatus(403); //Forbidden 
    //     jwt.verify(
    //         refreshToken,
    //         process.env.REFRESH_SECRET,
    //         (err, decoded) => {
    //             if(err || foundUser.username !== decoded.username) return res.sendStatus(403);
    //             const roles = Object.values(foundUser.roles)
    //             const accessToken = jwt.sign(
    //                 { 
    //                     "UserInfo": {
    //                         "id": decoded.id,
    //                         "roles": roles 
    //                     }
    //                 },
    //                 process.env.TOKEN_SECRET,
    //                 { expiresIn: '10m' }
    //             );
	// 			console.log(decoded.id)
    //             res.json(accessToken)
    //         }
    //     )
	} catch (error) {
		res.status(500).send({ message: `${error}` });
	}
}


const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};