const express = require('express');
const placeOrderRoute = express.Router();
const placeOrderController = require("../controllers/placeOrderController")
const validateBearerToken = require('../middlewares/jwtAuth')
const placeOrderValidationSchema = require("../validators/placeOrderValidators")
const validate = require("../middlewares/validateMiddleware")

placeOrderRoute.route('/PlaceNew').post(validateBearerToken, validate(placeOrderValidationSchema.placeOrderSchema), placeOrderController.placeOrder);
placeOrderRoute.route('/').post(validateBearerToken, placeOrderController.getAllOrders);
placeOrderRoute.route('/getHostBy/:id').get(validateBearerToken, placeOrderController.getOrderByHost);
placeOrderRoute.route('/getRenterBy').post(validateBearerToken, placeOrderController.getOrderByRenter);
placeOrderRoute.route('/details/:id').get(validateBearerToken, placeOrderController.orderDetails);
placeOrderRoute.route('/updateStatus').post(validateBearerToken, validate(placeOrderValidationSchema.updateOrderStatusSchema), placeOrderController.updateOrderStatus);
placeOrderRoute.route('/searchOrder').post(validateBearerToken, placeOrderController.searchOrder);


module.exports = placeOrderRoute;