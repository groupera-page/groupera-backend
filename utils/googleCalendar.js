const { google } = require('googleapis')
// const { ideahub } = require('googleapis/build/src/apis/ideahub')
require('dotenv').config()

// Provide the required configuration

const calendarId = process.env.CALENDAR_ID

// Google calendar API settings
const SCOPES = 'https://www.googleapis.com/auth/calendar'
const calendar = google.calendar({ version: 'v3' })

const auth = new google.auth.JWT(
	process.env.CALENDAR_CLIENT_EMAIL,
	null,
	process.env.CALENDAR_PRIVATE_KEY,
	SCOPES
)

// Your TIMEOFFSET Offset
const TIMEOFFSET = '+01:00'

exports.dateTimeForCalender = (date, time, length) => {
	const newDateTime = `${date}T${time}:00.000${TIMEOFFSET}`

	const startDate = new Date(Date.parse(newDateTime))

	const endDate = new Date(
		new Date(startDate).setMinutes(
			startDate.getMinutes() + (length / 10) * 10
		)
	)

	return {
		start: startDate,
		end: endDate,
	}
}


exports.insertEvent = async (event) => {
	try {
		const response = await calendar.events.insert({
			auth: auth,
			calendarId: calendarId,
			resource: event,
		})

		if (response['status'] === 200 && response['statusText'] === 'OK') {
			return response.data
		} else {
			return 0
		}
	} catch (error) {
		console.log(`Error at insertEvent --> ${error}`)
		return 0
	}
}

exports.getEvents = async () => {
	try {
		const response = await calendar.events.list({
			auth: auth,
			calendarId: calendarId,
			timeMin: '2023-10-03T00:00:00.000Z',
			timeMax: '2025-10-06T00:00:00.000Z',
			timeZone: 'Europe/Berlin',
			singleEvents: true,
		})

		return response.data.items
	} catch (error) {
		console.log(`Error at getEvents --> ${error}`)
		return 0
	}
}

exports.getEvent = async (eventId) => {
	try {
		return await calendar.events.get({
			auth: auth,
			calendarId: calendarId,
			eventId: eventId,
			singleEvents: true,
		})
	} catch (error) {
		console.log(`Error at getEvents --> ${error}`)
		return 0
	}
}

exports.editEvent = async (eventId, event) => {
	try {
		const response = await calendar.events.update({
			auth: auth,
			calendarId: calendarId,
			eventId: eventId,
			resource: event,
		})

		if (response.status === 200 && response.statusText === 'OK') {
			return response.data
		} else {
			return 0
		}
	} catch (error) {
		console.log(`Error at editEvents --> ${error}`)
		return 0
	}
}

exports.deleteEvent = async (eventId) => {
	try {
		const response = await calendar.events.delete({
			auth: auth,
			calendarId: calendarId,
			eventId: eventId,
		})

		if (response.data === '') {
			return 1
		} else {
			return 0
		}
	} catch (error) {
		console.log(`Error at deleteEvent --> ${error}`)
		return 0
	}
}
