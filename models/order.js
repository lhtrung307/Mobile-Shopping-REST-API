let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let OrderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'customer',
        required: "Must have customer who create order"
    },
    order_status_code: {
        type: Schema.Types.ObjectId,
        ref: 'RefOrderStatus',
        required: "Must have status code"
    },
    date_order:{
        type: Date,
        default: Date.now
    },
    order_details: String
});

module.exports = mongoose.model('order', OrderSchema);