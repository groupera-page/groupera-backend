const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  description: {
    type: String,
    required: true,
    minLength: 3,
    maxlength: 250,
  },
  img: {
    type: Object
  },
  topic: {
    type: String,
  },
  frenquency: {
    type: String,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  events: {
    type: String
  },
  // moderator: {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Moderator'
  // },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
  ],
});

module.exports = mongoose.model("Group", groupSchema);
