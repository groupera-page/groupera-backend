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
		type: {
			type: String,
		},
		days: [Number],
	},
	until: {
		type: Date,
	},
	videoMeetingId: {
		type: String,
	},
	group: {
		type: Schema.Types.ObjectId,
		ref: 'Group',
	},
}, {
	toJSON: {
		virtuals: true,
		transform: function(doc, ret) {
			ret.id = ret._id;
			ret.recurrence.days = ret.recurrence.days.sort((a, b) => a-b)
			delete ret._id;
			delete ret.__v;
		}
	},
	toObject: {
		virtuals: true,
		transform: function(doc, ret) {
			ret.id = ret._id;
			ret.recurrence.days = ret.recurrence.days.sort((a, b) => a-b)
			delete ret._id;
			delete ret.__v;
		}
	},
})

const Meeting = model('Meeting', meetingSchema)

const meetingCreateSchema = {
	title: Joi.string().required(),
	startDate: Joi.date().required(),
	duration: Joi.number().valid(60, 90).required(),
	recurrence: Joi.object({ type: Joi.string().valid('weekly', 'bi-weekly', 'monthly'), days: Joi.array().items(Joi.number())}).required(),
}

const meetingEditSchema = {
	title: Joi.string(),
	startDate: Joi.date(),
	duration: Joi.number().valid(60, 90),
	recurrence: Joi.object({ type: Joi.string().valid('weekly', 'bi-weekly', 'monthly'), days: Joi.array().items(Joi.number())}),
}

module.exports = { Meeting, meetingSchema, meetingCreateSchema, meetingEditSchema }
