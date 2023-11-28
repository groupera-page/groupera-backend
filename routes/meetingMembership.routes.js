const router = require('express').Router()

const meetingMembershipControllers = require('../controllers/meetingMembershipControllers')

const { validateAuthToken } = require('../middleware/auth.middleware')

router.put('/:meetingId/joinMeeting', validateAuthToken, meetingMembershipControllers.joinMeeting)

router.put('/:meetingId/leaveMeeting', validateAuthToken, meetingMembershipControllers.leaveMeeting)

module.exports = router
