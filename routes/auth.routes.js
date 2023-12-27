const router = require('express').Router()
const Joi = require('joi')

const { userCreateSchema } = require('../models/User.model')

const authControllers = require('../controllers/authControllers')
const { sendEmail } = require('../controllers/emailControllers')

const {
	validateRefreshToken,
	validateScheme,
	validateNoEmailDuplicates,
	validateResetPassword,
} = require('../middleware/auth.middleware')

const loginBodySchema = {
	email: Joi.string().email().required().label('Email'),
	password: Joi.string().required().label('Password'),
}

const codeSchema = {
	email: Joi.string().email().required().label('Email'),
	authCode: Joi.string().required().min(4).length(4).label('authCode'),
	joinedGroups: Joi.array().label('joinedGroups')
}

router.post(
	'/signup',
	validateScheme(userCreateSchema),
	validateNoEmailDuplicates,
	authControllers.signup,
	// sendEmail('Verify email')
)

router.patch(
	'/verifyEmail',
	validateScheme(codeSchema),
	authControllers.verifyEmail,
	sendEmail('Welcome email')
)

router.patch(
	'/resendEmailVerification',
	authControllers.resendEmailVerification,
	sendEmail('Verify email')
)

router.post('/login', validateScheme(loginBodySchema), authControllers.login)

router.patch(
	'/resetPasswordRequest',
	authControllers.setResetPasswordToken,
	sendEmail('Reset password instructions')
)

router.patch(
	'/resetPassword/:resetPasswordToken',
	validateResetPassword,
	authControllers.resetPassword,
	sendEmail('Reset password successful')
)

router.get('/logout', authControllers.logout)

router.get('/refresh', validateRefreshToken, authControllers.refresh)

module.exports = router
