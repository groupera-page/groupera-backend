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

		if (group.members.includes(currentUserId) || group.moderator.equals(currentUserId))
			throw myCustomError('You\'re already in this group, sweetie', 400)

		const user = await User.findOneAndUpdate(
			{ _id: currentUserId },
			{ $push: { joinedGroups: group.id } },
			{ returnOriginal: false }
		)

		await Group.updateOne(
			{ _id: groupId },
			{ $push: { members: currentUserId } }
		)

		if (process.env.NODE_ENV === 'development') {

			res.send({ message: 'Gruppe erfolgreich beigetreten' })
		} else{
			res.locals.user = user
			res.locals.groupName = group.name
			next()
		}
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

		if (group.moderator.equals(user.id))
			throw myCustomError(
				'Sie können eine Gruppe, die Sie moderieren, nicht verlassen',
				400
			)

		await Group.updateOne(
			{ _id: groupId },
			{ $pull: { members: currentUserId } }
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
