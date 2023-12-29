const { Schema, model } = require('mongoose')
const Joi = require('joi')
const groupTopics = require('../utils/groupTopics')

const imgOptions = [
	'Grouptitel%20pictures%20low_res/pexels-johannes-plenio-1690355_bj811s_e6dajb.jpg',
	'Grouptitel%20pictures%20low_res/pexels-taylor-hunt-2902440_xvgnuq_nueptp.jpg',
	'Grouptitel%20pictures%20low_res/pexels-pixabay-416117_hz1ccg_f4bssx.jpg',
	'Grouptitel%20pictures%20low_res/pexels-eberhard-grossgasteiger-6_abiqd5_r1jcey.jpg',
	'Grouptitel%20pictures%20low_res/pexels-akil-mazumder-1072824_1_hqufud_pjiaof.jpg',
	'Grouptitel%20pictures%20low_res/pexels-javier-gonzalez-108303_iwxfil_t8mk04.jpg',
	'Grouptitel%20pictures%20low_res/pexels-pixabay-273886_dygqro_wt5ega.jpg',
	'Grouptitel%20pictures%20low_res/pexels-nanoid-kumar-1661296_ttr2gf_ijeg4r.jpg',
]

const topicsArray = groupTopics.map((t) => t.value)

const groupSchema = new Schema(
	{
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
			enum: topicsArray,
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
	name: Joi.string().min(1).max(70).required().required().messages({
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
	topic: Joi.string()
		.required()
		.valid(...topicsArray),
	selfModerated: Joi.bool(),
	firstMeeting: Joi.object({
		startDate: Joi.date().required(),
		duration: Joi.number().valid(60, 90).required(),
		recurrence: Joi.object({
			type: Joi.string().valid('weekly', 'bi-weekly', 'monthly'),
			days: Joi.array().items(Joi.number())
		}).required(),
	}),
	img: Joi.object()
}

const groupEditSchema = {
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
	selfModerated: Joi.bool(),
	// Should topic be editable anyway?
	topic: Joi.string().valid(...topicsArray),
	img: Joi.object()
}

module.exports = { Group, groupSchema, groupCreateSchema, groupEditSchema }
