const express = require('express');
const paymentWebHookRoute = express.Router();
const paymentWebHookController = require("../controllers/paymentWebHookController");

//*webHooks
paymentWebHookRoute.route('/webhooks').post(express.raw({ type: 'application/json' }), paymentWebHookController.getWebHookDetails);

module.exports = paymentWebHookRoute;