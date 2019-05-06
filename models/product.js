let mongoose = require('mongoose');

const Schema = mongoose.Schema;

let productSchema = new Schema({
    product_type_code: {
        type: Schema.Types.ObjectId,
        ref: 'RefProductType'
    },
    name: String,
    price: String,
    colors: [{
        type: Schema.Types.ObjectId,
        ref: 'Color'
    }],
    size: String,
    description: String
});

module.exports = mongoose.model('Product', productSchema)