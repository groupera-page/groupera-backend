const router = require('express').Router()

const meetingControllers = require('../controllers/meetingControllers')

const { validateAuthToken } = require('../middleware/auth.middleware')

router.post('/createMeeting/:groupId', meetingControllers.createMeeting)

router.put('/:meetingId/joinMeeting', validateAuthToken, meetingControllers.joinMeeting)

router.patch('/:meetingId/editMeeting', meetingControllers.editMeeting)

router.delete('/:meetingId/deleteMeeting', meetingControllers.deleteMeeting)

module.exports = router
