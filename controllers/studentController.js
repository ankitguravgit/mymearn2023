const Student = require('../models/student');
const StudentDoc = require('../models/studentDocuments')
const fs = require('fs');
const path = require("path");

//*Add Product 
const AddStudent = async (req, res) => {

    try {
        const { firstName, lastName, email, contactNo, city, state, dateOfBirth } = req.body;
        const studentCreated = await Student.create({ firstName, lastName, email, contactNo, city, state, dateOfBirth });

        res.status(200).send({
            statusCode: 200,
            message: "Student Add successfully",
            data: studentCreated,
        });

    } catch (error) {

        res.status(400).send({ msg: "Internal server error" });
    }
}

//*Add Student Document
const AddStudentDocument = async (req, res) => {
    try {
        const studentDoc = new StudentDoc({
            studentId: req.body.studentId,
            file: req.file.filename,
            filename: req.file.filename,
            isVerify: req.body.isVerify,
            isRadio: req.body.isRadio,
            docName: req.body.docName,
        })
        const studentDocData = await studentDoc.save();
        res.status(200).send({
            statusCode: 200,
            message: "Document Add successfully",
            data: studentDocData,
        });

    } catch (error) {
        res.status(400).send({ msg: "Internal server error" });
    }
}


module.exports = { AddStudent, AddStudentDocument }
