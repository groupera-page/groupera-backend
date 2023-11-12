const { Group, validate } = require("../models/Group.model");
const { User } = require("../models/User.model");
// const cloudinary = require("../utils/cloudinary");
const {
  dateTimeForCalender,
  insertEvent,
  getEvents,
  deleteEvent,
  getEvent,
  editEvent,
} = require("../utils/googleCalendar");
// const fetch = require("node-fetch");
const generateRoom = require("../utils/videoSDK");

exports.create = async (req, res) => {
  const { img, frequency, date, time, length, token, currentUserId, name } =
    req.body;

  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    let group = await Group.findOne({ name: name });
    if (group)
      return res.status(409).send({
        message: "Gruppe mit dem angegebenen Namen existiert bereits",
      });
    // if (img) {
    //   const uploadRes = await cloudinary.uploader.upload(img, {
    //     folder: "test",
    //   });
    //   if (uploadRes) {
    group = await new Group({
      ...req.body,
      // img: uploadRes
    }).save();
    // let user = await User.findOne({ _id: group.moderator._id });
    const user = await User.findOne({ _id: currentUserId });
    const dateTime = dateTimeForCalender(date, time, length);
    const event = {
      summary: group.name,
      description: `Join code: ${group._id}`,
      start: {
        dateTime: dateTime["start"],
        timeZone: "Europe/Berlin",
      },
      end: {
        dateTime: dateTime["end"],
        timeZone: "Europe/Berlin",
      },
      recurrence: [`RRULE:FREQ=WEEKLY;INTERVAL=${+frequency}`],
    };
    const newEvent = await insertEvent(event);
    if (newEvent) {
      await User.updateOne(
        { _id: user._id },
        { $push: { moderatedGroups: group._id, meetings: newEvent.id } }
      );
      await Group.updateOne(
        { _id: group._id },
        { meeting: newEvent.id, verified: true, moderatorId: user._id }
      );
    }
    // generateRoom(token, group._id, length);
    // }
    res.status(200).send({ message: "all good here, boss" });
    // }
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

exports.findAll = async (req, res) => {
  try {
    let groups = await Group.find();

    groups = groups.map((group) => {
      return {
        _id: group._id,
        name: group.name,
        description: group.description,
      };
    });

    res.status(200).send(groups);
  } catch (error) {
    res.status(500).send(`${error}`);
  }
};

exports.meetings = async (req, res) => {
  const { groupId } = req.params;
  try {
    const group = await Group.findOne({ _id: groupId });
    const start = "2023-10-03T00:00:00.000Z";
    const end = "2036-10-06T00:00:00.000Z";
    const events = await getEvents(start, end);
    const filteredEvent = events.filter((event) =>
      event.id.includes(group.meeting)
    );
    res.status(200).send(filteredEvent);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.findOne = async (req, res) => {
  const { groupId } = req.params;
  try {
    let group = await Group.findOne({ _id: groupId });
    if (!group)
      return res.status(400).send({ message: "Die Gruppe existiert nicht" });

    res.status(200).send({ group });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

exports.edit = async (req, res) => {
  const {
    body: { date, time, length, frequency },
    params: { groupId },
  } = req;

  try {
    let group = await Group.findOne({ _id: groupId });
    if (!group)
      return res.status(400).send({ message: "Die Gruppe existiert nicht" });

    await Group.updateOne({ _id: groupId }, { ...req.body });

    const dateTime = dateTimeForCalender(date, time, length);

    const event = {
      summary: group.name,
      description: `Join code: ${group._id}`,
      start: {
        dateTime: dateTime["start"],
        timeZone: "Europe/Berlin",
      },
      end: {
        dateTime: dateTime["end"],
        timeZone: "Europe/Berlin",
      },
      recurrence: [`RRULE:FREQ=WEEKLY;INTERVAL=${+frequency}`],
    };

    await editEvent(group.meeting, event);

    res.status(200).send({ message: "Gruppe erfolgreich aktualisiert" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

exports.delete = async (req, res) => {
  const { groupId } = req.params;
  try {
    let group = await Group.findOne({ _id: groupId });
    if (!group)
      return res.status(400).send({ message: "Die Gruppe existiert nicht" });

    await User.updateMany(
      {
        joinedGroups: {
          $in: [groupId],
        },
        meetings: {
          $in: [group.meeting],
        },
      },
      {
        $pull: {
          joinedGroups: groupId,
          meetings: group.meeting,
        },
      }
    );

    await User.updateOne(
      { _id: group.moderatorId },
      {
        $pull: {
          moderatedGroups: groupId,
          meetings: group.meeting,
        },
      }
    );

    const user = await User.findOne({ _id: group.moderatorId });

    if (user.moderatedGroups.length === 0) {
      user.moderator = false;
      await user.save();
    }

    await deleteEvent(group.meeting);

    await Group.deleteOne({ _id: groupId });
    res.status(200).send({ message: "Gruppe erfolgreich gelöscht" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
