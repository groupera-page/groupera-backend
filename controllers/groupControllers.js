const { Group } = require('../models/Group.model')
const { User } = require('../models/User.model')
const { Meeting } = require('../models/Meeting.model')

const myCustomError = require('../utils/myCustomError')

// const {getEvents, getEvent, deleteEvent} = require('../utils/googleCalendar')

exports.create = async (req, res, next) => {
	const {
		body: {name, description, topic, selfModerated},
		userId: currentUserId,
	} = req

	try {
		const group = await Group.create({
			name,
			description,
			topic,
			selfModerated: selfModerated || false,
			moderator: currentUserId,
			verified: selfModerated || false
		})

		const user = await User.findOneAndUpdate(
			{ _id: currentUserId },
			{ $push: { moderatedGroups: group._id } }
		)

		res.send({
			group,
			message: 'Group successfully created'
		})
	} catch (error) {
		next(error)
	}
}

exports.findAll = async (req, res, next) => {
	try {
		const groups = await Group
			.find({}, 'name description verified img topic selfModerated membersCount')
			.populate('moderator', '_id alias email')
			.populate('meetings')

		res.status(200).send(groups)
	} catch (error) {
		next(error)
	}
}

exports.findOne = async (req, res, next) => {
	const { params: { groupId }, userId } = req

	try {
		const group = await Group
			.findOne({ _id: groupId }, 'name description verified img topic selfModerated membersCount')
			.populate('moderator', '_id alias email')
			.populate('members', '_id alias email')

		if (!group) throw myCustomError('Group could not be found', 400)

		if(!group.members || !group.members.some(m => m.id === userId)) await group.depopulate('members')

		res.status(200).send(group)
	} catch (error) {
		next(error)
	}
}

exports.groupMeetings = async (req, res, next) => {
	const { groupId } = req.params
	const allGroupMeetings = await getEvents()

	try {
		const group = await Group.findOne({ _id: groupId })
		if (!group) throw myCustomError('Group could not be found', 400)

		const meetings = await Promise.all(group.meetings.map(async (event) => {
			const meetingObject = await Meeting.findOne({ _id: event })

			return allGroupMeetings.filter((groupMeeting) =>
				groupMeeting.id.includes(meetingObject.calendarId)
			)
		}))

		res.send(meetings)
	} catch (error) {
		next(error)
	}
}

exports.edit = async (req, res, next) => {
	const { body, params: {groupId} } = req

	try {
		const groupUpdateInfo = await Group.updateOne(
			{ _id: groupId },
			{
				...body,
				verified: body.selfModerated || false
			},
			{ returnOriginal: false }
		)

		if (!groupUpdateInfo || !groupUpdateInfo.acknowledged) throw myCustomError('Something went wrong updating the group', 400)

		res.send({
			message: 'Group successfully updated'
		})
	} catch (error) {
		next(error)
	}
}

exports.delete = async (req, res, next) => {
	const { groupId } = req.params

	try {
		let group = await Group.findOne({ _id: groupId }).populate('meetings')
		if (!group) throw myCustomError('Group could not be found', 400)

		// In the group creation logic, a new group is pushed into the user's moderatedGroups array and so this won't
		// take into account the moderator (because the group isn't in their joinedGroups) 
		await User.updateMany(
			{
				joinedGroups: groupId,
			},
			{
				$pull: {
					joinedGroups: groupId,
					meetings: group.meetings,
					moderatedGroups: groupId
				},
			}
		)

		await Meeting.deleteMany(
			{
				group: groupId
			}
		)

		await group.delete()

		res.send({ message: 'Gruppe erfolgreich gelöscht' })
	} catch (error) {
		next(error)
	}
}
