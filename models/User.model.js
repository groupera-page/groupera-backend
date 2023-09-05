const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: String,
    password: String 
  }
);

const User = model("User", userSchema);

module.exports = User;
