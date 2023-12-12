const router = require('express').Router()

const meetingControllers = require('../controllers/meetingControllers')

const { meetingSchema } = require('../models/Meeting.model')

const { validateAuthToken, validateScheme } = require('../middleware/auth.middleware')
const {verifyMeetingAdmin} = require('../middleware/userAuthentication.middleware');

router.patch('/:meetingId', validateAuthToken, verifyMeetingAdmin, validateScheme(meetingSchema), meetingControllers.edit)

router.delete('/:meetingId', validateAuthToken, verifyMeetingAdmin, meetingControllers.delete)


module.exports = router
