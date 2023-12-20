const { Meeting } = require('../models/Meeting.model')
const { Group } = require('../models/Group.model')

const myCustomError = require('../utils/myCustomError')

exports.create = async (req, res, next) => {
	const { groupId } = req.params
	const { roomInfo } = res.locals

	try {
		let group = await Group.findOne({ _id: groupId })
		if (!group) throw myCustomError('Group could not be found', 400)

		const meeting = await Meeting.create({
			...req.body,
			roomId: roomInfo.data.roomId,
			group: groupId,
		})

		await Group.updateOne({ _id: groupId }, { $push : { meetings: meeting._id } })

		res.send(meeting)
	} catch (error) {
		next(error)
	}
}

exports.edit = async (req, res, next) => {
	const { params: {meetingId}, body } = req
	
	try {
		const meeting = await Meeting.findOneAndUpdate({ _id: meetingId },
			body, { returnOriginal: false })

		res.send(meeting)
	} catch (error) {
		next(error)
	}
}

exports.delete = async (req, res, next) => {
	const { meetingId } = req.params

	try {
		const meeting = await Meeting.findOne({ _id: meetingId })

		await Group.updateOne({ _id: meeting.group }, { $pull: { meetings: meetingId }})

		meeting.delete()

		res.send({message: 'Besprechung gelöscht'})
	} catch (error) {
		next(error)
	}
}
