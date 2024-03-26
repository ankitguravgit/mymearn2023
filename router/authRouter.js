const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController")
const validationSchema = require("../validators/authValidators")
const validate = require("../middlewares/validateMiddleware")

router.route('/register').post(validate(validationSchema.signupSchema), authController.register);
router.route('/login').post(validate(validationSchema.loginSchema), authController.login);
router.route('/forgotPassword').post(validate(validationSchema.forgotPasswordSchema), authController.forgotPassword);
router.route('/resetPassword').post(validate(validationSchema.resetPasswordSchema), authController.resetPassword);
router.route('/getAll').post(authController.getAllUsers);
router.route('/getUserDetails/:id').get(authController.getUserDetails);
router.route('/deleteUser/:id').delete(authController.deleteUser);
router.route('/updateProfile').post(authController.updateProfile);


module.exports = router;