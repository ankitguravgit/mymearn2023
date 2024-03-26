const mongoose = require("mongoose");

const StudentDocSchema = new mongoose.Schema({

    studentId: {
        required: true,
        type: String
    },
    file: {
        required: true,
        type: String
    },
    filename: {
        required: true,
        type: String
    },
    isVerify: {
        required: true,
        type: String
    },
    isRadio: {
        required: true,
        type: String
    },
    docName: {
        required: true,
        type: String
    },
    createdAt: { type: Date, default: Date.now }
})

const StudentDoc = new mongoose.model('StudentDocument', StudentDocSchema);
module.exports = StudentDoc;