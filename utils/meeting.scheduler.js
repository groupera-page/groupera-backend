const schedule = require('node-schedule')

const { sendMeetingReminder } = require('./meeting.email.helper')
const { findAllForEmails } = require('../controllers/groupControllers')
const { getNextRecurrenceDate } = require('./meetingRecurrenceDate')

process.env.TZ = 'Europe/Berlin'
let currentDate = new Date()

const meetingScheduler = schedule.scheduleJob('10 15 * * *', async () => {
	try {
		const groups = await findAllForEmails()

		const group = groups[19]

		// groups.forEach((group) => {
		const nextMeeting = getNextRecurrenceDate(
			group.meetings[0],
			currentDate
		)

		const reminder24Hours = new Date(nextMeeting)
		reminder24Hours.setHours(reminder24Hours.getHours() - 24)

		schedule.scheduleJob(reminder24Hours, async () => {
			if (process.env.NODE_ENV === 'development') {
				console.log('sending 24')
			} else {
				await sendMeetingReminder(
					group.moderator.email,
					group.moderator.alias,
					group.name
				)
				if (group.members.length >= 1)
					group.members.forEach(async (member) => {
						await sendMeetingReminder(
							member.email,
							member.alias,
							group.name
						)
					})
			}
		})
		// })
	} catch (error) {
		console.error('Error fetching groups and meetings:', error)
	}
})

module.exports = { meetingScheduler }
