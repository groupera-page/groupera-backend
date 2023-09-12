const { Schema, model } = require("mongoose");

const groupSchema = new Schema(
  {
    experience: {
      type: String
    }
}
);

const Group = model("Group", groupSchema);

module.exports = Group;
