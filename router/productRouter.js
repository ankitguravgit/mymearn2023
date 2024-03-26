const express = require('express');
const multer = require('multer');
const path = require("path");
const ProductRouter = express.Router();
const productController = require("../controllers/productController");
const productValidationSchema = require("../validators/addProductValidators")
const validate = require("../middlewares/validateMiddleware")
ProductRouter.use(express.static('uploads'));
const validateBearerToken = require('../middlewares/jwtAuth')
const validateRole = require('../middlewares/validateRole')

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
//*For single file____________________
// ProductRouter.route('/addProduct').post(upload.single('productImage'), productController.AddProductContact);
//*For single file____________________
ProductRouter.route('/addProduct').post(validateBearerToken, validateRole, upload.array('productImage', 5), validate(productValidationSchema.addProductSchema), productController.AddProductContact);
ProductRouter.route('/updateProduct/:id').put(validateBearerToken, validateRole, upload.array('productImage', 5), validate(productValidationSchema.addProductSchema), productController.updateProduct);
ProductRouter.route('/').post(validateBearerToken, productController.getAllProducts);
ProductRouter.route('/SpecificUserProductList').post(validateBearerToken, validateRole, productController.getProductListSpecificUser);
ProductRouter.route('/details/:id').get(validateBearerToken, productController.getProductDetails);
ProductRouter.route('/delete/:id').delete(validateBearerToken, validateRole, productController.deleteProduct);
ProductRouter.route('/searchProducts').post(validateBearerToken, productController.getAllProductsWithFilter);


module.exports = ProductRouter;