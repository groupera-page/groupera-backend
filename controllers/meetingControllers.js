const { Group } = require('../models/Group.model')
const { User } = require('../models/User.model')

const myCustomError = require('../utils/myCustomError')
// const generateRoom = require("../utils/videoSDK");

const {
	dateTimeForCalender,
	insertEvent,
	getEvents,
	getEvent,
	deleteEvent,
	editEvent,
} = require('../utils/googleCalendar')

exports.createMeeting = async (req, res, next) => {
	// const {
	// 	meetingParameters: { frequency, date, time, length },
	// 	user,
	// 	group,
	// 	// token
	// } = res.locals

	const {
		body: { frequency, date, time, length },
		params: { groupId },
	} = req

	try {
		const group = await Group.findOne({ _id: groupId })

		const dateTime = dateTimeForCalender(date, time, length)

		const meeting = {
			summary: group.name,
			description: `Join code: ${group._id}`,
			start: {
				dateTime: dateTime['start'],
				timeZone: 'Europe/Berlin',
			},
			end: {
				dateTime: dateTime['end'],
				timeZone: 'Europe/Berlin',
			},
			recurrence: [`RRULE:FREQ=WEEKLY;COUNT=2;INTERVAL=${+frequency}`],
		}
		const newMeeting = await insertEvent(meeting)

		await User.updateOne(
			{ _id: group.moderatorId },
			{ $push: { meetings: newMeeting.id } }
		)

		await Group.updateOne(
			{ _id: group._id },
			{ $push: { meetings: newMeeting.id } }
		)

		// generateRoom(token, group._id, length);

		res.send({ message: 'all good here, boss' })
	} catch (error) {
		next(error)
	}
}

exports.editMeeting = async (req, res, next) => {
	const {
		params: { meetingId, groupId },
		body: { date, time, length, frequency },
	} = req

	try {
		const dateTime = dateTimeForCalender(date, time, length)

		const group = await Group.findOne({ _id: groupId })
		if (!group) throw myCustomError('Group could not be found', 400)

		const meeting = {
			summary: group.name,
			description: `Join code: ${group._id}`,
			start: {
				dateTime: dateTime['start'],
				timeZone: 'Europe/Berlin',
			},
			end: {
				dateTime: dateTime['end'],
				timeZone: 'Europe/Berlin',
			},
			recurrence: [`RRULE:FREQ=WEEKLY;COUNT=2;INTERVAL=${+frequency}`],
		}

		const editedMeeting = await editEvent(meetingId, meeting)

		res.send(editedMeeting)
	} catch (error) {
		next(error)
	}
}

exports.joinMeeting = async (req, res, next) => {
	const {
		params: { meetingId },
		userId: userId,
	} = req

	try {
		console.log(userId)
		let users = await User.find()
		users = users.filter((user) => user.meetings.includes(meetingId))

		if (users.length >= 15) throw myCustomError('Group is full', 400)

		await User.updateOne(
			{ _id: userId },
			{ $push: { meetings: meetingId } }
		)

		res.sendStatus(200)
	} catch (error) {
		next(error)
	}
}

exports.leaveMeeting = async (req, res, next) => {
	const { meetingId, groupId } = req.params

	try {
	} catch (error) {
		next(error)
	}
}

exports.deleteMeeting = async (req, res, next) => {
	const { meetingId, groupId } = req.params

	try {
		const group = await Group.findOne({ _id: groupId })
		if (group.meetings.length === 1)
			throw myCustomError('Group must have at least one meeting', 400)

		await User.updateMany(
			{
				meetings: {
					$in: [meetingId],
				},
			},
			{
				$pull: {
					meetings: meetingId,
				},
			}
		)

		await Group.updateOne(
			{ _id: groupId },
			{
				$pull: {
					meetings: meetingId,
				},
			}
		)

		await deleteEvent(meetingId)

		res.send({ message: 'Termin erfolgreich gelöscht' })
	} catch (error) {
		next(error)
	}
}
