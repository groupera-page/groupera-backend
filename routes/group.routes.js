const router = require('express').Router()

const { groupSchema } = require('../models/Group.model')
const {meetingSchema} = require('../models/Meeting.model');

const groupControllers = require('../controllers/groupControllers')
const meetingControllers = require('../controllers/meetingControllers');
const { sendEmail } = require('../controllers/emailControllers')

const {
	verifyGroupModerator,
} = require('../middleware/userAuthentication.middleware.js')

const {
	validateScheme,
	validateAuthToken,
	validateNoGroupDuplicates,
} = require('../middleware/auth.middleware')

router.post(
	'',
	validateAuthToken,
	validateScheme(groupSchema),
	validateNoGroupDuplicates,
	groupControllers.create,
	sendEmail('Create group')
)

router.get('/', validateAuthToken, groupControllers.findAll)

router.get('/:groupId',
	validateAuthToken,
	// verifyGroupMember,
	groupControllers.findOne
)

router.patch(
	'/:groupId',
	validateAuthToken,
	// validateScheme(groupSchema),
	verifyGroupModerator,
	groupControllers.edit
)

router.delete(
	'/:groupId',
	validateAuthToken,
	verifyGroupModerator,
	groupControllers.delete
)

router.post('/:groupId/meeting', validateAuthToken, verifyGroupModerator, validateScheme(meetingSchema), meetingControllers.create)

module.exports = router
