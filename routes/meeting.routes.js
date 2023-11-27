const router = require('express').Router()

const meetingControllers = require('../controllers/meetingControllers')

router.post('/createMeeting/:groupId', meetingControllers.createMeeting)

router.patch('/:meetingId/editMeeting/:groupId', meetingControllers.editMeeting)

router.delete('/:meetingId/deleteMeeting/:groupId', meetingControllers.deleteMeeting)

module.exports = router
