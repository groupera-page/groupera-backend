const express = require('express')
const authRoutes = require('./auth.routes')
const userRoutes = require('./user.routes')
const profileRoutes = require('./profile.routes')
const groupRoutes = require('./group.routes')
const groupMembershipRoutes = require('./groupMembership.routes')
const videoRoutes = require('./video.routes')
const paymentRoutes = require('./payment.routes')
const meetingRoutes = require('./meeting.routes')
const meetingMembershipRoutes = require('./meetingMembership.routes')

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/profile', profileRoutes)
router.use('/group', groupRoutes)
router.use('/groupMembership', groupMembershipRoutes)
router.use('/video', videoRoutes)
router.use('/payment', paymentRoutes)
router.use('/meeting', meetingRoutes)
router.use('/meetingMembership', meetingMembershipRoutes)

module.exports = router
