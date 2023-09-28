const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  code: { type: String },
  gender: {
    type: String,
    // required: true
  },
  birthday: {
    type: Date
  },
  goals: [
    {
      type: String,
      default: "",
    },
  ],
  themen: [
    {
      type: String,
      default: "",
    },
  ],
  experience: {
    type: String,
    default: "",
  },
  moderator: {
    type: Boolean,
    default: false,
  },
  terms: {
    type: Boolean,
    date_agreed: Date,
  },
  groups: [
    {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
  // meetings: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Meeting'
  //   }
  // ]
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

const User = model("User", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().label("Username"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    goals: Joi.string().label("GoalJoi."),
    gender: Joi.string().label("Gender"),
    code: Joi.string().label("code"),
  });
  return schema.validate(data);
};

module.exports = { User, validate };
