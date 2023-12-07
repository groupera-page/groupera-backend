const { Schema, model } = require('mongoose')
const Joi = require('joi')

const meetingSchema = new Schema({
	members: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	group: {
		type: Schema.Types.ObjectId,
		ref: 'Group',
	},
	calendarId: {
		type: String,
	},
})

// meetingSchema.pre('deleteOne', { document: true, query: false }, async function () {
// 	console.log(this._id)
// 	await this.model('User').updateMany(
// 		{
// 			meetings: {
// 				$in: [this._id],
// 			},
// 		},
// 		{
// 			$pull: {
// 				meetings: this._id,
// 			},
// 		}
// 	)
// 	await this.model('Group').updateMany(
// 		{
// 			meetings: {
// 				$in: [this._id],
// 			},
// 		},
// 		{
// 			$pull: {
// 				meetings: this._id,
// 			},
// 		}
// 	)
// 	console.log('Meeting + event deleted')
// })

const Meeting = model('Meeting', meetingSchema)

const schema = {
	members: Joi.array().max(15),
	time: Joi.string().required().label('Time'),
	date: Joi.date().required().label('Date'),
	frequency: Joi.number().required().label('Frequency'),
	length: Joi.number().required().label('Length'),
}

module.exports = { Meeting, meetingSchema: schema }
