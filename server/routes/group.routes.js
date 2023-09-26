const router = require("express").Router();
const Group = require("../models/Group.model");

router.post("/create", async (req, res) => {
  try {
    let group = await Group.findOne({ name: req.body.name });
    if (group)
      return res
        .status(409)
        .send({ message: "Group with given name already exists" });

    group = await new Group({ ...req.body }).save();

    res.status(201).send({ message: "Group successfully created" });
  } catch (error) {
    res.status(500).send({ message: `${error}` });
  }
});

router.get("/groups", async (req, res) => {
    try {
        let group = await Group.find();

        res.status(200).send(group)
    }
    catch (error) {
        res.status(500).send(`${error}`)    }

})

router.get("/:groupId", async (req, res) => {
    try {
        let group = await Group.findOne({_id: req.params.groupId});
		if(!group) return res.status(400).send({message: "Invalid Link"});

        res.status(200).send({ group })
    }
    catch (error) {
        res.status(500).send({ message: `${error}` });

    }
});

module.exports = router;
