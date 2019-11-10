const mongoose = require('mongoose');

var masjidSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'This field is required.'
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    pincode: {
        type: String
    },
    contactperson: {
        type: String,
        required: 'This field is required.'
    },
    mobile: {
        type: String,
        required: 'This field is required.'
    }
});

// Custom validation for email
masjidSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

mongoose.model('Masjid', masjidSchema);