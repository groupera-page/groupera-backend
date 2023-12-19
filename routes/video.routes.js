const router = require('express').Router()
const videoControllers = require('../controllers/videoControllers')

// just in case routes are needed

router.get('/getToken', videoControllers.getToken)

router.post('/createMeeting', videoControllers.createMeeting)

module.exports = router
