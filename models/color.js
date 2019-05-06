const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let colorSchema = new Schema({
  color_description: {
    type: String,
    unique: true,
    trim: true,
    required: "Must have color description"
  }
});

module.exports = mongoose.model("Color", colorSchema);
