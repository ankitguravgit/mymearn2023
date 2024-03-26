const express = require('express');
const adminRoute = express.Router();
const adminController = require("../controllers/adminController")

adminRoute.route('/').get(adminController.getAdminDashboard);
adminRoute.route('/users').get(adminController.getAllUsers);
adminRoute.route('/hosts').get(adminController.getHosts);
adminRoute.route('/renters').get(adminController.getRenter);

module.exports = adminRoute;