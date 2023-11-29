const nodemailer = require('nodemailer')

const { emailVerification, passwordReset  } = require('..lib//emailTemplates')
const myCustomError = require('../utils/myCustomError')

exports.sendEmail = (emailType) => async (req, res, next) => {
	if (!res.locals)
		next(myCustomError('Something went wrong with setting locals', 500))
	const {
		user: { email, alias },
		authCode,
		url,
	} = res.locals
	console.log(res.locals)
	let subject // case emailType === "Verify email"
	let template
	switch (emailType) {
		case 'Invitation email':
			subject = 'Invitation to groupera'
			template = 'insert template here'
			break
		case 'Reset Password Instructions':
			subject = 'Reset password instructions'
			template = passwordReset(alias, email, url)
			break
		default:
			subject = 'Verify your email address'
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
			html: template
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
