const nodemailer = require('nodemailer')

const { emailVerification, passwordReset } = require('../lib/emailTemplates')
const myCustomError = require('../utils/myCustomError')

exports.sendEmail = (emailType) => async (req, res, next) => {
	if (!res.locals)
		next(myCustomError('Something went wrong with setting locals', 500))
	const {
		// user: { email, alias },
		user,
		authCode,
		url,
	} = await res.locals

	console.log('Supposed to be last')

	let subject // case emailType === "Verify email"
	switch (emailType) {
		case 'Invitation email':
			subject = 'Invitation to groupera'
			break
		case 'Reset Password Instructions':
			subject = 'Reset password instructions'
			break
		default:
			subject = 'Verify your email address'
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
			// to: `${alias} <${email}>`,
			to: `John <${user}>`,
			subject: subject,
			html: subject === 'Verify your email Address' ? emailVerification(authCode) : passwordReset(url)
		})

		if (!info.messageId)
			next(
				myCustomError(
					'Something went wrong sending the `Verify your email account` email',
					500
				)
			)

		res.send({
			message: `Email gesendet an: ${user}`,
		})
	} catch (error) {
		next(error)
	}
}
