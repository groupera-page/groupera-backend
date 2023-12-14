const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')

const { User } = require('../models/User.model')

const myCustomError = require('../utils/myCustomError')

const {
	calcExpirationDate,
	tokenExpired,
	getAuthTokens,
	cookieOptions,
} = require('../utils/auth.helpers')
const {Group} = require('../models/Group.model');

const hashSomething = async (thingToHash) => {
	const salt = await bcrypt.genSalt(Number(process.env.SALT))

	return bcrypt.hash(thingToHash, salt)
}

exports.hashSomething = hashSomething

exports.signup = async (req, res, next) => {
	const { email, password } = req.body

	try {
		const randomCode = Math.floor(1000 + Math.random() * 9000).toString()
		const hashPassword = await hashSomething(password)
		const hashCode = await hashSomething(randomCode)

		const user = await User.create({
			...req.body,
			email: email.toLowerCase(),
			passwordHash: hashPassword,
			authCode: hashCode,
		})

		if (process.env.NODE_ENV === 'development') {
			console.log('Email Auth Code', randomCode)
			res.sendStatus(204)
		} else{
			res.locals.user = user
			res.locals.authCode = randomCode
			next()
		}
	} catch (error) {
		next(error)
	}
}

exports.verifyEmail = async (req, res, next) => {
	const {
		body: { authCode, email, joinedGroups },
	} = req
	try {
		let user = await User.findOne({ email: email })
		if (!user) throw myCustomError('Ungültiger Email', 401)

		const validAuthCode = await bcrypt.compare(authCode, user.authCode)
		if (!validAuthCode) throw myCustomError('Incorrect code!', 401)

		user.emailVerified = true
		user.emailVerificationExpires = null
		user.authCode = ''

		if (joinedGroups && joinedGroups[0]) {
			const group = await Group.findById(joinedGroups[0])

			if (group) {
				group.members.push(user.id)
				await group.save()

				user.joinedGroups.push(joinedGroups[0])
			}
		}

		const { userObject, authToken, refreshToken } = getAuthTokens(user)

		await user.save()



		if (process.env.NODE_ENV === 'development') {
			res.cookie('refreshToken', refreshToken, cookieOptions).send({
				authToken,
				user: userObject,
				message: 'Bentzer erfolgreich verfiziert',
			})
		} else{
			res.locals.user = user
			res.locals.userObject = userObject
			res.locals.authToken = authToken
			res.locals.refreshToken = refreshToken
			res.locals.cookieOptions = cookieOptions
			next()
		}
	} catch (error) {
		next(error)
	}
}

exports.resendEmailVerification = async (req, res, next) => {
	const { email } = req.params
	try {
		let user = await User.findOne({ email: email.toLowerCase() })
		if (!user) throw myCustomError('Ungültiger Email', 401)

		const randomCode = Math.floor(1000 + Math.random() * 9000).toString()
		user.authCode = await hashSomething(randomCode)

		await user.save()

		if (process.env.NODE_ENV === 'development') {
			console.log('Email Auth Code', randomCode)
			res.sendStatus(204)
		} else{
			res.locals.user = user
			res.locals.authCode = randomCode
			next()
		}
	} catch (error) {
		next(error)
	}
}

exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body

		const user = await User.findOne({ email: email.toLowerCase() }, '+passwordHash')
		if (!user) throw myCustomError('Ungültige E-Mail oder Passwort', 401)

		const validPassword = await bcrypt.compare(password, user.passwordHash)
		if (!validPassword)
			throw myCustomError('Ungültige E-Mail oder Passwort', 401)

		if (!user.emailVerified)
			throw myCustomError(
				'Bitte bestätigen Sie Ihre E-Mail Addresse',
				400
			)

		const { userObject, authToken, refreshToken } = getAuthTokens(user)

		// should I send the Mongo formatted ID as the user ID or just the string?!
		res.cookie('refreshToken', refreshToken, cookieOptions).send({
			authToken,
			user: userObject,
			message: 'Erfolgreich eingeloggt',
		})
	} catch (error) {
		next(error)
	}
}

exports.setResetPasswordToken = async (req, res, next) => {
	const { email } = req.body
	try {
		let user = await User.findOne({ email: email.toLowerCase() })
		// As security measure we respond always with status code of 200 and the same message
		if (!user)
			throw myCustomError(
				'Der Link zum Zurücksetzen des Passworts wurde an Ihre E-Mail-Adresse gesendet',
				200
			)

		user.resetPasswordToken = uuidv4()
		user.resetPasswordTokenExp = calcExpirationDate('ResetPasswordToken')

		await user.save()

		if (process.env.NODE_ENV === 'development') {
			console.log('Email Auth Code', user.resetPasswordToken)
			res.sendStatus(204)
		} else{
			const url = `${process.env.FRONTEND_BASE_URL}/auth/resetPassword/${user.resetPasswordToken}`
			res.locals.user = user
			res.locals.resetPasswordToken = user.resetPasswordToken
			res.locals.resetPasswordTokenExp = user.resetPasswordTokenExp
			res.locals.url = url
			next()
		}
	} catch (error) {
		next(error)
	}
}

exports.resetPassword = async (req, res, next) => {
	try {
		const {
			body: { password },
			params: { resetPasswordToken },
		} = req

		const user = await User.findOne({ resetPasswordToken })
		if (
			!user ||
			!user.resetPasswordTokenExp ||
			tokenExpired(user.resetPasswordTokenExp)
		)
			throw myCustomError('Invalid Token', 400)

		const salt = await bcrypt.genSalt(Number(process.env.SALT))
		const hashPassword = await bcrypt.hash(password, salt)

		user.resetPasswordTokenExp = undefined
		user.resetPasswordToken = undefined
		user.password = hashPassword

		await user.save()

		const { userObject, authToken, refreshToken } = getAuthTokens(user)


		if (process.env.NODE_ENV === 'development') {
			console.log('Email Auth Code', user.resetPasswordToken)
			res.cookie('refreshToken', refreshToken, cookieOptions).send({
				authToken,
				user: userObject,
				message: 'Passwort erfolgreich zurückgesetzt.',
			})
		} else{
			res.locals.user = user
			res.locals.userObject = userObject
			res.locals.authToken = authToken
			res.locals.refreshToken = refreshToken
			res.locals.cookieOptions = cookieOptions
			next()
		}
	} catch (error) {
		next(error)
	}
}

exports.logout = async (req, res, next) => {
	try {
		res.clearCookie('refreshToken').sendStatus(204)
	} catch (error) {
		next(error)
	}
}

// Ask Fritz about using != and keeping foundUser._id like in Middleware versus using !== with toString()
exports.refresh = async (req, res, next) => {
	try {
		const { refreshToken: currentRefreshToken } = req.cookies
		jwt.verify(
			currentRefreshToken,
			process.env.REFRESH_TOKEN_SECRET,
			async (err, decoded) => {
				if (err) throw myCustomError('Invalid Token', 400)

				const user = await User.findById(decoded.user.id)

				const {
					userObject,
					authToken: newAuthToken,
					refreshToken: newRefreshToken,
				} = getAuthTokens(user)

				res.cookie('refreshToken', newRefreshToken, cookieOptions).send(
					{
						authToken: newAuthToken,
						user: userObject,
					}
				)
			}
		)
	} catch (error) {
		next(error)
	}
}
