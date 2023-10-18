const Group = require("../models/Group.model");
const { User } = require("../models/User.model");
const cloudinary = require("../utils/cloudinary");
const { dateTimeForCalender, insertEvent, getEvents, deleteEvent, getEvent } = require("../utils/googleCalendar");
// const fetch = require("node-fetch");
const generateRoom = require("../utils/videoSDK");


exports.create = async (req, res, next) => {
  const { img, when, freq, day, time, length, token } = req.body;

  let dateTime = dateTimeForCalender(when ,time, length);

  // Event for Google Calendar
 
  try {
    let group = await Group.findOne({ name: req.body.name });
    if (group)
      return res
        .status(409)
        .send({ message: "Group with given name already exists" });
    if (img) {
      const uploadRes = await cloudinary.uploader.upload(img, {
        upload_preset: "groupera-test",
      });
      if (uploadRes) {
        group = await new Group({
          ...req.body,
          img: uploadRes
        }).save();
        let event = {
          "summary": `${req.body.name}`,
          "description": `Join code: ${group._id}`,
          "start": {
            "dateTime": dateTime["start"],
            "timeZone": "Europe/Berlin",
          },
          "end": {
            "dateTime": dateTime["end"],
            "timeZone": "Europe/Berlin",
          },
          "recurrence": [
           `RRULE:FREQ=WEEKLY;INTERVAL=${+freq};COUNT=2;BYDAY=${day}`
          ]
        };        
        const newEvent = await insertEvent(event);
        if (newEvent) {
          let user = await User.updateOne(
            { _id: group.moderator._id },
            { $push: { moderatedGroups: group._id, meetings: newEvent.id }, moderator: true }
          );
          group = await Group.updateOne({ _id: group._id }, { meeting: newEvent.id } )
        }
        // generateRoom(token, group._id, length);
      }
      res.status(200).send({message: "all good here, boss"})
    }
  } catch (error) {
    res.status(500).send({ message: `${error}` });
  }
};


// exports.create = async (req, res, next) => {
//   const { img, date, time, length, token } = req.body;

//   let dateTime = dateTimeForCalender(date, time, length);

//   // Event for Google Calendar
//   let event = {
//     summary: `${req.body.name}`,
//     description: `${req.body.description}`,
//     start: {
//       dateTime: dateTime["start"],
//       timeZone: "Europe/Berlin",
//     },
//     end: {
//       dateTime: dateTime["end"],
//       timeZone: "Europe/Berlin",
//     },
//   };

//   try {
//     let group = await Group.findOne({ name: req.body.name });
//     if (group)
//       return res
//         .status(409)
//         .send({ message: "Group with given name already exists" });
//     if (img) {
//       const uploadRes = await cloudinary.uploader.upload(img, {
//         upload_preset: "groupera-test",
//       });
//       if (uploadRes) {
//         const newEvent = await insertEvent(event);
//         if (newEvent) {
//           group = await new Group({
//             ...req.body,
//             img: uploadRes,
//             meetingId: newEvent.id,
//           }).save();
//           let user = await User.updateOne(
//             { _id: group.users[0]._id },
//             { $push: { groups: group._id } }
//           );
//         }
//         generateRoom(token, group._id, length);
//       }
//     }
//   } catch (error) {
//     res.status(500).send({ message: `${error}` });
//   }
// };

exports.allGroups = async (req, res, next) => {
  try {
    let group = await Group.find();
    res.status(200).send(group);
  } catch (error) {
    res.status(500).send(`${error}`);
  }
};

exports.viewMeetings = async (req, res, next) => {
  try {
    let group = await Group.findOne({ _id: req.params.groupId });
    let start = '2023-10-03T00:00:00.000Z';
    let end = '2024-10-06T00:00:00.000Z';
    let event = await getEvents(start, end)
    let filteredEvent = event.filter((events) => events.id.includes(group.meeting))
    res.status(200).send(filteredEvent);
  } catch (error) {
    res.status(500).send(`${error}`);
  }
};

exports.groupId = async (req, res, next) => {
  try {
    let group = await Group.findOne({ _id: req.params.groupId });
    if (!group) return res.status(400).send({ message: "Invalid Link" });

    let event = await getEvent(group.meeting)
    console.log(event)

    res.status(200).send({ group });
  } catch (error) {
    res.status(500).send({ message: `${error}` });
  }
};

exports.joinGroup = async (req, res, next) => {
  const { currentUser } = req.body;
  try {
    let group = await Group.findOne({ _id: req.params.groupId });
    if (!group) return res.status(400).send({ message: "Invalid Link" });

    group = await Group.updateOne({ _id: req.params.groupId }, { $push: { users: currentUser } });
    let user = await User.updateOne({_id: currentUser}, {$push: { joinedGroups: req.params.groupId }})
    res.status(200).send({ message: "Group joined successfully" });

  } catch (error) {
    res.status(500).send({ message: `${error}` });
  }
};

exports.leaveGroup = async (req, res, next) => {
  const { currentUser } = req.body;

  try {
    let group = await Group.findOne({ _id: req.params.groupId });
    if (!group) return res.status(400).send({ message: "Invalid Link" });

    group = await Group.updateOne({ _id: req.params.groupId }, { $pull: { users: currentUser } });
    let user = await User.updateOne({_id: currentUser}, {$pull: { joinedGroups: req.params.groupId }})
    res.status(200).send({ message: "Group left successfully" });
  }
  catch (error) {
    res.status(500).send({ message: `${error}` });
  }
};

exports.editGroup = async (req, res, next) => {
  try {
    let group = await Group.findOne({ _id: req.params.groupId });
    if (!group) return res.status(400).send({ message: "Invalid Link" });

    group = await Group.updateOne({ _id: req.params.groupId }, { ...req.body });
    res.status(200).send({ message: "Group updated successfully" });
  } catch (error) {
    res.status(500).send({ message: `${error}` });
  }
};


exports.deleteGroup = async (req, res, next) => {
  try {
    let group = await Group.findOne({ _id: req.params.groupId });
    if (!group) return res.status(400).send({ message: "Invalid Link" });

    const data = await User.updateMany(
      {
        joinedGroups: {
          $in: [req.params.groupId],
        },
        meetings: {
          $in: [group.meeting]
        }
      },
      {
        $pull: {
          joinedGroups: req.params.groupId,
          meeting: group.meeting
        },
      }
    );

    await User.updateOne({ _id: group.moderator }, {
        $pull: {
          moderatedGroups: req.params.groupId,
          meetings: group.meeting
        }
    });

    const user = await User.findOne({ _id: group.moderator })

    if(user.moderatedGroups.length === 0){
      await User.updateOne({ _id: group.moderator }, { moderator: false } )
    };


    await deleteEvent(group.meeting)

    group = await Group.deleteOne({ _id: req.params.groupId });
    res.status(200).send({ message: "Group deleted successfully", data });
  } catch (error) {
    res.status(500).send({ message: `${error}` });
  }
};
