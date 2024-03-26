const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({

    senderId: {
        required: true,
        type: mongoose.Schema.ObjectId,
    },
    receiverId: {
        required: true,
        type: mongoose.Schema.ObjectId
    },
    message: {
        required: true,
        type: String
    },
    createdAt: { type: Date, default: Date.now }
})

const Message = new mongoose.model('Message', MessageSchema);
module.exports = Message;