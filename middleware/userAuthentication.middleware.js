const { Group } = require('../models/Group.model')
const { Meeting } = require('../models/Meeting.model')
const { User } = require('../models/User.model')

const myCustomError = require('../utils/myCustomError')

const verifyCurrentUser = async (req, res, next) => {
	const {
		userId: currentUserId,
		params: { userId: paramsUserId },
	} = req
	// console.log(currentUserId)
	if (!currentUserId || currentUserId !== paramsUserId){
		return next(myCustomError('Unauthorized', 401)) 
	}
	next()
}

const verifyGroupMember = async (req, res, next) => {
	const { params: meetingId, userId: currentUserId } = req
	if (!meetingId) return res.sendStatus(401)

	const meeting = await Meeting.findOne({ _id: meetingId.meetingId })
	const group = await Group.findOne({ _id: meeting.groupId })
	// const user = await User.findOne({ _id: currentUserId })

	if (!group) next(myCustomError('Group not found', 400))

	// console.log(group.users)
	// console.log(user._id)
	if (currentUserId != group.moderatorId && !group.users.includes(currentUserId))
		next(myCustomError('Unauthorized', 401))

	next()
}

const verifyGroupModerator = async (req, res, next) => {
	const { params, userId: currentUserId } = req
	if (!params.groupId) return res.sendStatus(401)

	const group = await Group.findOne({ _id: params.groupId })
	if (!group) next(myCustomError('Group not found', 400))

	if (currentUserId != group.moderatorId)
		next(myCustomError('Unauthorized', 401))

	next()
}

module.exports = {
	verifyCurrentUser,
	verifyGroupModerator,
	verifyGroupMember
}
