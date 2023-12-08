const router = require('express').Router()

const groupMembershipControllers = require('../controllers/groupMembershipControllers')
const { sendEmail } = require('../controllers/emailControllers')

const { validateAuthToken } = require('../middleware/auth.middleware')

router.put(
	'/:groupId/join',
	validateAuthToken,
	groupMembershipControllers.join,
	sendEmail('Join group')
)

router.put(
	'/:groupId/leave',
	validateAuthToken,
	groupMembershipControllers.leave
)

module.exports = router
