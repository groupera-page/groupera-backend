const router = require('express').Router()
const Joi = require('joi')

const { userSchema } = require('../models/User.model')

const authControllers = require('../controllers/authControllers')
const emailControllers = require('../controllers/emailControllers')

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
	validateScheme(userSchema),
	validateNoEmailDuplicates,
	authControllers.signup,
	emailControllers.sendEmail('Verify email')
)

router.patch(
	'/verifyEmail',
	validateScheme(codeSchema),
	authControllers.verifyEmail
)

router.patch(
	'/:email/resendEmailVerification',
	authControllers.resendEmailVerification,
	emailControllers.sendEmail('Verify email')
)

router.post('/login', validateScheme(loginBodySchema), authControllers.login)

router.post(
	'/resetPasswordRequest',
	authControllers.setResetPasswordToken,
	emailControllers.sendEmail('Reset Password Instructions')
)

router.patch(
	'/resetPassword/:resetPasswordToken',
	validateResetPassword,
	authControllers.resetPassword
)

router.get('/logout', authControllers.logout)

router.get('/refresh', validateRefreshToken, authControllers.refresh)

module.exports = router
