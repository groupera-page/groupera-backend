const router = require('express').Router()

const { groupSchema } = require('../models/Group.model')

const groupControllers = require('../controllers/groupControllers')

const {
	verifyGroupModerator, verifyGroupMember,
} = require('../middleware/userAuthentication.middleware.js')
const {
	validateScheme,
	validateAuthToken,
	validateNoGroupDuplicates,
	verifyForUserInfo,
} = require('../middleware/auth.middleware')

router.post(
	'',
	validateScheme(groupSchema),
	validateAuthToken,
	validateNoGroupDuplicates,
	groupControllers.create,
)

router.get('/findAll', groupControllers.findAll)

router.get('/:groupId', verifyForUserInfo, verifyGroupMember, groupControllers.findOne)

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
