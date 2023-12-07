const router = require('express').Router()

const profileControllers = require('../controllers/profileControllers')

const { validateAuthToken } = require('../middleware/auth.middleware.js')

router.get(
	'',
	validateAuthToken,
	profileControllers.find
)

router.patch(
	'',
	validateAuthToken,
	profileControllers.edit,
)

router.patch(
	'/updateEmail',
	validateAuthToken,
	profileControllers.editEmail,
)

router.patch(
	'/updatePassword',
	validateAuthToken,
	profileControllers.editPassword,
)

router.delete(
	'',
	validateAuthToken,
	profileControllers.delete
)

module.exports = router
