const { Schema, model } = require('mongoose')
const Joi = require('joi')
const passwordComplexity = require('joi-password-complexity')

const complexityOptions = {
	min: 8,
	max: 50,
	lowerCase: 1,
	upperCase: 1,
	numeric: 1,
	symbol: 0,
	requirementCount: 2,
}

const userSchema = new Schema({
	alias: {
		type: String,
		required: true,
		min: 1,
		max: 70,
	},
	email: {
		type: String,
		unique: [true, 'Die E-Mail Adresse ist ungültig'],
		required: true,
	},
	passwordHash: {
		type: String,
		select: false,
		required: true,
	},
	dob: {
		type: Date,
		required: true,
	},
	questions: {
		groupTheme: {
			type: String,
		},
		experience: {
			type: String,
		},
		chooseFunnel: {
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
	authCode: {type: String},
	resetPasswordToken: {type: String},
	resetPasswordTokenExp: {type: Date},
	gender: {
		type: String,
		enum: ['male', 'female', 'divers'],
		required: true,
	},
	paid: {
		type: Boolean,
		default: false,
	},
	terms: {
		type: Boolean,
		required: true
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
	paymentSubscription: {
		type: Object,
	},
	refreshToken: {
		type: String,
	},
}, {
	toJSON: {
		virtuals: true,
		transform: function (doc, ret) {
			ret.id = ret._id
			delete ret._id
		},
	},
	toObject: {
		virtuals: true,
		transform: function (doc, ret) {
			ret.id = ret._id
			delete ret._id
		},
	},
	timestamps: true,
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

const userCreateSchema = {
	alias: Joi.string().required().messages({
		'string.max': 'Bitte halten Sie den Namen auf weniger als 70 Zeichen',
		'string.empty': 'Bitte Name eingeben',
	}),
	email: Joi.string().required().email().messages({
		'string.email': 'Bitte geben Sie eine gültige E-Mail Adresse ein',
		'string.empty': 'Bitte geben Sie eine E-Mail Adresse ein',
	}),
	password: passwordComplexity(complexityOptions)
		.required()
		.messages({ 'any.required': 'Erforderliches Feld' }),
	dob: Joi.date().required(),
	questions: Joi.object({
		groupTheme: Joi.string(),
		experience: Joi.string(),
		chooseFunnel: Joi.string(),
	}),
	emailVerificationExpires: Joi.date(),
	emailVerified: Joi.bool(),
	authCode: Joi.string(),
	resetPasswordToken: Joi.string(),
	resetPasswordTokenExp: Joi.date(),
	gender: Joi.string().valid('male', 'female', 'divers').required(),
	paid: Joi.bool(),
	terms: Joi.bool(),
	moderatedGroups: Joi.array(),
	joinedGroups: Joi.array(),
	emailVerificationTokenExp: Joi.date(),
	paymentSubscription: Joi.object(),
	refreshToken: Joi.string(),
}

const userEditSchema = {
	alias: Joi.string().messages({
		'string.max': 'Bitte halten Sie den Namen auf weniger als 70 Zeichen',
		'string.empty': 'Bitte Name eingeben',
	}),
	email: Joi.string().email().messages({
		'string.email': 'Bitte geben Sie eine gültige E-Mail Adresse ein',
		'string.empty': 'Bitte geben Sie eine E-Mail Adresse ein',
	}),
	questions: Joi.object({
		groupTheme: Joi.string(),
		experience: Joi.string(),
		chooseFunnel: Joi.string(),
	}),
	gender: Joi.string().valid('male', 'female', 'divers'),
	paid: Joi.bool(),
	// I don't think any of the ones below need to be on here, right?
	terms: Joi.bool(),
	dob: Joi.date(),
	authCode: Joi.string(),
	moderatedGroups: Joi.array(),
	joinedGroups: Joi.array(),
	emailVerificationTokenExp: Joi.date(),
	paymentSubscription: Joi.object(),
	refreshToken: Joi.string(),
}

module.exports = { User, userSchema, userCreateSchema, userEditSchema }
