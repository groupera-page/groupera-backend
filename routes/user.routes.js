const router = require('express').Router()

const userControllers = require('../controllers/userControllers')
const { userSchema } = require('../models/User.model')

const {
	verifyCurrentUser,
} = require('../middleware/userAuthentication.middleware.js')
const { validateAuthToken, validateScheme } = require('../middleware/auth.middleware.js')

const { sendEmail } = require('../controllers/emailControllers')

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
	sendEmail('Verify email')
)

router.delete(
	'/:userId',
	validateAuthToken,
	verifyCurrentUser,
	userControllers.delete,
	sendEmail('Delete account')
)

module.exports = router
