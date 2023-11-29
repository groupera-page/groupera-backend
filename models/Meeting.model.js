const { Schema, model } = require('mongoose')
const Joi = require('joi')

const meetingSchema = new Schema({
	members: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Member',
		},
	],
	groupId: {
		type: Schema.Types.ObjectId,
		ref: 'Group',
	},
	calendarId: {
		type: String,
	},
})

const Meeting = model('Meeting', meetingSchema)

const schema = {
	members: Joi.array().max(15),
}

module.exports = { Meeting, meetingSchema: schema }
