const fetch = require("node-fetch");


const generateRoom = async (token, id, length) => {

  const options = {
    method: "POST",
    headers: {
      "Authorization": token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({"region" : "sg001","customRoomId" : id, 'autoCloseConfig': {
      'type': 'session-ends',
      'duration': +length
     }}),
  };
  const url= `https://api.videosdk.live/v2/rooms`;
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);


  // const url = `https://api.videosdk.live/v2/rooms`;
  // const options = {
  //   method: "POST",
  //   headers: { "Authorization": process.env.VIDEO_TOKEN, "Content-Type": "application/json" },
  //   body: JSON.stringify({ 
  //     region
  //   })
  // };

  // fetch(url, options)
  //   .then((response) => {
  //     response.json();
  //     console.log(response);
  //   })
  //   .then((result) => {
  //     res.json(result);
  //     console.log(result);
  //   })
  //   .catch((error) => console.error("error", error));
};


// const generateRoom = async (region, token, roomId, res, length) => {
//   const url = `https://api.videosdk.live/v2/rooms`;
//   const options = {
//     method: "POST",
//     headers: { "Authorization": token, "Content-Type": "application/json" },
//     body: JSON.stringify({ 
//       region,
//       "customRoomId": roomId,
//       "autoCloseConfig": {
//         "type": "session-ends",
//         "duration": length
//       }
//     })
//   };

//   fetch(url, options)
//     .then((response) => {
//       response.json();
//       console.log(response);
//     })
//     .then((result) => {
//       res.json(result);
//       console.log(result);
//     })
//     .catch((error) => console.error("error", error));
// };


module.exports = generateRoom;
