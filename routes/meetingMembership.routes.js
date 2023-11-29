const router = require('express').Router()

const meetingMembershipControllers = require('../controllers/meetingMembershipControllers')

const {
	verifyGroupMember,
} = require('../middleware/userAuthentication.middleware.js')
const { validateAuthToken } = require('../middleware/auth.middleware')

router.put(
	'/:meetingId/joinMeeting/:groupId',
	validateAuthToken,
	verifyGroupMember,
	meetingMembershipControllers.joinMeeting
)

router.put(
	'/:meetingId/leaveMeeting/:groupId',
	validateAuthToken,
	meetingMembershipControllers.leaveMeeting
)

module.exports = router
