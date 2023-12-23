const fetch = require('node-fetch')

// const generateRoom = async (token, id, length) => {
// 	const options = {
// 		method: 'POST',
// 		headers: {
// 			Authorization: token,
// 			'Content-Type': 'application/json',
// 		},
// 		body: JSON.stringify({
// 			region: 'sg001',
// 			customRoomId: id,
// 			autoCloseConfig: {
// 				type: 'session-ends',
// 				duration: +length,
// 			},
// 		}),
// 	}
// 	const url = 'https://api.videosdk.live/v2/rooms'
// 	const response = await fetch(url, options)
// 	return response.json()
// }

// module.exports = generateRoom

const API_BASE_URL = 'https://api.videosdk.live'
// const VIDEOSDK_TOKEN = process.env.REACT_APP_VIDEOSDK_TOKEN

exports.getToken = async () => {
	const res = await fetch(`${API_BASE_URL}/get-token`, {
		method: 'GET',
	})
	const { token } = await res.json()
	return token
}

exports.createMeeting = async ({ token }, length) => {
	const url = `${API_BASE_URL}/v2/rooms`
	const options = {
		method: 'POST',
		headers: { Authorization: token, 'Content-Type': 'application/json' },
		body: JSON.stringify({
			autoCloseConfig: {
				type: 'session-ends',
				duration: +length,
			},
		}),
	}

	const { roomId } = await fetch(url, options)
		.then((response) => response.json())
		.catch((error) => console.error('error', error))

	return roomId
}

// const validateMeeting = async ({ roomId, token }) => {
// 	const url = `${API_BASE_URL}/v2/rooms/validate/${roomId}`

// 	const options = {
// 		method: 'GET',
// 		headers: { Authorization: token, 'Content-Type': 'application/json' },
// 	}

// 	const result = await fetch(url, options)
// 		.then((response) => response.json()) //result will have meeting id
// 		.catch((error) => console.error('error', error))

// 	return result ? result.roomId === roomId : false
// }
