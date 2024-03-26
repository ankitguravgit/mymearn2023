const express = require('express');
const contactRouter = express.Router();
const contactController = require("../controllers/contactController")
const validationSchema = require("../validators/contactValidators")
const validate = require("../middlewares/validateMiddleware")

contactRouter.route('/createContact').post(validate(validationSchema.contactSchema), contactController.postContact);
contactRouter.route('/getContacts').post(contactController.getAllContact);

module.exports = contactRouter;