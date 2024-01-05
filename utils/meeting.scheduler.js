const schedule = require('node-schedule')

const { sendMeetingReminder } = require('./meeting.email.helper')
const { findAllForEmails } = require('../controllers/groupControllers')
const { getNextRecurrenceDate } = require('./meetingRecurrence.helpers')

const subject24Hours = 'Dein Gruppen-Meeting beginnt morgen!'
const subject1Hour = 'Dein Gruppen-Meeting beginnt in einer Stunde!'

process.env.TZ = 'Europe/Berlin'
let currentDate = new Date()
currentDate.setHours(currentDate.getHours() + 1)

const meetingScheduler = schedule.scheduleJob('58 16 * * *', async () => {
	try {
		const groups = await findAllForEmails()
		const group = groups[26]

		console.log(group)

		const nextMeeting = getNextRecurrenceDate(
			group.meetings[0],
			currentDate
		)

		console.log(nextMeeting)

		console.log(currentDate)

		// const reminder24Hours = new Date(
		// 	nextMeeting.getTime() - 24 * 60 * 60 * 1000
		// )

		// const reminder1Hour = new Date(
		// 	nextMeeting.getTime() - 1 * 60 * 60 * 1000
		// )

		// const reminder24Hours = new Date(nextMeeting)
		// reminder24Hours.setHours(reminder24Hours.getHours() - 24)

		const reminder1Hour = new Date(nextMeeting)
		reminder1Hour.setHours(reminder1Hour.getHours() - 1)

		// console.log(reminder24Hours)
		console.log(reminder1Hour)

		// if (currentDate >= reminder24Hours && currentDate < nextMeeting) {
		// 	schedule.scheduleJob(reminder24Hours, async () => {
		// 		await sendMeetingReminder(
		// 			group.moderator.email,
		// 			group.moderator.alias,
		// 			group.name,
		// 			subject24Hours,
		// 			24
		// 		)
		// 		if (group.members.length > 1)
		// 			await sendMeetingReminder(
		// 				group.members[0].email,
		// 				group.members[0].alias,
		// 				group.name,
		// 				subject24Hours,
		// 				24
		// 			)
		// 	})
		// } else {
		// 	console.log("meow")
		// }
		if (nextMeeting && currentDate < nextMeeting) {
			const reminder24Hours = new Date(nextMeeting.getTime() - 24 * 60 * 60 * 1000);
		
			console.log(reminder24Hours)

			if (currentDate >= reminder24Hours) {
				schedule.scheduleJob(reminder24Hours, async () => {
					await sendMeetingReminder(
						group.moderator.email,
						group.moderator.alias,
						group.name,
						subject24Hours,
						24
					);
					if (group.members.length > 1)
						await sendMeetingReminder(
							group.members[0].email,
							group.members[0].alias,
							group.name,
							subject24Hours,
							24
						);
				});
			} else {
				console.log("meow");
			}
		}
		schedule.scheduleJob(reminder1Hour, async () => {
			console.log('sending 1')
			await sendMeetingReminder(
				group.moderator.email,
				group.moderator.alias,
				group.name,
				subject1Hour,
				1
			)
			if (group.members.length > 1)
				await sendMeetingReminder(
					group.members[0].email,
					group.members[0].alias,
					group.name,
					subject1Hour,
					1
				)
		})
	} catch (error) {
		console.error('Error fetching groups and meetings:', error)
	}
})

module.exports = { meetingScheduler }
