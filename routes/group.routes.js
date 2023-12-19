const router = require('express').Router()

const { groupCreateSchema, groupEditSchema } = require('../models/Group.model')
const { meetingCreateSchema } = require('../models/Meeting.model')

const groupControllers = require('../controllers/groupControllers')
const meetingControllers = require('../controllers/meetingControllers')
const { sendEmail } = require('../controllers/emailControllers')
const videoControllers = require('../controllers/videoControllers')

const {
	verifyGroupModerator,
} = require('../middleware/userAuthentication.middleware.js')

const {
	validateScheme,
	validateAuthToken,
	// validateNoGroupDuplicates,
} = require('../middleware/auth.middleware')

router.post(
	'',
	validateAuthToken,
	validateScheme(groupCreateSchema),
	// validateNoGroupDuplicates,
	videoControllers.getToken,
	videoControllers.createMeeting,
	groupControllers.create,
	sendEmail('Create group')
)

router.get('/', validateAuthToken, groupControllers.findAll)

router.get(
	'/:groupId',
	validateAuthToken,
	// verifyGroupMember,
	groupControllers.findOne
)

router.patch(
	'/:groupId',
	validateAuthToken,
	validateScheme(groupEditSchema),
	verifyGroupModerator,
	groupControllers.edit
)

router.delete(
	'/:groupId',
	validateAuthToken,
	verifyGroupModerator,
	groupControllers.delete
)

router.post(
	'/:groupId/meeting',
	validateAuthToken,
	verifyGroupModerator,
	validateScheme(meetingCreateSchema),
	videoControllers.getToken,
	videoControllers.createMeeting,
	meetingControllers.create
)

module.exports = router
