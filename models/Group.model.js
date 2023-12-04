const { Schema, model } = require('mongoose')
const Joi = require('joi')
const {
	deleteEvent,
} = require('../utils/googleCalendar')

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
			type: String,
		},
	],
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

groupSchema.pre('remove', async function () {
	await this.model('User').updateOne(
		{ _id: this.moderatorId },
		{
			$pull: {
				moderatedGroups: this._id,
			},
		}
	)
	await this.model('User').updateMany(
		{
			joinedGroups: {
				$in: [this._id],
			},
			// moderatedGroups: {
			// 	$in: [this._id]
			// }
		},
		{
			$pull: {
				joinedGroups: this._id,
				// moderatedGroups: this._id
			},
		}
	)
	for (let i = 0; i < this.meetings.length; i++) {
		const testProject = await this.model('Meeting').findOne({
			groupId: this._id,
		})
		await deleteEvent(testProject.calendarId)
		await testProject.deleteOne()
	}
	console.log('Group deleted')
})

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
	time: Joi.string().required().label('Time'),
	date: Joi.date().required().label('Date'),
	frequency: Joi.number().required().label('Frequency'),
	length: Joi.number().required().label('Length'),
	moderationType: Joi.string().label('Moderation-type'),
}

module.exports = { Group, groupSchema: schema }
