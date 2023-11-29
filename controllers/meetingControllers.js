const { Group } = require('../models/Group.model')
const { User } = require('../models/User.model')
const { Meeting } = require('../models/Meeting.model')

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
	const {
		body: { frequency, date, time, length },
		params: { groupId },
	} = req

	try {
		const group = await Group.findOne({ _id: groupId })
		if (!group) throw myCustomError('Group could not be found', 400)

		const user = await User.findOne({ _id: group.moderatorId })

		let meeting = await new Meeting().save()

		const dateTime = dateTimeForCalender(date, time, length)

		let calendarEvent = {
			summary: group.name,
			description: `Join code: ${meeting._id}`,
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

		const calendarMeeting = await insertEvent(calendarEvent)

		await Meeting.updateOne(
			{ _id: meeting._id },
			{
				groupId: group._id,
				calendarId: calendarMeeting.id,
				$push: { members: user._id },
			}
		)

		await User.updateOne(
			{ _id: user._id },
			{ $push: { meetings: meeting._id } }
		)

		await Group.updateOne(
			{ _id: group._id },
			{ $push: { meetings: meeting._id } }
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
		const meeting = await Meeting.findOne({ _id: meetingId })
		if (!meeting) throw myCustomError('Meeting could not be found', 400)

		const group = await Group.findOne({ _id: groupId })

		const dateTime = dateTimeForCalender(date, time, length)

		const calendarEvent = {
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

		await editEvent(meeting.calendarId, calendarEvent)

		res.sendStatus(200)
	} catch (error) {
		next(error)
	}
}

exports.deleteMeeting = async (req, res, next) => {
	const { meetingId, groupId } = req.params

	try {
		const meeting = await Meeting.findOne({ _id: meetingId })

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
			{ _id: group._id },
			{
				$pull: {
					meetings: meetingId,
				},
			}
		)

		meeting.delete()

		await deleteEvent(meeting.calendarId)

		res.send({ message: 'Termin erfolgreich gelöscht' })
	} catch (error) {
		next(error)
	}
}
