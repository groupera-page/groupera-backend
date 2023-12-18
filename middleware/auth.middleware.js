const Joi = require('joi')
const passwordComplexity = require('joi-password-complexity')

const { User } = require('../models/User.model')
// const { Group } = require('../models/Group.model')

const myCustomError = require('../utils/myCustomError')
const jwt = require('jsonwebtoken')

exports.validateAuthToken = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization || req.headers.Authorization
		if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401)
		const token = authHeader.split(' ')[1]


		const {user: decodedUser} = jwt.verify(token, process.env.AUTH_TOKEN_SECRET)
		req.userId = decodedUser.id
		next()
	} catch (error) {
		error.status = 401
		next(error)
	}
}

exports.validateRefreshToken = (req, res, next) => {
	try {
		const cookies = req.cookies
		if (!cookies?.refreshToken) throw myCustomError('Token required', 400)

		next()
	} catch (error) {
		next(error)
	}
}

exports.validateScheme = (schema, compareTo = undefined) => (req, res, next) => {
	try {
		const { error } = Joi.object(schema).validate(compareTo || req.body)
		if (error) throw myCustomError(error.details[0].message, 400)
		next()
	} catch (error) {
		next(error)
	}
}

exports.validateResetPassword = (req, res, next) => {
	try {
		const { error } = Joi.object({
			password: passwordComplexity().required().label('Password'),
		}).validate({
			password: req.body.password,
		})
		if (error) throw myCustomError(error.details[0].message, 400)

		next()
	} catch (error) {
		next(error)
	}
}

exports.validateNoEmailDuplicates = async (req, res, next) => {
	try {
		const user = await User.findOne({ email: req.body.email })
		if (user) throw myCustomError('E-Mail bereits in Gebrauch', 409)

		next()
	} catch (error) {
		next(error)
	}
}

// exports.validateNoGroupDuplicates = async (req, res, next) => {
// 	try {
// 		const user = await Group.findOne({ name: req.body.name })
// 		if (user) throw myCustomError('Gruppe bereits in Gebrauch', 409)
//
// 		next()
// 	} catch (error) {
// 		next(error)
// 	}
// }

// exports.verifyUser = (req, res, next) => {
// 	const authHeader = req.headers.authorization || req.headers.Authorization
// 	if (!authHeader?.startsWith('Bearer ')) {
// 		req.userId = 1
// 		next()
// 	} else {
// 		const token = authHeader.split(' ')[1]
// 		jwt.verify(token, process.env.AUTH_TOKEN_SECRET, (error, decoded) => {
// 			if (error) next(myCustomError(error, 403))
// 			req.userId = decoded.user._id
// 			next()
// 		})
// 	}
// }
