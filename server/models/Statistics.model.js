const { Schema, model } = require("mongoose");

const statisticsSchema = new Schema(
  {
    experience: {
      type: String
    }
}
);

const Statistics = model("Statistics", statisticsSchema);

module.exports = Statistics;
