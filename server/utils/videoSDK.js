const fetch = require('node-fetch');

const generateRoom = async (region, token, roomId, res, length) => {
    const url = `https://api.videosdk.live/v2/rooms`;
    const options = {
      method: "POST",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify({ region, 'customRoomId': roomId, 'autoCloseConfig': {
        'type': 'session-ends',
        'duration': length
       } })
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((result) => {
        res.json(result);
        console.log(result);
      })
      .catch((error) => console.error("error", error));
}

module.exports = generateRoom;

