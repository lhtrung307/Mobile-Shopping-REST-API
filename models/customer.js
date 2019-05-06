let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let CustomerSchema = new Schema({
    gender:{
        type: String,
        enum: ['Nam', 'Nữ', 'Male', 'Female']
    },
    first_name: {
        type: String,
        trim: true,
        required:true
    },
    last_name: {
        type: String,
        trim: true,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        unique: true
    },
    address: {
        type: String,
        default: ""
    },
    county: {
        type: String,
        default: ""
    },
    country: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model('customer', CustomerSchema);