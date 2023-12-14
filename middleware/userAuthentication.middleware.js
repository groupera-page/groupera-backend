const { Group } = require('../models/Group.model')

const myCustomError = require('../utils/myCustomError')
const {Meeting} = require('../models/Meeting.model');

exports.verifyCurrentUser = async (req, res, next) => {
	const {
		userId: currentUserId,
		params: { userId: paramsUserId },
	} = req
	if (!currentUserId || currentUserId !== paramsUserId) {
		return next(myCustomError('Unauthorized', 403))
	}
	next()
}

exports.verifyGroupMember = async (req, res, next) => {
	const { params, userId: currentUserId } = req
	if (!params.groupId) return res.sendStatus(403)

	try {
		const group = await Group.findOne({ _id: params.groupId })

		if ( // if either member of the group or moderator
			!group.moderator.equals(currentUserId) &&
			// group.moderator !== currentUserId &&
			!group.members.includes(currentUserId)
		) throw myCustomError('Unauthorized', 403)

		next()
	} catch (error) {
		next(error)
	}
}

exports.verifyGroupModerator = async (req, res, next) => {
	const { params, userId: currentUserId } = req
	if (!params.groupId) return res.sendStatus(403)

	try {
		const group = await Group.findOne({ _id: params.groupId })
		if (!group) throw myCustomError('Group not found', 400)

		if (!group.moderator.equals(currentUserId))
			throw myCustomError('Unauthorized', 403)

		next()
	} catch(error) {
		next(error)
	}
}

exports.verifyMeetingAdmin = async (req, res, next) => {
	const { userId: currentUserId, params: {meetingId} } = req

	try {
		const meeting = await Meeting.findById(meetingId).populate('group')

		if (!meeting) throw myCustomError('Meeting not found', 400)

		if (!meeting.group.moderator.equals(currentUserId))
			throw myCustomError('Unauthorized', 403)

		next()
	} catch (error) {
		next(error)
	}
}
