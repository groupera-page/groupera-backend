const schedule = require('node-schedule')

const { sendMeetingReminder } = require('./meeting.email.helper')
const { findAllForEmails } = require('../controllers/groupControllers')
const { getNextRecurrenceDate } = require('./meetingRecurrence.helpers')

const subject24Hours = 'Dein Gruppen-Meeting beginnt morgen!'
const subject1Hour = 'Dein Gruppen-Meeting beginnt in einer Stunde!'
const subjectPostMeeting = 'Blippity blop'

process.env.TZ = 'Europe/Berlin'
let currentDate = new Date()
currentDate.setHours(currentDate.getHours() + 1)

const meetingScheduler = schedule.scheduleJob('27 19 * * *', async () => {
	try {
		const groups = await findAllForEmails()

		groups.forEach((group) => {
			const nextMeeting = getNextRecurrenceDate(
				group.meetings[0],
				currentDate
			)

			const reminder24Hours = new Date(nextMeeting)
			reminder24Hours.setHours(reminder24Hours.getHours() - 25)

			const reminder1Hour = new Date(nextMeeting)
			reminder1Hour.setHours(reminder1Hour.getHours() - 1)

			const postMeeting1Hour = new Date(nextMeeting)
			postMeeting1Hour.setHours(postMeeting1Hour.getHours() + 1)

	

			schedule.scheduleJob(reminder24Hours, async () => {
				if (process.env.NODE_ENV === 'development') {
					console.log('sending 24')
				} else {
					await sendMeetingReminder(
						group.moderator.email,
						group.moderator.alias,
						group.name,
						subject24Hours,
						24
					)
					if (group.members.length >= 1)
						group.members.forEach(async (member) => {
							await sendMeetingReminder(
								member.email,
								member.alias,
								group.name,
								subject24Hours,
								24
							)
						})
				}
			})

			schedule.scheduleJob(reminder1Hour, async () => {
				if (process.env.NODE_ENV === 'development') {
					console.log('sending 1')
				} else {
					await sendMeetingReminder(
						group.moderator.email,
						group.moderator.alias,
						group.name,
						subject1Hour,
						1
					)
					if (group.members.length >= 1)
						group.members.forEach(async (member) => {
							await sendMeetingReminder(
								member.email,
								member.alias,
								group.name,
								subject1Hour,
								1
							)
						})
				}
			})

			schedule.scheduleJob(postMeeting1Hour, async () => {
				if (process.env.NODE_ENV === 'development') {
					console.log('sending post meeting survey')
				} else {
					await sendMeetingReminder(
						group.moderator.email,
						group.moderator.alias,
						group.name,
						subjectPostMeeting,
						1
					)
					if (group.members.length >= 1)
						group.members.forEach(async (member) => {
							await sendMeetingReminder(
								member.email,
								member.alias,
								group.name,
								subjectPostMeeting,
								1
							)
						})
				}
			})
		})
	} catch (error) {
		console.error('Error fetching groups and meetings:', error)
	}
})

module.exports = { meetingScheduler }
