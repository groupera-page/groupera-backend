const { Group } = require('../models/Group.model')
const { User } = require('../models/User.model')

exports.join = async (req, res, next) => {
	const {
		body: { currentUserId },
		params: { groupId },
	} = req

	try {
		let group = await Group.findOne({ _id: groupId })
		if (!group)
			return res
				.status(400)
				.send({ message: 'Die Gruppe existiert nicht' })

		if (!group.users.includes(currentUserId)) {
			await User.updateOne(
				{ _id: currentUserId },
				{ $push: { joinedGroups: group._id, meetings: group.meeting } }
			)

			await Group.updateOne(
				{ _id: groupId },
				{ $push: { users: currentUserId } }
			)

			res.send({ message: 'Gruppe erfolgreich beigetreten' })
		} else {
			res.status(400).send({
				message: 'Sie sind bereits in dieser Gruppe',
			})
		}
	} catch (error) {
		next(error)
	}
}

exports.leave = async (req, res, next) => {
	const {
		body: { currentUserId },
		params: { groupId },
	} = req

	try {
		let group = await Group.findOne({ _id: groupId })
		if (!group)
			return res
				.status(400)
				.send({ message: 'Die Gruppe existiert nicht' })

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
