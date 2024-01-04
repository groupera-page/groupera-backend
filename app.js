require('dotenv').config()
const express = require('express')
// const schedule = require('node-schedule')
require('./db')

const { noPathError, defaultError } = require('./error-handling')
const { meetingScheduler } = require('./utils/meeting.scheduler')

const mainRoutes = require('./routes')

// const { sendMeetingReminder } = require('./utils/meeting.email.helper')
// const { findAllForEmails } = require('./controllers/groupControllers')
// const { getNextRecurrenceDate } = require('./utils/meetingRecurrence.helpers')

const app = express()

app.use(express.json({ limit: '50mb' }))

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app)

meetingScheduler

// Schedule a recurring job to check for upcoming meetings every day
// process.env.TZ = 'Europe/Berlin'
// let currentDate = new Date()
// currentDate.setHours(currentDate.getHours() + 1)

// schedule.scheduleJob('03 20 * * *', async () => {
// 	try {
// 		const groups = await findAllForEmails()
// 		const group = groups[25]
// 		console.log(new Date())

// 		console.log(group.meetings)

// 		const nextMeeting = getNextRecurrenceDate(
// 			group.meetings[0],
// 			currentDate
// 		)

// 		console.log(nextMeeting)

// 		let reminder24Hours

// 		if (nextMeeting > group.meetings[0].startDate && group.meetings[0].startDate > currentDate) {
// 			reminder24Hours = new Date(
// 				group.meetings[0].startDate.getTime() - (24 * 60 * 60 * 1000) - (1 * 60 * 60 * 1000)
// 			)
// 		} else {
// 			reminder24Hours = new Date(
// 				nextMeeting.getTime() - 24 * 60 * 60 * 1000 - (1 * 60 * 60 * 1000)
// 			)
// 		}

// 		console.log(reminder24Hours)

// 		// schedule.cancelJob(reminder24Hours)

// 		schedule.scheduleJob(reminder24Hours, async () => {
// 			await sendMeetingReminder(group.members[0].email, nextMeeting, 24)
// 		})

// groups.forEach((group) => {
// 	const nextMeeting = getNextRecurrenceDate(
// 		group.meetings[0],
// 		currentDate
// 	)

// 	console.log(nextMeeting)

// if (nextMeeting) {
// 	const meetingStartDate = new Date(nextMeeting.startDate)

// 	// Schedule email 24 hours before the meeting
// 	const reminder24Hours = new Date(
// 		meetingStartDate.getTime() - 24 * 60 * 60 * 1000
// 	)

// 	schedule.cancelJob(reminder24Hours)
// 	schedule.cancelJob(reminder1Hour)

// 	schedule.scheduleJob(reminder24Hours, async () => {
// 		if (group.members.length > 1) {
// 			group.members.forEach(async (member) => {
// 				await sendMeetingReminder(
// 					member.email,
// 					nextMeeting.startDate,
// 					24
// 				)
// 				console.log('email sent')
// 			})
// 		} else {
// 			await sendMeetingReminder(
// 				group.members[0].email,
// 				nextMeeting.startDate,
// 				24
// 			)
// 			console.log('email sent')
// 		}
// 	})

// 	// Schedule email 1 hour before the meeting
// 	const reminder1Hour = new Date(
// 		meetingStartDate.getTime() - 1 * 60 * 60 * 1000
// 	)
// 	schedule.scheduleJob(reminder1Hour, async () => {
// 		if (group.members.length > 1) {
// 			group.members.forEach(async (member) => {
// 				await sendMeetingReminder(
// 					member.email,
// 					nextMeeting.startDate,
// 					24
// 				)
// 				console.log('email sent')
// 			})
// 		} else {
// 			await sendMeetingReminder(
// 				group.members[0].email,
// 				nextMeeting.startDate,
// 				24
// 			)
// 			console.log('email sent')
// 		}
// 	})
// }
// })
// 	} catch (error) {
// 		console.error('Error fetching groups and meetings:', error)
// 	}
// })

// handle routes
app.use(mainRoutes)
// ❗ To handle Routes that don't exist
app.use(noPathError)
// ❗ To handle errors that you handle in specific routes
app.use(defaultError)

// ℹ️ Sets the PORT for our app to have access to it. Defaults to 3000
const PORT = Number(process.env.PORT) || 3000

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`)
})
