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
	const {
		meetingParameters: { frequency, date, time, length },
		user,
		group,
		// token
	} = res.locals

	try {
		if (!res.locals)
			next(myCustomError('Something went wrong with setting locals', 500))

		const dateTime = dateTimeForCalender(date, time, length)

		const event = {
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
		const newEvent = await insertEvent(event)

		await User.updateOne(
			{ _id: user._id },
			{ $push: { moderatedGroups: group._id, meetings: newEvent.id } }
		)

		await Group.updateOne(
			{ _id: group._id },
			{ $push: { meetings: newEvent.id }, moderatorId: user._id }
		)

		// generateRoom(token, group._id, length);

		res.send({ message: 'all good here, boss' })
	} catch (error) {
		next(error)
	}
}
