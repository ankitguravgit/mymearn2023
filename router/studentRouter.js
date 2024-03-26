const express = require('express');
const multer = require('multer');
const path = require("path");
const studentRoute = express.Router();
const studentController = require("../controllers/studentController");
const studentValidationSchema = require("../validators/studentValidators")
const validate = require("../middlewares/validateMiddleware")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'))
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name)
    }
})
const upload = multer({ storage: storage })

studentRoute.route('/addStudent').post(validate(studentValidationSchema.addStudentSchema), studentController.AddStudent);
studentRoute.route('/addStudentDoc').post(upload.single('file'), validate(studentValidationSchema.addStudentDocSchema), studentController.AddStudentDocument);

module.exports = studentRoute;