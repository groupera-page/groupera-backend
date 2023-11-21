const router = require('express').Router()
const userControllers = require('../controllers/userControllers')
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
	userControllers.edit
)

router.delete(
	'/:userId',
	validateAuthToken,
	verifyCurrentUser,
	userControllers.delete
)

module.exports = router
