const schedule = require('node-schedule')

const { sendMeetingReminder } = require('./meeting.email.helper')
const { findAllForEmails } = require('../controllers/groupControllers')
const { getNextRecurrenceDate } = require('./meetingRecurrence.helpers')

process.env.TZ = 'Europe/Berlin'
let currentDate = new Date()
currentDate.setHours(currentDate.getHours() + 1)

const meetingScheduler = schedule.scheduleJob('38 21 * * *', async () => {
	try {
		const groups = await findAllForEmails()
		const group = groups[25]
		console.log(new Date())

		console.log(group.meetings)

		const nextMeeting = getNextRecurrenceDate(
			group.meetings[0],
			currentDate
		)

		console.log(nextMeeting)

		let reminder24Hours

		if (
			nextMeeting > group.meetings[0].startDate &&
			group.meetings[0].startDate > currentDate
		) {
			reminder24Hours = new Date(
				group.meetings[0].startDate.getTime() -
					24 * 60 * 60 * 1000
					// - 1 * 60 * 60 * 1000
			)
		} else {
			reminder24Hours = new Date(
				nextMeeting.getTime() - 24 * 60 * 60 * 1000
				//  - 1 * 60 * 60 * 1000
			)
		}

		console.log(reminder24Hours)
		console.log(new Date())

		// schedule.cancelJob(reminder24Hours)

		return schedule.scheduleJob(reminder24Hours, async () => {
			await sendMeetingReminder(group.members[0].email, nextMeeting, 24)
		})
	} catch (error) {
		console.error('Error fetching groups and meetings:', error)
	}
})

module.exports = { meetingScheduler }