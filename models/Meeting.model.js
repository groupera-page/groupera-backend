const { Schema, model } = require('mongoose')
const Joi = require('joi')


const meetingSchema = new Schema({
	title: {
		type: String,
	},
	startDate: {
		type: Date,
	},
	duration: {
		type: Number,
	},
	recurrence: {
		meetingType: {
			type: String,
		},
		days: [String],
	},
	recurrenceEndDate: {
		type: Date,
	},
	groupId: {
		type: Schema.Types.ObjectId,
		ref: 'Group',
	},
})

const Meeting = model('Meeting', meetingSchema)

const schema = {
	title: Joi.string().required().label('Title'),
	startDate: Joi.date().required().label('Start date'),
	duration: Joi.number().required().label('Duration'),
	recurrence: Joi.object().required().label('Recurrence'),
}

module.exports = { Meeting, meetingSchema: schema }