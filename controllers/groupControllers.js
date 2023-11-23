const { Group } = require('../models/Group.model')
const { User } = require('../models/User.model')
// const cloudinary = require("../utils/cloudinary");
const {
	dateTimeForCalender,
	insertEvent,
	getEvents,
	deleteEvent,
	editEvent,
} = require('../utils/googleCalendar')
// const generateRoom = require("../utils/videoSDK");

exports.create = async (req, res, next) => {
	const {
		body: {
			// img,
			frequency,
			date,
			time,
			length,
			// token,
			moderationType,
		},
		userId: userId,
	} = req

	try {
		// if (img) {
		//   const uploadRes = await cloudinary.uploader.upload(img, {
		//     folder: "test",
		//   });
		//   if (!uploadRes) res.sendStatus(400)
		let group = await new Group({
			...req.body,
			// img: uploadRes
		}).save()

		const user = await User.findOne({ _id: userId })

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

		group.meeting = newEvent.id
		group.moderatorId = user._id
		// generateRoom(token, group._id, length);
		if (moderationType == 'Selbstmoderiert') group.verified = true

		group.save()

		res.send({ message: 'all good here, boss' })
	} catch (error) {
		next(error)
	}
}

exports.findAll = async (req, res, next) => {
	try {
		let groups = await Group.find()

		const start = '2023-10-03T00:00:00.000Z'
		const end = '2036-10-06T00:00:00.000Z'
		const allGroupMeetings = await getEvents(start, end)

		groups = await groups.map((group) => {
			return {
				_id: group._id,
				name: group.name,
				description: group.description,
				img: group.img,
				topic: group.topic,
				meetings: allGroupMeetings.filter((groupMeeting) =>
					groupMeeting.id.includes(group.meeting)
				),
			}
		})

		res.send(groups)
	} catch (error) {
		next(error)
	}
}

// pretty sure I made this obsolete
exports.meetings = async (req, res, next) => {
	const { groupId } = req.params
	try {
		const group = await Group.findOne({ _id: groupId })
		const start = '2023-10-03T00:00:00.000Z'
		const end = '2036-10-06T00:00:00.000Z'
		const events = await getEvents(start, end)
		const groupEvents = events.filter((event) =>
			event.id.includes(group.meeting)
		)

		res.send(groupEvents)
	} catch (error) {
		next(error)
	}
}

exports.findOne = async (req, res, next) => {
	const { groupId } = req.params
	try {
		let group = await Group.findOne({ _id: groupId })
		if (!group)
			return res
				.status(400)
				.send({ message: 'Die Gruppe existiert nicht' })
		const start = '2023-10-03T00:00:00.000Z'
		const end = '2036-10-06T00:00:00.000Z'
		const allGroupMeetings = await getEvents(start, end)
		const groupMeetings = allGroupMeetings.filter((groupMeeting) =>
			groupMeeting.id.includes(group.meeting)
		)
		res.send({ group, groupMeetings })
	} catch (error) {
		next(error)
	}
}

exports.edit = async (req, res, next) => {
	const {
		body: { date, time, length, frequency },
		params: { groupId },
	} = req

	try {
		let group = await Group.findOne({ _id: groupId })
		if (!group)
			return res
				.status(400)
				.send({ message: 'Die Gruppe existiert nicht' })

		await Group.updateOne({ _id: groupId }, { ...req.body })

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

		await editEvent(group.meeting, event)

		res.send({ message: 'Gruppe erfolgreich aktualisiert' })
	} catch (error) {
		next(error)
	}
}

exports.delete = async (req, res, next) => {
	const { groupId } = req.params
	try {
		let group = await Group.findOne({ _id: groupId })
		if (!group)
			return res
				.status(400)
				.send({ message: 'Die Gruppe existiert nicht' })

		await User.updateMany(
			{
				joinedGroups: {
					$in: [groupId],
				},
				meetings: {
					$in: [group.meeting],
				},
			},
			{
				$pull: {
					joinedGroups: groupId,
					meetings: group.meeting,
				},
			}
		)

		await User.updateOne(
			{ _id: group.moderatorId },
			{
				$pull: {
					moderatedGroups: groupId,
					meetings: group.meeting,
				},
			}
		)

		const user = await User.findOne({ _id: group.moderatorId })

		if (user.moderatedGroups.length === 0) {
			user.moderator = false
			await user.save()
		}

		await deleteEvent(group.meeting)

		await Group.deleteOne({ _id: groupId })
		res.send({ message: 'Gruppe erfolgreich gelöscht' })
	} catch (error) {
		next(error)
	}
}
