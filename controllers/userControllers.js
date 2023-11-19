const { User } = require('../models/User.model')
const { Group } = require('../models/Group.model')

const myCustomError = require('../utils/myCustomError')
const { getEvents, deleteEvent } = require('../utils/googleCalendar')

exports.findOne = async (req, res, next) => {
	const { userId } = req.params
	try {
		const user = await User.findOne({ _id: userId })
		if (!user) throw myCustomError('User could not be found', 400)

		res.send(user)
	} catch (error) {
		next(error)
	}
}

exports.meetings = async (req, res, next) => {
	const { userId } = req.params
	try {
		let user = await User.findOne({ _id: userId })
		let start = '2023-10-03T00:00:00.000Z'
		let end = '2026-10-06T00:00:00.000Z'
		let event = await getEvents(start, end)
		let mappedEvent = user.meetings.map((meetings) =>
			event.filter((events) => events.id.includes(meetings))
		)
		res.send(mappedEvent)
	} catch (error) {
		next(error)
	}
}

exports.groups = async (req, res, next) => {
	const { userId } = req.params
	try {
		let groups = await Group.find()

		let foundGroups = groups.filter(
			(groups) =>
				groups.users.includes(userId) || groups.moderatorId === userId
		)
		res.send(foundGroups)
	} catch (error) {
		next(error)
	}
}

exports.edit = async (req, res, next) => {
	const { userId } = req.params
	try {
		let user = await User.findOne({ _id: userId })
		if (!user) throw myCustomError('User could not be found', 400)

		await User.updateOne({ _id: userId }, { ...req.body })

		res.send({ message: 'Benutzer erfolgreich aktualisiert' })
	} catch (error) {
		next(error)
	}
}

exports.delete = async (req, res, next) => {
	const { userId } = req.params
	try {
		const user = await User.findOne({ _id: userId })
		if (!user) throw myCustomError('User could not be found', 400)

		await Group.updateMany(
			{
				users: {
					$in: [userId],
				},
				// moderator: req.params.id
			},
			{
				$pull: {
					users: userId,
					// moderator: req.params.id
				},
			}
		)

		user.moderatedGroups.map(async (groupIds) => {
			const specGroup = await Group.findOne({ _id: groupIds })

			await User.updateMany(
				{
					joinedGroups: {
						$in: [groupIds],
					},
				},
				{
					$pull: {
						joinedGroups: groupIds,
						meetings: specGroup.meeting,
					},
				}
			)
		})

		user.meetings.map((meeting) => deleteEvent(meeting))

		await Group.deleteMany({ moderator: userId })

		await User.deleteOne({ _id: userId })

		res.send({ message: 'Benutzer erfolgreich gelöscht' })
	} catch (error) {
		next(error)
	}
}
