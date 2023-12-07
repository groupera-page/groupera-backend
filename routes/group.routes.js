const router = require('express').Router()

const { groupSchema } = require('../models/Group.model')

const groupControllers = require('../controllers/groupControllers')

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

module.exports = router
