const router = require('express').Router()

const userControllers = require('../controllers/userControllers')

const {
	validateAuthToken,
	isAdmin,
} = require('../middleware/auth.middleware.js')

router.get(
	'',
	validateAuthToken,
	isAdmin,
	userControllers.findAll
)

// const { validateAuthToken } = require('../middleware/auth.middleware.js')

// router.get(
// 	'/:userId',
// 	validateAuthToken,
// 	verifyCurrentUser,
// 	userControllers.findOne
// )

// router.patch(
// 	'/:userId',
// 	validateAuthToken,
// 	verifyCurrentUser,
// 	userControllers.edit
// )

// // router.patch(
// // 	'/:userId',
// // 	validateAuthToken,
// // 	validateScheme(userSchema),
// // 	verifyCurrentUser,
// // 	userControllers.edit,
// // 	emailControllers.sendEmail('Verify email')
// // )

// router.delete(
// 	'/:userId',
// 	validateAuthToken,
// 	verifyCurrentUser,
// 	userControllers.delete,
//  sendEmail('Delete account')
// )

module.exports = router
