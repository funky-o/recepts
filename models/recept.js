const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema(
  {
    id: {
      type: Number,
    },
    name: {
      type: String,
      required: true
    },
    needItems: [String],
    needForDo: [String],
    src: {
      type: String,
      required: true
    }
  }
)

module.exports = {
  "salads":  mongoose.model('Model', modelSchema, "salads"),
  "snacks":  mongoose.model("Model", modelSchema, "snacks"),
  "pizza":  mongoose.model("Model", modelSchema, "pizza"),
  "soups":  mongoose.model('Model', modelSchema, "soups")
}


