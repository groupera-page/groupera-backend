const router = require('express').Router()

const { groupSchema } = require('../models/Group.model')

const groupControllers = require('../controllers/groupControllers')
const { sendEmail } = require('../controllers/emailControllers')

const {
	verifyGroupModerator, verifyGroupMember,
} = require('../middleware/userAuthentication.middleware.js')
const {
	validateScheme,
	validateAuthToken,
	validateNoGroupDuplicates,
	verifyUser,
} = require('../middleware/auth.middleware')

router.post(
	'',
	validateScheme(groupSchema),
	validateAuthToken,
	validateNoGroupDuplicates,
	groupControllers.create,
	sendEmail('Create group')
)

router.get('/findAll', groupControllers.findAll)

router.get('/:groupId', verifyUser, verifyGroupMember, groupControllers.findOne)

router.patch(
	'/:groupId',
	validateScheme(groupSchema),
	validateAuthToken,
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
