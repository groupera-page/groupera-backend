const router = require('express').Router()

const userControllers = require('../controllers/userControllers')
const emailControllers = require('../controllers/emailControllers')

const {
	verifyCurrentUser,
} = require('../middleware/userAuthentication.middleware.js')
const { validateAuthToken, validateScheme } = require('../middleware/auth.middleware.js')

const { userSchema } = require('../models/User.model')

router.get(
	'/:userId',
	validateAuthToken,
	verifyCurrentUser,
	userControllers.findOne
)

router.patch(
	'/:userId',
	validateScheme(userSchema),
	validateAuthToken,
	verifyCurrentUser,
	userControllers.edit,
	emailControllers.sendEmail('Verify email')
)

router.delete(
	'/:userId',
	validateAuthToken,
	verifyCurrentUser,
	userControllers.delete
)

module.exports = router
