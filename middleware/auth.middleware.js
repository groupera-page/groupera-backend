const Joi = require('joi')
const passwordComplexity = require('joi-password-complexity')

const { User } = require('../models/User.model')
const myCustomError = require('../utils/myCustomError')
const jwt = require('jsonwebtoken')

exports.validateAuthToken = (req, res, next) => {
	const authHeader = req.headers.authorization || req.headers.Authorization
	console.log(authHeader)
	if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401)
	const token = authHeader.split(' ')[1]
	jwt.verify(token, process.env.AUTH_TOKEN_SECRET, (err, decoded) => {
		if (err) return res.status(403).send({ message: `${err}` })
		req.userId = decoded.id
		next()
	})
}

exports.validateRefreshToken = async (req, res, next) => {
	const cookies = req.cookies
	if (!cookies?.refreshToken) next(myCustomError('Token required', 400))

	next()
}

exports.validateScheme = (schema, compareTo) => async (req, res, next) => {
	const { error } = Joi.object(schema).validate(compareTo || req.body)
	if (error) next(myCustomError(error.details[0].message, 400))

	next()
}

exports.validateResetPassword = async (req, res, next) => {
	const { error } = Joi.object({
		password: passwordComplexity().required().label('Password'),
		resetPasswordToken: Joi.string().required().label('resetPasswordToken'),
	}).validate({
		password: req.body.password,
		resetPasswordToken: req.params.resetPasswordToken,
	})
	if (error) next(myCustomError(error.details[0].message, 400))

	next()
}

exports.validateNoEmailDuplicates = async (req, res, next) => {
	try {
		const user = await User.findOne({ email: req.body.email })
		if (user) throw myCustomError('E-Mail bereits in Gebrauch', 409)

		next()
	} catch (error) {
		next(error)
	}
	next()
}
