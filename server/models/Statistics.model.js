const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statisticsSchema = new Schema({
  gender: [
    {
      type: String,
    },
  ],
  themen: [
    {
      type: String,
    },
  ],
  goals: [
    {
      type: String,
    },
  ],
  frenquency: [
    {
      type: String,
    },
  ],
  experience: [
    {
      type: String,
    },
  ],
  day: [
    {
      type: String,
    },
  ],
  time: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Statistics", statisticsSchema);
