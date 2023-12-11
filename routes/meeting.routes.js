const router = require('express').Router()

const meetingControllers = require('../controllers/meetingControllers')

const { meetingSchema } = require('../models/Meeting.model')

const { validateAuthToken, validateScheme } = require('../middleware/auth.middleware')
const {
	verifyGroupModerator,
} = require('../middleware/userAuthentication.middleware.js')

router.post('/createMeeting/:groupId', validateAuthToken, verifyGroupModerator, validateScheme(meetingSchema), meetingControllers.create)

router.patch('/:meetingId/editMeeting/:groupId', validateAuthToken, verifyGroupModerator, validateScheme(meetingSchema), meetingControllers.edit)

router.delete('/:meetingId/deleteMeeting/:groupId', validateAuthToken, verifyGroupModerator, meetingControllers.delete)


module.exports = router
