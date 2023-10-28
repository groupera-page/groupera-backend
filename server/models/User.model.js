const { Schema } = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new Schema({
  username: {
    type: String,
  },
  // Gotta look into this too for privacy
  email: {
    type: String,
    unique: [true, "E-Mail bereits in Gebrauch"],
  },
  password: {
    type: String,
  },
  age: {
    type: Date,
  },
  // Also potentially problematic
  verified: {
    type: Boolean,
    default: false,
  },
  code: { type: String },
  gender: {
    type: String,
  },
  // And this
  moderator: {
    type: String,
    // 'One' can be moderate, 'Two' can be need help, 'Three' can be don't want to
  },
  // And this
  paid: {
    type: Boolean,
    // date_paid: Date,
    default: false,
  },
  // And this
  terms: {
    type: Boolean,
    date_agreed: Date,
    default: false,
  },
  // This could be problematic
  moderatedGroups: [
    {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
  // This could definitely be problematic
  joinedGroups: [
    {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
  // Also problematic 
  meetings: [
    {
      type: String,
    },
  ],
  subscription: {
    type: Object,
  },
});

const User = model("User", userSchema);

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
    email: Joi.string()
      .email()
      .required()
      .label("Email")
      .messages({
        "string.email": "Bitte geben Sie eine gültige E-Mail Adresse ein",
        "string.empty": "Bitte geben Sie eine E-Mail Adresse ein",
      }),
    password: passwordComplexity()
      .required()
      .label("Password")
      .messages({ "any.required": "Erforderliches Feld" }),
    age: Joi.date().label("Age"),
    code: Joi.string().label("Code"),
    gender: Joi.string().valid('Männlich', 'Weiblich', 'Divers').label("Gender"),
    moderator: Joi.string().valid('One', 'Two', 'Three').label("Moderator"),
  });
  return schema.validate(data);
};

module.exports = { User, validate };
