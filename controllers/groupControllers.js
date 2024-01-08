const { Group } = require('../models/Group.model')
const { User } = require('../models/User.model')
const { Meeting } = require('../models/Meeting.model')

// const { getToken, createMeeting } = require('../utils/videoSDK')

const myCustomError = require('../utils/myCustomError')
const {
	getNextDatesForMeetings,
} = require('../utils/meetingRecurrence.helpers')

exports.create = async (req, res, next) => {
	const {
		body: { name, description, topic, selfModerated, firstMeeting },
		userId: currentUserId,
	} = req
	const { roomInfo } = res.locals

	try {
		const group = new Group({
			name,
			description,
			topic,
			selfModerated: selfModerated || false,
			moderator: currentUserId,
			verified: selfModerated || false,
		})

		if (firstMeeting) {
			const meeting = await Meeting.create({
				...firstMeeting,
				roomId: roomInfo.data.roomId,
				group: group.id,
			})

			group.meetings.push(meeting)
		}

		await group.save()

		res.locals.user = await User.findOneAndUpdate(
			{ _id: currentUserId },
			{ $push: { moderatedGroups: group._id } }
		)

		res.locals.group = group

		if (process.env.NODE_ENV === 'development') {
			res.status(200).send({
				group,
				message: 'Group successfully created',
			})
		} else {
			next()
		}
	} catch (error) {
		next(error)
	}
}

exports.findAllForEmails = async () => {
	// eslint-disable-next-line no-useless-catch
	try {
		const groups = await Group.find(
			{ verified: false },
		)
			.populate('moderator', '_id alias email')
			.populate('members', 'alias email')
			.populate('meetings')

		return groups
	} catch (error) {
		throw error
	}
}

// Just attach `?page=2&limit=10&name=someName&topic=someTopic` to your request URL to enable pagination or filtering.
exports.findAll = async (req, res, next) => {
	try {
		// Set up pagination variables
		const page = parseInt(req.query.page) || 1
		const limit = parseInt(req.query.limit) || 10
		const skip = (page - 1) * limit

		// Set up filters for group name or topic
		const filter = {
			verified: true,
		}
		if (req.query.name) {
			filter.name = new RegExp(req.query.name, 'i') // Case-insensitive match
		}
		if (req.query.topic) {
			filter.topic = new RegExp(req.query.topic, 'i') // Case-insensitive match
		}

		const groups = await Group.find(
			filter,
			'name description verified img topic selfModerated membersCount'
		)
			.populate('moderator', '_id alias email')
			.populate('meetings')
			.skip(skip)
			.limit(limit)

		// get the total count for pagination info
		const totalCount = groups.length

		res.status(200).send({ groups, totalCount })
	} catch (error) {
		next(error)
	}
}

exports.findOne = async (req, res, next) => {
	const {
		params: { groupId },
		userId,
	} = req

	try {
		let group = await Group.findOne(
			{ _id: groupId },
			'name description verified img topic selfModerated membersCount'
		)
			.populate('moderator', 'alias email')
			.populate('members', 'alias email')
			.populate('meetings')

		if (!group) throw myCustomError('Group could not be found', 400)

		group = group.toJSON()

		const isModerator = group.moderator.id.equals(userId)
		const isMember = group.members.some((m) => m.id.equals(userId))

		group.meetings = getNextDatesForMeetings(group.meetings)
		group.futureMeetings = group.meetings
			.map((m) => {
				return m.nextRecurrences.map((r) => {
					delete m.nextRecurrences
					return {
						...m,
						startDate: r,
					}
				})
			})
			.flat()
			.sort((a, b) => new Date(a.startDate) - new Date(b.startDate))

		if (!isModerator && !isMember) delete group.members

		res.status(200).send(group)
	} catch (error) {
		next(error)
	}
}

exports.edit = async (req, res, next) => {
	const {
		body,
		params: { groupId },
	} = req

	try {
		const { acknowledged } = await Group.updateOne({ _id: groupId }, body)

		if (!acknowledged)
			throw myCustomError('Something went wrong updating the group', 400)

		res.send({
			message: 'Group successfully updated',
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
				},
			}
		)

		await User.updateOne(
			{ _id: group.moderator },
			{ $pull: { moderatedGroups: groupId } }
		)

		await Meeting.deleteMany({
			group: groupId,
		})

		await group.delete()

		res.send({ message: 'Gruppe erfolgreich gelöscht' })
	} catch (error) {
		next(error)
	}
}
