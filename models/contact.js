const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({

    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,

    },
    contactNo: {
        required: true,
        type: String
    },
    message: {
        required: true,
        type: String
    },
    createdAt: { type: Date, default: Date.now }

})


const Contact = new mongoose.model('Contact', ContactSchema);
module.exports = Contact;