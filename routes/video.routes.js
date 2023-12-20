const router = require('express').Router()
const videoControllers = require('../controllers/videoControllers')

// just in case routes are needed

// for users joining groups
router.get('/getTokenUser', videoControllers.getTokenUser)


// for groups creating meetings
router.get('/getTokenMeeting', videoControllers.getTokenMeeting)


router.post('/createMeeting', videoControllers.createMeeting)

module.exports = router
