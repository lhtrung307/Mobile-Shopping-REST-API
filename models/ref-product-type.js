const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let refProductTypeSchema = new Schema({
    product_type_code: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    product_type_description: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('RefProductType', refProductTypeSchema);
