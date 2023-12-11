const router = require('express').Router()

const { groupSchema } = require('../models/Group.model')

const groupControllers = require('../controllers/groupControllers')
const { sendEmail } = require('../controllers/emailControllers')

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
	validateScheme(groupSchema),
	// validateNoGroupDuplicates,
	groupControllers.create,
	sendEmail('Create group')
)

router.get('/', validateAuthToken, groupControllers.findAll)

router.get('/:groupId',
	validateAuthToken,
	// verifyGroupMember,
	groupControllers.findOne
)

// router.get('/:groupId/meetings', groupControllers.groupMeetings)

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

module.exports = router
