const router = require('express').Router()
const groupControllers = require('../controllers/groupControllers')
const {
	verifyGroupModerator,
} = require('../middleware/userAuthentication.middleware.js')
const { validateAuthToken } = require('../middleware/auth.middleware')

router.post('', groupControllers.create)

router.get('/findAll', groupControllers.findAll)

// pretty sure I made this obsolete
router.get('/:groupId/meetings', groupControllers.meetings)

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
