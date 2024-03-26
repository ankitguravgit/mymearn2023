const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({

    userId: { required: true, type: String },
    productImage: { required: true, type: Array },
    productType: { required: true, type: String },
    productName: { required: true, type: String },
    price: { required: true, type: Number },
    state: { required: true, type: String },
    city: { required: true, type: [String] },
    make: { required: true, type: String },
    model: { required: true, type: String },
    isAvailableForDelivery: { required: true, type: Boolean },
    deliveryCost: { required: true, type: Number },
    otherFee: { required: true, type: Number },
    securityDeposit: { required: true, type: Number },
    insuranceCostPerDay: { required: true, type: Number },
    enableSafetyGear: { type: Boolean },
    safetyGear: { type: [String] },
    vin: { required: true, type: String },
    description: { required: true, type: String },
    specificationOfProduct: { required: true, type: [String] },
    createdAt: { type: Date, default: Date.now }
})


const Product = new mongoose.model('Product', ProductSchema);
module.exports = Product;