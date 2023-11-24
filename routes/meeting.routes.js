const router = require('express').Router()

const meetingControllers = require('../controllers/meetingControllers')

router.patch('/:groupId/editMeeting/:meetingId', meetingControllers.editMeeting)

module.exports = router
