const nodemailer = require('nodemailer')

const {
	nextMeeting24Hours,
	nextMeeting1Hour,
} = require('../lib/emailTemplates')

const transporter = nodemailer.createTransport({
	host: 'smtp-relay.brevo.com',
	port: 587,
	secure: false, // true for 465, false for other ports
	auth: {
		user: process.env.BREVO_EMAIL, // generated brevo email
		pass: process.env.BREVO_PASSWORD, // generated brevo password
	},
})

exports.sendMeetingReminder = async (email, name, groupName, subject, time) => {
	try {
		const info = await transporter.sendMail({
			from: `${process.env.SEND_TRANSACTIONAL_EMAILS_FROM_NAME} <${process.env.SEND_TRANSACTIONAL_EMAILS_FROM_EMAIL_PRODUCT}>`,
			to: email,
			subject: subject,
			html: time == 24 ? nextMeeting24Hours(name, groupName, email) : nextMeeting1Hour(name, groupName, email),
		})
		console.log(`Email sent: ${info.response}`)
	} catch (error) {
		console.error('Error sending email:', error)
	}
}
