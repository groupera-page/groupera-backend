const router = require('express').Router()
const Joi = require('joi')

const { userSchema } = require('../models/User.model')

const authControllers = require('../controllers/authControllers')

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

const emailSchema = {
	email: Joi.string().email().required().label('Email'),
}

const codeSchema = {
	code: Joi.string().required().min(4).length(4).label('authCode'),
}

router.post(
	'/signup',
	validateScheme(userSchema),
	validateNoEmailDuplicates,
	authControllers.signup
	// emailControllers.sendEmail('Verify email')
)

router.patch(
	'/:email/verifyEmail',
	validateScheme(codeSchema),
	authControllers.verifyEmail
)

router.post(
	'/:email/resendEmailVerification',
	validateScheme(emailSchema),
	authControllers.resendEmailVerification
)

router.post('/login', validateScheme(loginBodySchema), authControllers.login)

router.post('/resetPasswordRequest', authControllers.resetPasswordRequest)

router.get('/verifyResetPasswordLink', authControllers.verifyResetPasswordLink)

router.patch(
	'/:userId/resetPassword',
	validateResetPassword,
	authControllers.resetPassword
)

router.get('/logout', authControllers.logout)

router.get('/refresh', validateRefreshToken, authControllers.refresh)

module.exports = router
