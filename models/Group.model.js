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
	meetings: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Meeting',
		},
	],
	moderator: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	members: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	selfModerated: {
		type: Boolean,
		default: false
	},
}, {
	toJSON: {
		virtuals: true,
		transform: function(doc, ret) {
			ret.id = ret._id;
			delete ret._id;
		}
	},
	toObject: {
		virtuals: true,
		transform: function(doc, ret) {
			ret.id = ret._id;
			delete ret._id;
		}
	},
	timestamps: true
})

groupSchema.virtual('membersCount').get(function() {
	return this.members ? this.members.length : 0
});

const Group = model('Group', groupSchema)

const schema = {
	name: Joi.string().min(1).max(70).required().label('Name').messages({
		'string.max': 'Bitte halten Sie den Namen auf weniger als 70 Zeichen',
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
	selfModerated: Joi.string().label('Self-moderated'),
}

module.exports = { Group, groupSchema: schema }
