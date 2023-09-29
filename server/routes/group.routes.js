const router = require("express").Router();
const Group = require("../models/Group.model");
const { User } = require("../models/User.model");
const cloudinary = require("../utils/cloudinary");

router.post("/create", async (req, res) => {
  const { img } = req.body;

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
        group = await new Group({ ...req.body, img: uploadRes }).save();
        let user = await User.updateOne(
          { _id: group.users[0]._id },
          { $push: { groups: group._id } }
        );
        res.status(201).send({ message: "Group successfully created" });
      }
    }
  } catch (error) {
    res.status(500).send({ message: `${error}` });
  }
});

router.get("/groups", async (req, res) => {
  try {
    let group = await Group.find();

    res.status(200).send(group);
  } catch (error) {
    res.status(500).send(`${error}`);
  }
});

router.get("/:groupId", async (req, res) => {
  try {
    let group = await Group.findOne({ _id: req.params.groupId });
    if (!group) return res.status(400).send({ message: "Invalid Link" });

    res.status(200).send({ group });
  } catch (error) {
    res.status(500).send({ message: `${error}` });
  }
});

router.put("/:groupId", async (req, res) => {
  try {
    let group = await Group.findOne({ _id: req.params.groupId });
    if (!group) return res.status(400).send({ message: "Invalid Link" });

    group = await Group.updateOne({ _id: req.params.groupId }, { ...req.body });
    res.status(200).send({ message: "Group updated successfully" });
  } catch (error) {
    res.status(500).send({ message: `${error}` });
  }
});

router.delete("/:groupId", async (req, res) => {
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
});

module.exports = router;
