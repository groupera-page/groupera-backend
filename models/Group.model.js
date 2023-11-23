const { Schema, model } = require('mongoose')
const Joi = require('joi')

const groupSchema = new Schema({
	verified: {
		type: Boolean,
		default: false,
	},
	name: {
		type: String,
	},
	description: {
		type: String,
	},
	img: {
		type: Object,
	},
	topic: {
		type: String,
	},
	meeting: {
		type: String,
	},
	moderatorId: {
		type: Schema.Types.ObjectId,
		ref: 'Moderator',
	},
	users: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	moderationType: {
		type: String,
	},
})

const Group = model('Group', groupSchema)

const validate = (data) => {
	const schema = Joi.object({
		name: Joi.string().min(1).max(70).required().label('Name').messages({
			'string.max':
				'Bitte halten Sie den Namen auf weniger als 70 Zeichen',
			'string.empty': 'Bitte Name eingeben',
		}),
		description: Joi.string()
			.min(3)
			.max(500)
			.required()
			.label('Description')
			.messages({
				'string.min':
					'Bitte geben Sie eine Beschreibung mit mindestens 3 Zeichen ein',
				'string.max':
					'Bitte halten Sie den Description auf weniger als 500 Zeichen',
				'string.empty': 'Bitte Description eingeben',
			}),
		topic: Joi.string().required().label('Topic'),
		time: Joi.string().required().label('Time'),
		date: Joi.date().required().label('Date'),
		frequency: Joi.number().required().label('Frequency'),
		length: Joi.number().required().label('Length'),
		moderationType: Joi.string().label('Moderation-type'),
	})
	return schema.validate(data)
}

module.exports = { Group, validate }
