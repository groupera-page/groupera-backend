const { User } = require('../models/User.model')
const { Meeting } = require('../models/Meeting.model')

const myCustomError = require('../utils/myCustomError')

exports.joinMeeting = async (req, res, next) => {
	const {
		params: { meetingId },
		userId: userId,
	} = req

	try {
		// if (userId === 1) throw myCustomError('Please create an account and join this group first', 401)
		const meeting = await Meeting.findOne({ _id: meetingId })
		if (!meeting || meeting.members.length >= 15) throw myCustomError(400)

		const user = await User.findOne({ _id: userId })
		if (user.meetings.includes(meetingId))
			throw myCustomError(
				'You are already signed up for this meeting',
				400
			)

		await Meeting.updateOne(
			{ _id: meeting._id },
			{ $push: { members: user._id } }
		)

		await User.updateOne(
			{ _id: user._id },
			{ $push: { meetings: meeting._id } }
		)

		res.sendStatus(200)
	} catch (error) {
		next(error)
	}
}

exports.leaveMeeting = async (req, res, next) => {
	const {
		params: { meetingId },
		userId: userId,
	} = req

	try {
		// if (userId === 1) throw myCustomError('Please create an account and join this group first', 401)
		const meeting = await Meeting.findOne({ _id: meetingId })
		if (!meeting) throw myCustomError('Meeting could not be found', 400)

		const user = await User.findOne({ _id: userId })
		if (!user.meetings.includes(meetingId))
			throw myCustomError('You are not signed up for this meeting', 400)

		await Meeting.updateOne(
			{ _id: meeting._id },
			{ $pull: { members: user._id } }
		)

		await User.updateOne(
			{ _id: user._id },
			{ $pull: { meetings: meeting._id } }
		)

		res.sendStatus(200)
	} catch (error) {
		next(error)
	}
}