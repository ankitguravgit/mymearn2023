const mongoose = require("mongoose");
const Message = require('../models/message');
const User = require('../models/user')
var mongoObjectId = mongoose.Types.ObjectId


//*sendMessage 
const sendMessage = async (req, res) => {
    try {
        const { senderId, receiverId, message } = req.body;

        const messageCreated = await Message.create({ senderId, receiverId, message });

        res.status(200).send({
            statusCode: 200,
            message: "Message send successfully",
            data: messageCreated
        });

    } catch (error) {
        // console.log('error----', error)
        res.status(400).send({ msg: "Internal server error" });
    }
}


const getAllMessage = async (req, res) => {
    try {

        let messageData = await Message.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "senderId",
                    foreignField: "_id",
                    as: "senderDetails"
                }
            },
            { $unwind: '$senderDetails' },
            {
                $lookup: {
                    from: "users",
                    localField: "receiverId",
                    foreignField: "_id",
                    as: "receiverDetails"
                }
            },
            { $unwind: '$receiverDetails' },
            {
                $lookup: {
                    from: "profilepictures",
                    localField: "senderId",
                    foreignField: "userId",
                    as: "senderProfilePictures"
                }
            },
            { $unwind: '$senderProfilePictures' },
            {
                $lookup: {
                    from: "profilepictures",
                    localField: "receiverId",
                    foreignField: "userId",
                    as: "receiverProfilePictures"
                }
            },
            { $unwind: '$receiverProfilePictures' },
            {
                $addFields: {
                    "senderDetails.profilePic": { $arrayElemAt: ["$senderProfilePictures.profilePic", 0] },
                    "receiverDetails.profilePic": { $arrayElemAt: ["$receiverProfilePictures.profilePic", 0] }
                }
            },
            {
                $project: {
                    "senderId": 1,
                    "receiverId": 1,
                    "message": 1,
                    "createdAt": 1,
                    "senderDetails._id": 1,
                    "senderDetails.firstName": 1,
                    "senderDetails.lastName": 1,
                    "senderDetails.email": 1,
                    "receiverDetails._id": 1,
                    "receiverDetails.firstName": 1,
                    "receiverDetails.lastName": 1,
                    "receiverDetails.email": 1,
                    "senderDetails.profilePic": 1,
                    "receiverDetails.profilePic": 1
                }
            }
        ]);

        res.status(200).send({
            statusCode: 200,
            message: "Get message list successfully",
            data: messageData
        });

    } catch (error) {
        // console.log('error----', error)
        res.status(400).send({ msg: "Internal server error" });
    }
}

const getMessage = async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;

        let messageData = await Message.aggregate([
            { "$match": { $and: [{ 'senderId': new mongoObjectId(senderId) }, { 'receiverId': new mongoObjectId(receiverId) }] } },
            {
                $lookup: {
                    from: "users",
                    localField: "senderId",
                    foreignField: "_id",
                    as: "senderDetails"
                }
            },
            { $unwind: '$senderDetails' },
            {
                $lookup: {
                    from: "users",
                    localField: "receiverId",
                    foreignField: "_id",
                    as: "receiverDetails"
                }
            },
            { $unwind: '$receiverDetails' },
            {
                $lookup: {
                    from: "profilepictures",
                    localField: "senderId",
                    foreignField: "userId",
                    as: "senderProfilePictures"
                }
            },
            { $unwind: '$senderProfilePictures' },
            {
                $lookup: {
                    from: "profilepictures",
                    localField: "receiverId",
                    foreignField: "userId",
                    as: "receiverProfilePictures"
                }
            },
            { $unwind: '$receiverProfilePictures' },
            {
                $addFields: {
                    "senderDetails.profilePic": { $arrayElemAt: ["$senderProfilePictures.profilePic", 0] },
                    "receiverDetails.profilePic": { $arrayElemAt: ["$receiverProfilePictures.profilePic", 0] }
                }
            },
            {
                $project: {
                    "senderId": 1,
                    "receiverId": 1,
                    "message": 1,
                    "createdAt": 1,
                    "senderDetails._id": 1,
                    "senderDetails.firstName": 1,
                    "senderDetails.lastName": 1,
                    "senderDetails.email": 1,
                    "receiverDetails._id": 1,
                    "receiverDetails.firstName": 1,
                    "receiverDetails.lastName": 1,
                    "receiverDetails.email": 1,
                    "senderDetails.profilePic": 1,
                    "receiverDetails.profilePic": 1
                }
            }
        ]);

        res.status(200).send({
            statusCode: 200,
            message: "Get message list successfully",
            data: messageData
        });

    } catch (error) {
        // console.log('error----', error)
        res.status(400).send({ msg: "Internal server error" });
    }
}


module.exports = { sendMessage, getAllMessage, getMessage }
