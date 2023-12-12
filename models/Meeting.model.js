const { Schema, model } = require('mongoose')
const Joi = require('joi')

const meetingSchema = new Schema(
	{
		title: {
			type: String,
		},
		startDate: {
			type: Date,
		},
		duration: {
			type: Number,
			enum: [60, 90],
		},
		recurrence: {
			type: {
				type: String,
				enum: ['weekly', 'bi-weekly', 'monthly'],
			},
			days: { type: [Number], enum: [1, 2, 3, 4, 5, 6, 7] },
		},
		until: {
			type: Date,
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

const schema = {
	title: Joi.string(),
	startDate: Joi.date(),
	duration: Joi.number(),
	recurrence: Joi.object({
		type: Joi.string(),
		days: Joi.array(),
	}),
}

module.exports = { Meeting, meetingSchema: schema }
