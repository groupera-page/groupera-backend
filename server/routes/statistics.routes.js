const router = require("express").Router();
const Statistics = require("../models/Statistics.model");


router.post("/create", async (req, res) => {
  try {
    
    const statistics = await new Statistics({ ...req.body }).save();

    res.status(201).send({ message: "Statistics successfully created", statistics });
  } catch (error) {
    res.status(500).send({ message: `${error}` });
  }
});

module.exports = router;