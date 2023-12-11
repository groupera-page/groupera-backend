const { Meeting } = require('../models/Meeting.model')
const { Group } = require('../models/Group.model')

const myCustomError = require('../utils/myCustomError')

exports.create = async (req, res, next) => {
	const { groupId } = req.params

	try {
		let group = await Group.findOne({ _id: groupId })
		if (!group) throw myCustomError('Group could not be found', 400)

		const meeting = await Meeting.create({
			...req.body,
			groupId: groupId,
		})

		group = await Group.updateOne({ _id: groupId }, { $push : { meetings: meeting._id } })

		res.send(meeting)
	} catch (error) {
		next(error)
	}
}

exports.edit = async (req, res, next) => {
	const { meetingId } = req.params
	
	try {
		const meeting = await Meeting.findOneAndUpdate({ _id: meetingId },
			{ ...req.body }, { returnOriginal: false })

		res.send(meeting)
	} catch (error) {
		next(error)
	}
}

exports.delete = async (req, res, next) => {
	const { meetingId } = req.params

	try {
		const meeting = await Meeting.findOne({ _id: meetingId })

		await Group.updateOne({ _id: meeting.groupId }, { $pull: { meetings: meetingId }})

		meeting.delete()

		res.send('Besprechung gelöscht')
	} catch (error) {
		next(error)
	}
}