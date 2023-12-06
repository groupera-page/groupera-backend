const { Group } = require('../models/Group.model')

const myCustomError = require('../utils/myCustomError')

exports.verifyCurrentUser = async (req, res, next) => {
	const {
		userId: currentUserId,
		params: { userId: paramsUserId },
	} = req
	if (!currentUserId || currentUserId !== paramsUserId) {
		return next(myCustomError('Unauthorized', 401))
	}
	next()
}

exports.verifyGroupMember = async (req, res, next) => {
	const { params, userId: currentUserId } = req
	if (!params.groupId) return res.sendStatus(401)

	const group = await Group.findOne({ _id: params.groupId })

	if (currentUserId === 1) next()
	else if (
		currentUserId != group.moderatorId &&
		!group.users.includes(currentUserId)
	)
		next(myCustomError('Unauthorized', 401))
	else next()
}

exports.verifyGroupModerator = async (req, res, next) => {
	const { params, userId: currentUserId } = req
	if (!params.groupId) return res.sendStatus(401)

	const group = await Group.findOne({ _id: params.groupId })
	if (!group) next(myCustomError('Group not found', 400))

	if (currentUserId != group.moderatorId)
		next(myCustomError('Unauthorized', 401))

	next()
}