const { Group } = require('../models/Group.model')
// const { Meeting } = require('../models/Meeting.model')
const { User } = require('../models/User.model')

const myCustomError = require('../utils/myCustomError')

exports.join = async (req, res, next) => {
	const {
		userId: currentUserId,
		params: { groupId },
	} = req
	try {
		const group = await Group.findById(groupId)
		if (!group) throw myCustomError('Die Gruppe existiert nicht', 400)

		if (group.members.includes(currentUserId))
			throw myCustomError('You\'re already in this group, sweetie', 400)

		await User.updateOne(
			{ _id: currentUserId },
			{ $push: { joinedGroups: group.id } }
		)

		await Group.updateOne(
			{ _id: groupId },
			{ $push: { members: currentUserId } }
		)

		res.send({ message: 'Gruppe erfolgreich beigetreten' })
	} catch (error) {
		next(error)
	}
}

exports.leave = async (req, res, next) => {
	const {
		userId: currentUserId,
		params: { groupId },
	} = req

	try {
		const group = await Group.findById(groupId)
		if (!group) throw myCustomError('Die Gruppe existiert nicht', 400)
		
		const user = await User.findById(currentUserId)

		await Group.updateOne(
			{ _id: groupId },
			{ $pull: { users: currentUserId } }
		)

		await User.updateOne(
			{ _id: user._id },
			{ $pull: { joinedGroups: groupId } }
		)

		// for (let i = 0; i < user.meetings.length; i++) {
		// 	const meeting = await Meeting.findOne({ _id: user.meetings[i] })
		//
		// 	if (group.meetings.includes(meeting.id)) {
		// 		await User.updateOne(
		// 			{ _id: user._id },
		// 			{ $pull: { meetings: meeting.id } }
		// 		)
		//
		// 		await Meeting.updateOne(
		// 			{ _id: meeting._id },
		// 			{ $pull: { members: user._id } }
		// 		)
		// 	}
		// }

		res.send({ message: 'Gruppe erfolgreich verlassen' })
	} catch (error) {
		next(error)
	}
}
