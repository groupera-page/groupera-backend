const router = require('express').Router()

const { groupSchema } = require('../models/Group.model')

const groupControllers = require('../controllers/groupControllers')
const {
	verifyCurrentUser,
	verifyGroupModerator,
} = require('../middleware/userAuthentication.middleware.js')
const {
	validateScheme,
	validateAuthToken,
	validateNoGroupDuplicates
} = require('../middleware/auth.middleware')

router.post('', validateScheme(groupSchema), validateAuthToken, validateNoGroupDuplicates, groupControllers.create)

router.get('/findAll', groupControllers.findAll)

router.get('/:groupId', groupControllers.findOne)

router.patch(
	'/:groupId',
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
