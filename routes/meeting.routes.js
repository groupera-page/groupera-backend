const router = require('express').Router()

const meetingControllers = require('../controllers/meetingControllers')

const { validateAuthToken } = require('../middleware/auth.middleware')
const {
	verifyGroupModerator,
} = require('../middleware/userAuthentication.middleware.js')

router.post('/createMeeting/:groupId', validateAuthToken, verifyGroupModerator, meetingControllers.createMeeting)

router.patch('/:meetingId/editMeeting/:groupId', validateAuthToken, verifyGroupModerator, meetingControllers.editMeeting)

router.delete('/:meetingId/deleteMeeting/:groupId', validateAuthToken, verifyGroupModerator, meetingControllers.deleteMeeting)

module.exports = router
