const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let refProductTypeSchema = new Schema({
  product_type_code: {
    type: String,
    required: "Must have product_type_code",
    trim: true,
    unique: true
  },
  product_type_description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("RefProductType", refProductTypeSchema);
