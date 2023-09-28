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
  imgUrl: {
    type: String,
  },
  topic: {
    type: String,
  },
  frenquency: {
    type: String,
  },
  day: {
    type: String,
  },
  time: {
    type: String,
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
