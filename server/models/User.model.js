const { Schema, model } = require("mongoose");
// const jwt = require("jsonwebtoken");
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
    type: String
    // required: true
  },
  birthday: {
    type: Date
  },
  goals: [
    {
      type: String
    },
  ],
  themen: [
    {
      type: String
    },
  ],
  experience: {
    type: String
  },
  moderator: {
    type: Boolean,
    default: false,
  },
  paid: {
    type: Boolean,
    date_paid: Date,
    default: false
  },
  terms: {
    type: Boolean,
    date_agreed: Date,
    default: false
  },
  groups: [
    {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
  meetings: [
    {
      type: String
    }
  ],
});

// userSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign({ _id: this._id }, process.env.TOKEN_SECRET, {
//     algorithm: "HS256",
//     expiresIn: "7d",
//   });
//   console.log(token);
//   return token;
// };

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
