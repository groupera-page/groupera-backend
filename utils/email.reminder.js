// const scheduleMeetingReminders = (group) => {
// 	if (!group || !group.meetings || group.meetings.length === 0) {
// 		// No meetings to schedule reminders for
// 		return
// 	}

// 	const meetingReminders = []

// 	// Loop through each meeting in the group
// 	for (const meeting of group.meetings) {
// 		// Calculate reminder times based on meeting's startDate
// 		const meetingStartDate = new Date(meeting.startDate)
// 		const reminder24HoursBefore = new Date(
// 			meetingStartDate.getTime() - 24 * 60 * 60 * 1000
// 		)
// 		const reminder1HourBefore = new Date(
// 			meetingStartDate.getTime() - 1 * 60 * 60 * 1000
// 		)

// 		// Schedule reminders
// 		meetingReminders.push({
// 			date: reminder24HoursBefore,
// 			meetingId: meeting.id,
// 			reminderType: '24HoursBefore',
// 		})
// 		meetingReminders.push({
// 			date: reminder1HourBefore,
// 			meetingId: meeting.id,
// 			reminderType: '1HourBefore',
// 		})
// 	}

// 	// Sort the reminders by date
// 	meetingReminders.sort((a, b) => a.date - b.date)

// 	// Now you have an array of meeting reminders, you can implement the logic
// 	// to send the reminders using your email sending function (e.g., sendReminderEmail)

// 	for (const reminder of meetingReminders) {
// 		sendReminderEmail(group, reminder.meetingId, reminder.reminderType)
// 	}
// }

// Example of the email sending function (replace this with your actual email sending logic)
// const sendReminderEmail = (group, meetingId, reminderType) => {
// 	try {
// 		const transporter = nodemailer.createTransport({
// 			host: 'smtp-relay.brevo.com',
// 			port: 587,
// 			secure: false, // true for 465, false for other ports
// 			auth: {
// 				user: process.env.BREVO_EMAIL, // generated brevo email
// 				pass: process.env.BREVO_PASSWORD, // generated brevo password
// 			},
// 		})

// 		const info = await transporter.sendMail({
// 			from: `${process.env.SEND_TRANSACTIONAL_EMAILS_FROM_NAME} <${process.env.SEND_TRANSACTIONAL_EMAILS_FROM_EMAIL}>`,
// 			to: `${alias} <${email}>`,
// 			subject: subject,
// 			html: template,
// 		})

// 		if (!info.messageId)
// 			next(
// 				myCustomError(
// 					'Something went wrong sending the `Verify your email account` email',
// 					500
// 				)
// 			)

// 		send
// 	} catch (error) {
// 		next(error)
// 	}
// }

// Example usage (pass the joined group to scheduleMeetingReminders):
// const joinedGroup = {
// 	// ... (your joined group data)
// }

// scheduleMeetingReminders(joinedGroup)

const nodemailer = require('nodemailer')

// ... (your other imports and functions)

const sendMeetingReminderEmail = async (
	event,
	timeBeforeMeeting,
	email,
	group,
	alias
) => {
	let currentDate = new Date()
	currentDate.setHours(currentDate.getHours() + 1)
	console.log('sendMeetingReminderEmail called')
	const transporter = nodemailer.createTransport({
		host: 'smtp-relay.brevo.com',
		port: 587,
		secure: false,
		auth: {
			user: process.env.BREVO_EMAIL,
			pass: process.env.BREVO_PASSWORD,
		},
	})

	const timeDifference =
		new Date(event.startDate).getTime() - currentDate.getTime()

	if (timeDifference <= timeBeforeMeeting) {
		const emailContent = `Reminder: Your meeting "${group}" is scheduled in ${
			timeBeforeMeeting / (60 * 1000)
		} minutes.`

		await transporter.sendMail({
			from: `${process.env.SEND_TRANSACTIONAL_EMAILS_FROM_NAME} <${process.env.SEND_TRANSACTIONAL_EMAILS_FROM_EMAIL}>`,
			to: `${alias} <${email}>`,
			subject: 'Meeting Reminder',
			text: emailContent,
		})

		console.log('Reminder email sent')
	} else {
		console.log('Reminder not sent. Time difference:', timeDifference)
	}
}

const MAX_TIMEOUT = 2147483647 // Maximum value for a 32-bit signed integer

exports.scheduleMeetingReminders = (
	eventsWithNextRecurrences,
	email,
	groupName,
	alias
) => {
	console.log('Function called')
	let currentDate = new Date()
	currentDate.setHours(currentDate.getHours() + 1)

	eventsWithNextRecurrences.forEach((event) => {
		const timeBeforeMeeting24Hours = 24 * 60 * 60 * 1000
		const timeBeforeMeeting1Hour = 1 * 60 * 60 * 1000

		const timeout24Hours = Math.min(
			new Date(event.startDate) - currentDate - timeBeforeMeeting24Hours,
			MAX_TIMEOUT
		)
		console.log('Event start date:', new Date(event.startDate))
		console.log('Current date:', currentDate)

		const timeout1Hour = Math.min(
			new Date(event.startDate) - currentDate - timeBeforeMeeting1Hour,
			MAX_TIMEOUT
		)

		console.log('Timeout1Hour:', timeout1Hour)
		console.log('TimeBeforeMeeting24Hours:', timeBeforeMeeting24Hours)

		setTimeout(() => {
			console.log('Timeout for 24 hours reached')
			sendMeetingReminderEmail(
				event,
				timeBeforeMeeting24Hours,
				email,
				groupName,
				alias
			)
		}, timeout24Hours)

		setTimeout(() => {
			console.log('Timeout for 1 hour reached')
			sendMeetingReminderEmail(
				event,
				timeBeforeMeeting1Hour,
				email,
				groupName,
				alias
			)
		}, timeout1Hour)
	})
}
