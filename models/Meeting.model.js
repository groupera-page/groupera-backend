const { Schema, model } = require('mongoose')
const Joi = require('joi')

const meetingSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		startDate: {
			type: Date,
			required: true,
		},
		duration: {
			type: Number,
			enum: [60, 90],
			required: true,
		},
		recurrence: {
			meetingType: {
				type: String,
				enum: ['weekly', 'bi-weekly', 'monthly'],
				required: true,
			},
			days: {
				type: [Number],
				enum: [1, 2, 3, 4, 5, 6, 7],
				required: true,
			},
		},
		until: {
			type: Date,
			required: true,
		},
		group: {
			type: Schema.Types.ObjectId,
			ref: 'Group',
		},
	},
	{
		toJSON: {
			virtuals: true,
			transform: function (doc, ret) {
				ret.id = ret._id
				delete ret._id
				delete ret.__v
			},
		},
		toObject: {
			virtuals: true,
			transform: function (doc, ret) {
				ret.id = ret._id
				delete ret._id
				delete ret.__v
			},
		},
	}
)

const Meeting = model('Meeting', meetingSchema)

const meetingCreateSchema = {
	title: Joi.string().required(),
	startDate: Joi.date().required(),
	duration: Joi.number().valid(60, 90).required(),
	recurrence: Joi.object({
		meetingType: Joi.string().valid('weekly', 'bi-weekly', 'monthly'),
		days: Joi.array().items(Joi.number().valid(1, 2, 3, 4, 5, 6, 7)),
	}).required(),
	until: Joi.date(),
}

const meetingEditSchema = {
	title: Joi.string(),
	startDate: Joi.date(),
	duration: Joi.number().valid(60, 90),
	recurrence: Joi.object({
		meetingType: Joi.string().valid('weekly', 'bi-weekly', 'monthly'),
		days: Joi.array().items(Joi.number().valid(1, 2, 3, 4, 5, 6, 7)),
	}),
	until: Joi.date(),
}

module.exports = { Meeting, meetingSchema, meetingCreateSchema, meetingEditSchema }
