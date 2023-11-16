const { Schema, model } = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new Schema({
  alias: {
    type: String,
  },
  email: {
    type: String,
    unique: [true, "Die E-Mail Adresse ist ungültig"],
  },
  passwordHash: {
    type: String,
  },
  dob: {
    type: Date,
  },
  questions: {
    type: Object
  },
  emailVerificationExpires: {
    type: Date,
    default: () => new Date(+new Date() + 15 * 60 * 1000) // 15 minutes
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  authCode: { type: String },
  gender: {
    type: String,
  },
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
  paymentSubscription: {
    type: Object,
  },
  refreshToken: {
    type: String
  }
}
);

const User = model("User", userSchema);

userSchema.index(
  { 'emailVerificationExpires': 1 },
  {
    expireAfterSeconds: 0,
    partialFilterExpression: { 'emailVerified': false }
  }
);

// https://github.com/hapijs/joi/blob/master/API.md#list-of-errors

const validate = (data) => {
  const schema = Joi.object({
    alias: Joi.string()
      .min(1)
      .max(70)
      .required()
      .label("Alias")
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
    dob: Joi.date().label("Age"),
    authCode: Joi.string().label("Code"),
    gender: Joi.string()
      .valid("Männlich", "Weiblich", "Divers")
      .label("Gender"),
    questions: Joi.object().label("Questions")
  });
  return schema.validate(data);
};


module.exports = { User, validate };
