const { Schema, SchemaTypeOptions } = require("mongoose");
const Joi = require("joi");

const questionsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId
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
});


const Questions = model("Questions", questionsSchema);

const validate = (data) => {
  const schema = Joi.object({
    goals: Joi.array().items(Joi.string()).label("Goals"),
    themes: Joi.array().items(Joi.string()).label("Themes"),
    experience: Joi.string().label("Experience")
  });
  return schema.validate(data);
};

module.exports = { Questions, validate }
