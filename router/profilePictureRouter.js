const multer = require('multer');
const express = require('express');
const router = express.Router();
const path = require("path");
const profilePictureController = require("../controllers/profilePictureController")
const validationSchema = require("../validators/profilePicValidators")
const validate = require("../middlewares/validateMiddleware")
router.use(express.static('profilePictures'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../profilePictures'))
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name)
    }
})

const upload = multer({ storage: storage })

router.route('/uploadProfile').post(upload.array('profilePic', 1), profilePictureController.uploadProfilePic);
router.route('/updateProfile').post(upload.array('profilePic', 1), profilePictureController.updateProfilePic);

module.exports = router;