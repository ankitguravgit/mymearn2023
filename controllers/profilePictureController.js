const mongoose = require("mongoose");
const ProfilePicture = require('../models/profilePicture');
var mongoObjectId = mongoose.Types.ObjectId
const path = require("path");
const fs = require('fs');

//*upload Profile Pic
const uploadProfilePic = async (req, res) => {
    try {

        var userId = req.body.userId;
        const profilePicExits = await ProfilePicture.findOne({ userId });

        if (profilePicExits) { return res.status(400).send({ msg: "Profile Picture already upload" }) }

        const profilePicRes = new ProfilePicture({
            userId: req.body.userId,
            profilePic: req.files.map(file => file.filename),
        })

        const profilePicData = await profilePicRes.save();

        res.status(200).send({
            statusCode: 200,
            message: "Profile Pic Add successfully",
            data: profilePicData,
        });

    } catch (error) {
        //  console.log('error----', error)
        res.status(400).send({ msg: "Internal server error" });
    }
}

//*update Profile Pic
const updateProfilePic = async (req, res) => {
    try {

        const publicUploads = path.join(__dirname, '../profilePictures/');
        var userId = req.body.userId;
        const profilePicExits = await ProfilePicture.findOne({ userId });
        if (!profilePicExits) { return res.status(400).send({ msg: "User not upload profile Pic" }) }
        var profilePicId = profilePicExits?._id;

        if (req.files) {
            profilePicExits.profilePic.forEach(async (image, index) => {
                fs.unlinkSync(`${publicUploads}${image}`);

                if (index === profilePicExits.profilePic.length - 1) {

                    const updatedData = {
                        profilePic: req.files.map(file => file.filename),
                    };
                    const options = { new: true };

                    const result = await ProfilePicture.findByIdAndUpdate(
                        profilePicId, updatedData, options
                    )
                    res.status(200).send({
                        statusCode: 200,
                        message: "Profile Picture update successfully",
                    });
                }
            })
        }


    } catch (error) {
        // console.log('error----', error)
        res.status(400).send({ msg: "Internal server error" });
    }
}

module.exports = { uploadProfilePic, updateProfilePic }
