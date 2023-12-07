const { Group } = require('../models/Group.model')

const myCustomError = require('../utils/myCustomError')

exports.verifyCurrentUser = async (req, res, next) => {
	const {
		userId: currentUserId,
		params: { userId: paramsUserId },
	} = req
	// console.log(currentUserId)
	if (!currentUserId || currentUserId !== paramsUserId) {
		return next(myCustomError('Unauthorized', 401))
	}
	next()
}

exports.verifyGroupMember = async (req, res, next) => {
	const { params, userId: currentUserId } = req
	if (!params.groupId) return res.sendStatus(401)

	const group = await Group.findOne({ _id: params.groupId })

	if ( // if either member of the group or moderator
		!group.moderator.equals(currentUserId) &&
		// group.moderator !== currentUserId &&
		!group.members.includes(currentUserId)
	){
		next(myCustomError('Unauthorized', 401))
	} else next()
}

exports.verifyGroupModerator = async (req, res, next) => {
	const { params, userId: currentUserId } = req
	if (!params.groupId) return res.sendStatus(401)

	const group = await Group.findOne({ _id: params.groupId })
	if (!group) next(myCustomError('Group not found', 400))

	if (!group.moderator.equals(currentUserId))
		next(myCustomError('Unauthorized', 401))

	next()
}