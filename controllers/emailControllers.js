const nodemailer = require('nodemailer')

const {
	emailVerification,
	passwordReset,
	passwordResetSuccessful,
	welcome,
	deletedAccount,
	groupJoin,
	groupCreate,
} = require('../lib/emailTemplates')
const myCustomError = require('../utils/myCustomError')

exports.sendEmail = (emailType) => async (req, res, next) => {
	if (!res.locals)
		next(myCustomError('Something went wrong with setting locals', 500))

	const {
		user: { email, alias },
		authCode,
		url,
		refreshToken,
		authToken,
		userObject,
		cookieOptions,
		group,
	} = res.locals

	let subject // case emailType === "Verify email"
	let template
	let send
	switch (emailType) {
		case 'Welcome email':
			subject = 'Herzlich Wilkommen bei Groupera!'
			template = welcome(alias, email)
			send = res
				.cookie('refreshToken', refreshToken, cookieOptions)
				.send({
					authToken,
					user: userObject,
					message: 'Bentzer erfolgreich verfiziert',
				})
			break
		case 'Reset password instructions':
			subject = 'Passwortzurücksetzung für Dein Groupera-Konto'
			template = passwordReset(alias, email, url)
			send = res.send({
				message: `Email gesendet an: ${email}`,
			})
			break
		case 'Reset password successful':
			subject = 'Erfolgreiche Passwortänderung'
			template = passwordResetSuccessful(alias, email)
			res.cookie('refreshToken', refreshToken, cookieOptions).send({
				authToken,
				user: userObject,
				message: 'Bentzer erfolgreich verfiziert',
			})
			break
		case 'Delete account':
			subject = 'Bestätigung der Kontolöschung'
			template = deletedAccount(alias, email)
			send = res.send({
				message: `Email gesendet an: ${email}`,
			})
			break
		case 'Join group':
			subject = 'Dein Beitritt in einer Gruppe'
			template = groupJoin(alias, group.name, email, group.topic)
			send = res.send({
				group,
				message: `Email gesendet an: ${email}`,
			})
			break
		case 'Create group':
			subject = 'Deine neue Gruppe bei Groupera'
			template = groupCreate(alias, email)
			send = res.send({
				group: group,
				message: `Email gesendet an: ${email}`,
			})
			break
		default:
			subject = 'Dein Bestätigungscode für Groupera'
			template = emailVerification(authCode, email)
			send = res.send({
				message: `Email gesendet an: ${email}`,
			})
	}

	try {
		const transporter = nodemailer.createTransport({
			host: 'smtp-relay.brevo.com',
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: process.env.BREVO_EMAIL, // generated brevo email
				pass: process.env.BREVO_PASSWORD, // generated brevo password
			},
		})

		const info = await transporter.sendMail({
			from: `${process.env.SEND_TRANSACTIONAL_EMAILS_FROM_NAME} <${process.env.SEND_TRANSACTIONAL_EMAILS_FROM_EMAIL}>`,
			to: `${alias} <${email}>`,
			subject: subject,
			html: template,
		})

		if (!info.messageId)
			next(
				myCustomError(
					'Something went wrong sending the `Verify your email account` email',
					500
				)
			)

		send
	} catch (error) {
		next(error)
	}
}
