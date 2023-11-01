const { Schema, model } = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: [true, "Die E-Mail Adresse ist ungültig"],
  },
  password: {
    type: String,
  },
  role: {
    type: String
  },
  age: {
    type: Date,
  },
  goals: [
    {
      type: String,
    },
  ],
  themes: [
    {
      type: String,
    },
  ],
  experience: {
    type: String,
  },
  verificationExpires: {
    type: Date,
    default: () => new Date(+new Date() + 15 * 60 * 1000) //3 minutes
  },
  verified: {
    type: Boolean,
    default: false,
  },
  code: { type: String },
  gender: {
    type: String,
  },
  moderator: {
    type: String,
    // 'One' can be moderate, 'Two' can be need help, 'Three' can be don't want to
  },
  // Hide this in requests
  paid: {
    type: Boolean,
    // date_paid: Date,
    default: false,
  },
  terms: {
    type: Boolean,
    date_agreed: Date,
    default: false,
  },
  moderatedGroups: [
    {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
  joinedGroups: [
    {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
  meetings: [
    {
      type: String,
    },
  ],
  subscription: {
    type: Object,
  },
},
// {
//   timestamps: true
// }
);

const User = model("User", userSchema);

userSchema.index(
  { 'verificationExpires': 1 },
  {
    expireAfterSeconds: 0,
    partialFilterExpression: { 'verified': false }
  }
);

// https://github.com/hapijs/joi/blob/master/API.md#list-of-errors

const validate = (data) => {
  const schema = Joi.object({
    username: Joi.string()
      .min(1)
      .max(70)
      .required()
      .label("Username")
      .messages({
        "string.max": "Bitte halten Sie den Namen auf weniger als 70 Zeichen",
        "string.empty": "Bitte Name eingeben",
      }),
    email: Joi.string().email().required().label("Email").messages({
      "string.email": "Bitte geben Sie eine gültige E-Mail Adresse ein",
      "string.empty": "Bitte geben Sie eine E-Mail Adresse ein",
    }),
    password: passwordComplexity()
      .required()
      .label("Password")
      .messages({ "any.required": "Erforderliches Feld" }),
    role: Joi.string().label("Role"),
    age: Joi.date().label("Age"),
    code: Joi.string().label("Code"),
    gender: Joi.string()
      .valid("Männlich", "Weiblich", "Divers")
      .label("Gender"),
    moderator: Joi.string().valid("One", "Two", "Three").label("Moderator"),
    goals: Joi.array().items(Joi.string()).label("Goals"),
    themes: Joi.array().items(Joi.string()).label("Themes"),
    experience: Joi.string().label("Experience"),
  });
  return schema.validate(data);
};


module.exports = { User, validate };
