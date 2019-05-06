let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let orderItemSchema = new Schema({
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: 'Must have product id'
    },
    order_id: {
        type: Schema.Types.ObjectId,
        ref: 'order',
        required: 'Must have order id'
    },
    quantity: {
        type: Number,
        min: 1
    },
    price: {
        type: Number,
        min: 0 
    },
    detail: {
        type: String
    }
});

module.exports = mongoose.model('orderItem', orderItemSchema);