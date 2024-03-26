const Contact = require('../models/contact');

//*Register 
const postContact = async (req, res) => {

    try {
        const { name, email, contactNo, message } = req.body;
        const contactCreated = await Contact.create({ name, email, contactNo, message });

        res.status(200).send({
            statusCode: 200,
            message: "Message send successfully",
            userId: contactCreated,
        });

    } catch (error) {
        res.status(400).send({ msg: "Internal server error" });
    }
}


//*Get All Users
const getAllContact = async (req, res) => {
    try {
        const { pageNo } = req.body;
        const skip = (pageNo - 1) * 10;
        const totalContacts = await Contact.find()
        const data = await Contact
            .find()
            .skip(skip)
            .limit(10)
            .sort({ createdAt: -1 });

        const totalPages = Math.ceil(totalContacts.length / 10);
        res.status(200).send({
            statusCode: 200,
            message: "Get all contacts response successfully",
            totalPages: totalPages,
            data: data
        });

    } catch (error) {
        res.status(400).send({ msg: "Internal server error" });
    }
}

module.exports = { postContact, getAllContact }
