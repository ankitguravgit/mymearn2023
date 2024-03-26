const express = require('express');
const paymentRoute = express.Router();
const paymentCheckoutController = require("../controllers/paymentCheckoutController");

paymentRoute.route('/checkOutPayment').post(paymentCheckoutController.checkOutPayment);
paymentRoute.route('/checkOutPaymentWithSetup').post(paymentCheckoutController.checkOutPaymentWithSetup);
paymentRoute.route('/retrieveSession').post(paymentCheckoutController.retrievePaymentWithSetup);

//*PaymentIntent
paymentRoute.route('/checkOutPaymentIntent').post(paymentCheckoutController.checkOutPaymentIntent);
paymentRoute.route('/updateCheckOutPaymentIntent').post(paymentCheckoutController.updatePaymentIntent);
paymentRoute.route('/getAllPaymentIntent').post(paymentCheckoutController.getAllPaymentIntent);
paymentRoute.route('/confirmPaymentIntent').post(paymentCheckoutController.confirmPaymentIntent);

paymentRoute.route('/refundsPayment').post(paymentCheckoutController.refundsPayment);
paymentRoute.route('/cancelRefundsPayment').post(paymentCheckoutController.cancelRefundsPayment);
paymentRoute.route('/getAllRefundsPayment').get(paymentCheckoutController.getAllRefundsPayment);

//*subscription
paymentRoute.route('/createProduct').post(paymentCheckoutController.createProduct);
paymentRoute.route('/getAllProducts').get(paymentCheckoutController.getAllProducts);


paymentRoute.route('/createMonthlyPrice').post(paymentCheckoutController.createMonthlyPrice);
paymentRoute.route('/createYearlyPrice').post(paymentCheckoutController.createYearlyPrice);
paymentRoute.route('/getAllPrices').get(paymentCheckoutController.getAllPriceList);


paymentRoute.route('/createCustomer').post(paymentCheckoutController.createCustomer);
paymentRoute.route('/getCustomerList').get(paymentCheckoutController.getCustomerList);

paymentRoute.route('/getSubscripationList').get(paymentCheckoutController.getsubscriptionList);

paymentRoute.route('/monthlySubscription').post(paymentCheckoutController.monthlySubscription);

//*webHooks
// paymentRoute.route('/webhooks').post(express.raw({ type: 'application/json' }), paymentCheckoutController.getWebHookDetails);

module.exports = paymentRoute;