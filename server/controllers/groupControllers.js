const Group = require("../models/Group.model");
const { User } = require("../models/User.model");
const cloudinary = require("../utils/cloudinary");
const { dateTimeForCalender, insertEvent } = require("../utils/googleCalendar");

exports.create = async (req, res, next) => {
    const { img, date, time, length } = req.body;

  let dateTime = dateTimeForCalender(date, time, length);

      // Event for Google Calendar
      let event = {
        summary: `${req.body.name}`,
        description: `${req.body.description}`,
        start: {
          dateTime: dateTime["start"],
          timeZone: "Europe/Berlin",
        },
        end: {
          dateTime: dateTime["end"],
          timeZone: "Europe/Berlin",
        },
      };

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
        const newEvent = await insertEvent(event);
        if(newEvent) {
          group = await new Group({ ...req.body, img: uploadRes, meetingId: newEvent.id }).save();
          let user = await User.updateOne(
            { _id: group.users[0]._id },
            { $push: { groups: group._id } }
          );
        }

        console.log(newEvent)
        res.status(201).send({ message: "Group successfully created" });
      }
    }
  } catch (error) {
    res.status(500).send({ message: `${error}` });
  }
};

exports.viewAll = async (req, res, next) => {
    try {
        let group = await Group.find();
    
        res.status(200).send(group);
      } catch (error) {
        res.status(500).send(`${error}`);
      }
};

exports.groupId = async (req, res, next) => {
    try {
        let group = await Group.findOne({ _id: req.params.groupId });
        if (!group) return res.status(400).send({ message: "Invalid Link" });
    
        res.status(200).send({ group });
      } catch (error) {
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
            groups: {
              $in: [req.params.groupId],
            },
          },
          {
            $pull: {
              groups: req.params.groupId,
            },
          }
        );
    
        group = await Group.deleteOne({ _id: req.params.groupId });
        res.status(200).send({ message: "Group deleted successfully", data });
      } catch (error) {
        res.status(500).send({ message: `${error}` });
      }
};