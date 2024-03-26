const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const StudentSchema = new mongoose.Schema({

    firstName: {
        required: true,
        type: String
    },
    lastName: {
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
    state: {
        required: true,
        type: String
    },
    city: {
        required: true,
        type: String
    },
    dateOfBirth: {
        required: true,
        type: String
    },
    createdAt: { type: Date, default: Date.now }
})




const Student = new mongoose.model('Student', StudentSchema);
module.exports = Student;