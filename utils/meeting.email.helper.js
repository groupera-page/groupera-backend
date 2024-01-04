const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
	host: 'smtp-relay.brevo.com',
	port: 587,
	secure: false, // true for 465, false for other ports
	auth: {
		user: process.env.BREVO_EMAIL, // generated brevo email
		pass: process.env.BREVO_PASSWORD, // generated brevo password
	},
})

exports.sendMeetingReminder = async (userEmail, meetingDate, reminder) => {
	const mailOptions = {
		from: `${process.env.SEND_TRANSACTIONAL_EMAILS_FROM_NAME} <${process.env.SEND_TRANSACTIONAL_EMAILS_FROM_EMAIL}>`,
		to: userEmail,
		subject: `Meeting Reminder: ${reminder} hour(s) before`,
		text: `You have a meeting scheduled in ${reminder} hour(s) at ${meetingDate}. Don't forget!`,
	}

	try {
		const info = await transporter.sendMail(mailOptions)
		console.log(`Email sent: ${info.response}`)
	} catch (error) {
		console.error('Error sending email:', error)
	}
}
