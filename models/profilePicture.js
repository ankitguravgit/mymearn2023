const mongoose = require("mongoose");

const ProfilePictureSchema = new mongoose.Schema({

    profilePic: {
        required: true,
        type: Array
    },
    userId: {
        required: true,
        type: mongoose.Schema.ObjectId,

    },
    createdAt: { type: Date, default: Date.now }

})


const ProfilePicture = new mongoose.model('ProfilePicture', ProfilePictureSchema);
module.exports = ProfilePicture;