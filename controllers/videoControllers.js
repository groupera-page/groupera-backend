const jwt = require('jsonwebtoken')
const axios = require('axios')

// So a token is needed to create meetings, which is why I've added this in the backend,
// but while it is also needed in the frontend I figured that made more sense to program
// in the frontend when Users click join meeting (I believe that's what the documentation
// reveals to be the simplest method). Please let me know if I'm just reading this wrong

exports.getToken = async (req, res, next) => {
	const API_KEY = process.env.VIDEO_KEY
	const SECRET_KEY = process.env.VIDEO_SECRET

	const options = { expiresIn: '120m', algorithm: 'HS256' }

	const payload = {
		apikey: API_KEY,
		version: 2,
		permissions: ['allow_join'],
	}

	const token = jwt.sign(payload, SECRET_KEY, options)

	res.locals.token = token

	next()
}

//
exports.createMeeting = async (req, res, next) => {
	// When we change from one meeting per group to multiple meetings,
	// we'll have to change this from firstMeeting.duration to just duration

	const { firstMeeting } = req.body
	const { token } = res.locals

	const url = `${process.env.VIDEOSDK_API_ENDPOINT}/api/meetings`
	const options = {
		method: 'POST',
		headers: { Authorization: token, 'Content-Type': 'application/json' },
		body: JSON.stringify({
			autoCloseConfig: {
				type: 'session-ends',
				duration: +firstMeeting.duration,
			},
		}),
	}

	const result = await axios(url, options)

	res.locals.result = result

	next()
}

// I don't think this is necessary, as meeting validation is (again, I think) only necessary
// for joining a meeting and therefore should occur in the frontend when a user joins a meeting

exports.validateMeetingId = async (req, res, next) => {
	const token = res.locals.token
	const meetingId = res.locals.result.data.meetingId

	const url = `${process.env.VIDEOSDK_API_ENDPOINT}/api/meetings/${meetingId}`

	const options = {
		method: 'POST',
		headers: { Authorization: token },
	}

	const result = await axios(url, options)

	res.locals.result = result

	next()
}
