const router = require('express').Router()

const meetingMembershipControllers = require('../controllers/meetingMembershipControllers')

const {
	verifyGroupMember,
} = require('../middleware/userAuthentication.middleware.js')
const { validateAuthToken } = require('../middleware/auth.middleware')

router.put(
	'/:meetingId/joinMeeting',
	validateAuthToken,
	verifyGroupMember,
	meetingMembershipControllers.joinMeeting
)

router.put(
	'/:meetingId/leaveMeeting',
	validateAuthToken,
	verifyGroupMember,
	meetingMembershipControllers.leaveMeeting
)

module.exports = router
