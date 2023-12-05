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
		groupName,
	} = res.locals
	console.log(res.locals)
	let subject // case emailType === "Verify email"
	let template
	switch (emailType) {
		case 'Welcome email':
			subject = 'Herzlich Wilkommen bei Groupera!'
			template = welcome(alias)
			break
		case 'Reset password instructions':
			subject = 'Passwortzurücksetzung für Dein Groupera-Konto'
			template = passwordReset(alias, email, url)
			break
		case 'Reset password successful':
			subject = 'Erfolgreiche Passwortänderung'
			template = passwordResetSuccessful(alias)
			break
		case 'Delete account':
			subject = 'Bestätigung der Kontolöschung'
			template = deletedAccount(alias)
			break
		case 'Join group':
			subject = 'Dein Beitritt in einer Gruppe'
			template = groupJoin(alias, groupName)
			break
		case 'Create group':
			subject = 'Deine neue Gruppe bei Groupera'
			template = groupCreate(alias)
			break
		default:
			subject = 'Dein Bestätigungscode für Groupera'
			template = emailVerification(authCode)
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

		res.send({
			message: `Email gesendet an: ${email}`,
		})
	} catch (error) {
		next(error)
	}
}
