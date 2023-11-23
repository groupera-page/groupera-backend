const { Group } = require('../models/Group.model')
const { User } = require('../models/User.model')

const myCustomError = require('../utils/myCustomError')

exports.join = async (req, res, next) => {
	const {
		userId: currentUserId,
		params: { groupId },
	} = req
	try {
		let group = await Group.findOne({ _id: groupId })
		if (!group) throw myCustomError('Die Gruppe existiert nicht', 400)

		if (!currentUserId) throw myCustomError('User could not be found', 400)

		if (group.users.includes(currentUserId))
			throw myCustomError(`You're already in this group, sweetie`, 400)

		await User.updateOne(
			{ _id: currentUserId },
			{ $push: { joinedGroups: group._id, meetings: group.meeting } }
		)

		await Group.updateOne(
			{ _id: groupId },
			{ $push: { users: currentUserId } }
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
		let group = await Group.findOne({ _id: groupId })
		if (!group) throw myCustomError('Die Gruppe existiert nicht', 400)

		await Group.updateOne(
			{ _id: groupId },
			{ $pull: { users: currentUserId } }
		)

		await User.updateOne(
			{ _id: currentUserId },
			{ $pull: { joinedGroups: groupId, meetings: group.meeting } }
		)
		res.send({ message: 'Gruppe erfolgreich verlassen' })
	} catch (error) {
		next(error)
	}
}
