const { Schema, model } = require('mongoose')
const Joi = require('joi')
const passwordComplexity = require('joi-password-complexity')

const userSchema = new Schema({
	alias: {
		type: String,
	},
	email: {
		type: String,
		unique: [true, 'Die E-Mail Adresse ist ungültig'],
	},
	passwordHash: {
		type: String,
		select: false
	},
	dob: {
		type: Date,
	},
	questions: {
		theme: {
			type: String,
		},
		experience: {
			type: String,
		}
	},
	emailVerificationExpires: {
		type: Date,
		default: () => new Date(+new Date() + 24 * 60 * 60 * 1000), // 24 hours
	},
	emailVerified: {
		type: Boolean,
		default: false,
	},
	authCode: { type: String },
	resetPasswordToken: { type: String },
	resetPasswordTokenExp: { type: Date },
	gender: {
		type: String,
	},
	paid: {
		type: Boolean,
		// date_paid: Date,
		default: false,
	},
	terms: {
		type: Boolean,
		date_agreed: Date,
		default: false,
	},
	moderatedGroups: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Group',
		},
	],
	joinedGroups: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Group',
		},
	],
	// change below to ObjectId?
	// meetings: [
	// 	{
	// 		type: String,
	// 	},
	// ],
	paymentSubscription: {
		type: Object,
	},
	refreshToken: {
		type: String,
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

const User = model('User', userSchema)

userSchema.index(
	{ emailVerificationExpires: 1 },
	{
		expireAfterSeconds: 0,
		partialFilterExpression: { emailVerified: false },
	}
)

// https://github.com/hapijs/joi/blob/master/API.md#list-of-errors

const schema = {
	alias: Joi.string().min(1).max(70).required().label('Alias').messages({
		'string.max': 'Bitte halten Sie den Namen auf weniger als 70 Zeichen',
		'string.empty': 'Bitte Name eingeben',
	}),
	email: Joi.string().email().required().label('Email').messages({
		'string.email': 'Bitte geben Sie eine gültige E-Mail Adresse ein',
		'string.empty': 'Bitte geben Sie eine E-Mail Adresse ein',
	}),
	password: passwordComplexity()
		.required()
		.label('Password')
		.messages({ 'any.required': 'Erforderliches Feld' }),
	dob: Joi.date().label('Age'),
	questions: Joi.object({ theme: Joi.string(), experience: Joi.string() }).label('Questions'),
	emailVerificationExpires: Joi.date().label('Email Verification Expiration'),
	emailVerified: Joi.bool().label('Email Verified'),
	authCode: Joi.string().label('Auth Code'),
	resetPasswordToken: Joi.string().label('Reset Password Token'),
	resetPasswordTokenExp: Joi.date().label('Reset Password Token Expiration'),
	gender: Joi.string()
		.valid('male', 'female', 'divers')
		.label('Gender'),
	paid: Joi.bool().label('Paid'),
	// Not sure how to validate terms - is it an object with type and date inside? I'm not sure if I wrote it either :')
	// terms: Joi.bool().label('Terms & Conditions'),
	moderatedGroups: Joi.array().items(Joi.object()).label('Moderated Groups'),
	joinedGroups: Joi.array().items(Joi.object()).label('Joined Groups'),
	emailVerificationTokenExp: Joi.date().label('emailVerificationTokenExp'),
	paymentSubscription: Joi.object().label('Payment Subscription'),
	refreshToken: Joi.string().label('Refresh Token')
}

module.exports = { User, userSchema: schema }
