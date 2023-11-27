const router = require('express').Router()

const meetingControllers = require('../controllers/meetingControllers')

router.patch('/:groupId/editMeeting/:meetingId', meetingControllers.editMeeting)

router.delete('/:groupId/deleteMeeting/:meetingId', meetingControllers.deleteMeeting)

module.exports = router
