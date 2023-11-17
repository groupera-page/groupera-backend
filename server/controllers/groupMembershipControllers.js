const { Group } = require("../models/Group.model");
const { User } = require("../models/User.model");

exports.join = async (req, res) => {
  const {
    body: { currentUserId },
    params: { groupId },
  } = req;

  try {
    let group = await Group.findOne({ _id: groupId });
    if (!group)
      return res.status(400).send({ message: "Die Gruppe existiert nicht" });

    if (group.users.includes(currentUserId))
      return res
        .status(400)
        .send({ message: "Sie sind bereits Mitglied dieser Gruppe" });

    await User.updateOne(
      { _id: currentUserId },
      { $push: { joinedGroups: group._id, meetings: group.meeting } }
    );

    await Group.updateOne(
      { _id: groupId },
      { $push: { users: currentUserId } }
    );

    res.status(200).send({ message: "Gruppe erfolgreich beigetreten" });
  } catch (error) {
    res.status(500).send({ message: `${error}` });
  }
};

exports.leave = async (req, res) => {
  const {
    body: { currentUserId },
    params: { groupId },
  } = req;

  try {
    let group = await Group.findOne({ _id: groupId });
    if (!group)
      return res.status(400).send({ message: "Die Gruppe existiert nicht" });

    if (!group.users.includes(currentUserId))
      return res
        .status(400)
        .send({ message: "Sie sind kein Mitglied dieser Gruppe" });

    await User.updateOne(
      { _id: currentUserId },
      { $pull: { joinedGroups: groupId, meetings: group.meeting } }
    );

    await Group.updateOne(
      { _id: groupId },
      { $pull: { users: currentUserId } }
    );
    res.status(200).send({ message: "Gruppe erfolgreich verlassen" });
  } catch (error) {
    res.status(500).send({ message: `${error}` });
  }
};

exports.removeMember = async (req, res) => {
  const {
    body: { userId },
    params: { groupId },
  } = req;

  try {
    let group = await Group.findOne({ _id: groupId });
    if (!group)
      return res.status(400).send({ message: "Die Gruppe existiert nicht" });

    if (!group.users.includes(userId))
      return res
        .status(400)
        .send({
          message: "Der ausgewählte Benutzer ist kein Mitglied dieser Gruppe",
        });

    await User.updateOne(
      { _id: userId },
      { $pull: { joinedGroups: groupId, meetings: group.meeting } }
    );

    await Group.updateOne({ _id: groupId }, { $pull: { users: userId } });
    res.status(200).send({ message: "Gruppenmitglied erfolgreich entfernt" });
  } catch (error) {
    res.status(500).send({ message: `${error}` });
  }
};

// exports.inviteMember = async (req, res) => {
//   const {
//     body: { userId },
//     params: { groupId },
//   } = req;
//   try {
//   } catch (error) {
//     res.status(500).send({ message: `${error}` });
//   }
// };
