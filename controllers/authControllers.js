const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const { v4: uuidv4 } = require('uuid')

const { User } = require('../models/User.model')

const myCustomError = require('../utils/myCustomError')
const sendEmail = require('../utils/sendEmail')
const {
	// calcExpirationDate,
	// tokenExpired,
	getAuthTokens,
	cookieOptions,
} = require('../utils/auth.helpers')

const emailTemplates = require('../lib/emailTemplates')

const hashSomething = async (thingToHash) => {
	const salt = await bcrypt.genSalt(Number(process.env.SALT))

	return bcrypt.hash(thingToHash, salt)
}

exports.signup = async (req, res) => {
	const { email, password } = req.body

	try {
		let user = await User.findOne({ email: email.toLowerCase() })
		if (user)
			return res
				.status(409)
				.send({ message: 'E-Mail bereits in Gebrauch' })

		const randomCode = Math.floor(1000 + Math.random() * 9000).toString()
		console.log(randomCode)
		const hashPassword = await hashSomething(password)
		const hashCode = await hashSomething(randomCode)

		user = await new User({
			...req.body,
			email: email.toLowerCase(),
			passwordHash: hashPassword,
			authCode: hashCode,
			questions: {
				Themes: ['Depression', 'Anxiety'],
				Experience: 'None',
			},
		}).save()

		await sendEmail(
			user.email,
			'Verify Email',
			emailTemplates.emailVerification(randomCode)
		)

		res.send(user.email)
	} catch (error) {
		res.status(500).send({ message: `${error}` })
	}
}

exports.verifyEmail = async (req, res, next) => {
	const {
		body: { code },
		params: { email },
	} = req
	try {
		let user = await User.findOne({ email: email })
		if (!user) throw myCustomError('Ungültiger Email', 401)

		const validAuthCode = await bcrypt.compare(code, user.authCode)
		if (!validAuthCode) throw myCustomError('Incorrect code!', 401)

		user.emailVerified = true
		// Why were we changing a date type to boolean type below? It crashed...
		// user.emailVerificationTokenExp = true
		user.authCode = ''

		const { userObject, authToken, refreshToken } = getAuthTokens(user)

		await user.save()

		// should I send the Mongo formatted ID as the user ID or just the string?!

		// I had the same question, actually. Is mongo formatted better practice?
		res.cookie('refreshToken', refreshToken, cookieOptions).send({
			authToken,
			user: userObject,
			message: 'Bentzer erfolgreich verfiziert',
		})
	} catch (error) {
		next(error)
	}
}

exports.resendEmailVerification = async (req, res, next) => {
	const { email } = req.params
	try {
		let user = await User.findOne({ email: email })
		if (!user) throw myCustomError('Ungültiger Email', 401)

		const randomCode = Math.floor(1000 + Math.random() * 9000).toString()
		console.log(randomCode)
		const hashCode = await hashSomething(randomCode)

		user.authCode = hashCode
		await user.save()

		await sendEmail(
			user.email,
			'Verify Email',
			emailTemplates.emailVerification(randomCode)
		)

		res.send(user.email)
	} catch (error) {
		next(error)
	}
}

exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body

		const user = await User.findOne({ email })
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

exports.resetPasswordRequest = async (req, res) => {
	const { email } = req.body

	try {
		let user = await User.findOne({ email: email })
		if (!user)
			return res.status(409).send({
				message:
					'Der Benutzer mit der angegebenen E-Mail-Adresse existiert nicht',
			})

		const url = `${process.env.BASE_URL}password-reset/${user._id}`
		await sendEmail(
			user.email,
			'Password Reset',
			emailTemplates.passwordReset(user.alias, user.email, url)
		)

		res.status(200).send({
			message:
				'Der Link zum Zurücksetzen des Passworts wurde an Ihre E-Mail-Adresse gesendet',
		})
	} catch (error) {
		res.status(500).send({ message: error })
	}
}

exports.verifyResetPasswordLink = async (req, res) => {
	const { userId } = req.params

	try {
		const user = await User.findOne({ _id: userId })
		if (!user) return res.status(400).send({ message: 'Invalid link' })

		res.status(200).send({ message: 'Valid url ' })
	} catch (error) {
		res.status(500).send({ message: `${error}` })
	}
}

exports.resetPassword = async (req, res) => {
	const {
		body: { password },
		params: { userId },
	} = req

	try {
		const user = await User.findOne({ _id: userId })
		if (!user)
			return res.status(400).send({ message: 'Ungültiger Benutzer' })

		const hashPassword = await hashSomething(password)
		user.passwordHash = hashPassword
		await user.save()

		res.status(200).send({ message: 'Passwort erfolgreich zurückgesetzt' })
	} catch (error) {
		res.status(500).send({ message: `${error}` })
	}
}

exports.logout = async (req, res, next) => {
	try {
		res.cookie('refreshToken', '')
			.clearCookie('refreshToken', {
				httpOnly: true,
				sameSite: 'None',
				secure: true,
			})
			.sendStatus(204)
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
			(err, decoded) => {
				if (err) throw myCustomError('Invalid Token', 400)

				const {
					authToken: newAuthToken,
					refreshToken: newRefreshToken,
				} = getAuthTokens(decoded.user)

				res.cookie('refreshToken', newRefreshToken, cookieOptions).send(
					{
						authToken: newAuthToken,
						user: decoded.user,
					}
				)
			}
		)
	} catch (error) {
		next(error)
	}
}
