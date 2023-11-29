const fetch = require('node-fetch')

const generateRoom = async (token, id, length) => {
	const options = {
		method: 'POST',
		headers: {
			Authorization: token,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			region: 'sg001',
			customRoomId: id,
			autoCloseConfig: {
				type: 'session-ends',
				duration: +length,
			},
		}),
	}
	const url = 'https://api.videosdk.live/v2/rooms'
	const response = await fetch(url, options)
	return response.json()
}

module.exports = generateRoom
