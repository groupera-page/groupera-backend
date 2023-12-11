const { Group } = require('../models/Group.model')
const { User } = require('../models/User.model')
const { Meeting } = require('../models/Meeting.model')

const myCustomError = require('../utils/myCustomError')

// eslint-disable-next-line no-unused-vars
const {getEvents, getEvent, deleteEvent} = require('../utils/googleCalendar')

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

		res.locals.user = await User.findOneAndUpdate(
			{ _id: currentUserId },
			{ $push: { moderatedGroups: group._id } }
		)

		res.locals.group = group

		if (process.env.NODE_ENV === 'development') {
			res.status(200).send({group, message: 'Group successfully created'})
		} else{
			next()
		}
	} catch (error) {
		next(error)
	}
}

// Just attach `?page=2&limit=10&name=someName&topic=someTopic` to your request URL to enable pagination or filtering.
exports.findAll = async (req, res, next) => {
	try {
		// Set up pagination variables
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const skip = (page - 1) * limit;

		// Set up filters for group name or topic
		const filter = {};
		if (req.query.name) {
			filter.name = new RegExp(req.query.name, 'i'); // Case-insensitive match
		}
		if (req.query.topic) {
			filter.topic = new RegExp(req.query.topic, 'i'); // Case-insensitive match
		}

		const groups = await Group
			.find(filter, 'name description verified img topic selfModerated membersCount')
			.populate('moderator', '_id alias email')
			.populate('meetings')
			.skip(skip)
			.limit(limit)

		// get the total count for pagination info
		const totalCount = await Group.countDocuments(filter);

		res.status(200).send({groups, totalCount})
	} catch (error) {
		next(error)
	}
}

exports.findOne = async (req, res, next) => {
	const { params: { groupId }, userId } = req

	try {
		let group = await Group
			.findOne({ _id: groupId }, 'name description verified img topic selfModerated membersCount')
			.populate('moderator', 'alias email')
			.populate('members', 'alias email')

		if (!group) throw myCustomError('Group could not be found', 400)

		group = group.toJSON()
		if(!group.moderator.id.equals(userId) && (!group.members || !group.members.some(m => m.id === userId))) delete group.members


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
		const {acknowledged} = await Group.updateOne(
			{ _id: groupId },
			{
				...body,
				verified: body.selfModerated || false
			}
		)

		if (!acknowledged) throw myCustomError('Something went wrong updating the group', 400)

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

		await User.updateMany(
			{
				joinedGroups: groupId,
			},
			{
				$pull: {
					joinedGroups: groupId,
					meetings: group.meetings
				},
			}
		)

		await User.updateOne({ _id: group.moderator }, { $pull: { moderatedGroups: groupId } })

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
