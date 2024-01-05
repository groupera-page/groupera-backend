const authConfig = require('../config/auth.config')
const jwt = require('jsonwebtoken')

exports.tokenExpired = (tokenExpiration) =>
	tokenExpiration.getTime() < new Date().getTime()

exports.calcExpirationDate = (type) => {
	if (!type) return new Error('type required')
	let expirationDate = new Date()

	let secsToAdd
	switch (type) {
		case 'InvitationToken':
			secsToAdd = authConfig.invitationTokenExpiration
			break
		case 'ResetPasswordToken':
			secsToAdd = authConfig.resetPasswordExpiration
			break
	}

	expirationDate.setSeconds(expirationDate.getSeconds() + secsToAdd)

	return expirationDate
}

const jwtAlgorithm = (expiresIn) => ({ algorithm: 'HS256', expiresIn })

exports.jwtAlgorithm = jwtAlgorithm

exports.getAuthTokens = (user) => {
	const userObject = {
		id: user.id,
		alias: user.alias,
		email: user.email,
		dob: user.dob,
		questions: user.questions,
		emailVerified: user.emailVerified,
		gender: user.gender,
		role: user.role,
	}
	const authToken = jwt.sign(
		{ user: userObject },
		process.env.AUTH_TOKEN_SECRET,
		jwtAlgorithm('60m')
	)
	const refreshToken = jwt.sign(
		{ user: userObject },
		process.env.REFRESH_TOKEN_SECRET,
		jwtAlgorithm('1d')
	)

	return { authToken, refreshToken, userObject }
}

exports.cookieOptions = {
	httpOnly: true,
	sameSite: 'None',
	secure: true,
	maxAge: 24 * 60 * 60 * 1000,
}
