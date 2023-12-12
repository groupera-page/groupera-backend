const { Schema, model } = require('mongoose')
const Joi = require('joi')

const imgOptions = [
	'Grouptitel%20pictures%20low_res/pexels-johannes-plenio-1690355_bj811s_e6dajb.jpg',
	'Grouptitel%20pictures%20low_res/pexels-taylor-hunt-2902440_xvgnuq_nueptp.jpg',
	'Grouptitel%20pictures%20low_res/pexels-nandhu-kumar-1661296_ttr2gf_ijeg4r.jpg',
	'Grouptitel%20pictures%20low_res/pexels-johannes-plenio-1690355_bj811s_e6dajb.jpg',
]

const groupSchema = new Schema(
	{
		verified: {
			type: Boolean,
			default: false,
		},
		name: {
			type: String,
			required: true,
			min: 1,
			max: 70,
		},
		description: {
			type: String,
			required: true,
			min: 3,
			max: 500,
		},
		img: {
			type: Object,
			default: () => {
				return {
					public_id:
						imgOptions[
							Math.floor(Math.random() * imgOptions.length)
						],
				}
			},
		},
		topic: {
			type: String,
			required: true,
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
			default: false,
		},
	},
	{
		toJSON: {
			virtuals: true,
			transform: function (doc, ret) {
				if (!ret.id || ret._id) {
					ret.id = ret._id
					delete ret._id
				}
			},
		},
		toObject: {
			virtuals: true,
			transform: function (doc, ret) {
				if (!ret.id || ret._id) {
					ret.id = ret._id
					delete ret._id
				}
			},
		},
		timestamps: true,
	}
)

groupSchema.virtual('membersCount').get(function () {
	return this.members ? this.members.length : 0
})

const Group = model('Group', groupSchema)

const groupCreateSchema = {
	verified: Joi.bool(),
	name: Joi.string().min(1).max(70).required().messages({
		'string.max': 'Bitte halten Sie den Namen auf weniger als 70 Zeichen',
		'string.empty': 'Bitte Name eingeben',
	}),
	description: Joi.string().min(3).max(500).required().messages({
		'string.min':
			'Bitte geben Sie eine Beschreibung mit mindestens 3 Zeichen ein',
		'string.max':
			'Bitte halten Sie den Description auf weniger als 500 Zeichen',
		'string.empty': 'Bitte Description eingeben',
	}),
	img: Joi.object(),
	topic: Joi.string().required(),
	meetings: Joi.array().items(Joi.object()),
	moderator: Joi.object(),
	members: Joi.array().items(Joi.object()),
	selfModerated: Joi.bool(),
}

const groupEditSchema = {
	verified: Joi.bool(),
	name: Joi.string().min(1).max(70).messages({
		'string.max': 'Bitte halten Sie den Namen auf weniger als 70 Zeichen',
		'string.empty': 'Bitte Name eingeben',
	}),
	description: Joi.string().min(3).max(500).messages({
		'string.min':
			'Bitte geben Sie eine Beschreibung mit mindestens 3 Zeichen ein',
		'string.max':
			'Bitte halten Sie den Description auf weniger als 500 Zeichen',
		'string.empty': 'Bitte Description eingeben',
	}),
	img: Joi.object(),
	topic: Joi.string(),
	meetings: Joi.array().items(Joi.object()),
	moderator: Joi.object(),
	members: Joi.array().items(Joi.object()),
	selfModerated: Joi.bool(),
}

module.exports = { Group, groupSchema, groupCreateSchema, groupEditSchema  }
