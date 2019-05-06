let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let refOrderStatusSchema = new Schema({
  order_status_code: {
    type: String,
    unique: true,
    required: "Must have order status code",
    trim: true
  },
  order_status_description: {
    type: String,
    trim: true
  }
});

module.exports = mongoose.model("RefOrderStatus", refOrderStatusSchema);
