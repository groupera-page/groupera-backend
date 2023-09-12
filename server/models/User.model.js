const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30
    },
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 1024
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    gender: String,
    goals: String,
    illness: String,
    experience: String 
  }
);

const User = model("User", userSchema);

module.exports = User;
