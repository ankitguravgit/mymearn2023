const express = require('express');
const router = express.Router();
const messageController = require("../controllers/messageController")
const validationSchema = require("../validators/messageValidators")
const validate = require("../middlewares/validateMiddleware")

router.route('/send').post(validate(validationSchema.messageSchema), messageController.sendMessage);
router.route('/getAll').get(messageController.getAllMessage);
router.route('/get').post(validate(validationSchema.getMessageSchema), messageController.getMessage);

module.exports = router;