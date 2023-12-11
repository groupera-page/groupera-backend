const { Meeting } = require('../models/Meeting.model')
const { Group } = require('../models/Group.model')

const myCustomError = require('../utils/myCustomError')

exports.createMeeting = async (req, res, next) => {
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
