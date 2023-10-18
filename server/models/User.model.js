const { Schema, model } = require("mongoose");
// const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const { language } = require("googleapis/build/src/apis/language");

const userSchema = new Schema({
  username: {
    type: String
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String
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
  moderatedGroups: [
    {
      type: Schema.Types.ObjectId,
      ref: "Group",
    }
  ],
  joinedGroups: [
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

// https://github.com/hapijs/joi/blob/master/API.md#list-of-errors

const validate = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(1).max(120).required().label("Username").messages({'string.max': 'Bitte halten Sie den Namen auf weniger als 120 Zeichen', 'string.empty': 'Bitte Name eingeben'}),
    email: Joi.string().email().required().label("Email").messages({'string.email': 'Bitte geben Sie eine gültige E-Mail Adresse ein', 'string.empty': 'Bitte geben Sie eine E-Mail Adresse ein'}),
    password: passwordComplexity().required().label("Password").messages({'any.required': 'Erforderliches Feld'}),
    goals: Joi.string().label("GoalJoi."),
    gender: Joi.string().label("Gender"),
    code: Joi.string().label("code"),
    experience: Joi.string().label("experience"),
  });
  return schema.validate(data);
};

module.exports = { User, validate };
