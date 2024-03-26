const mongoose = require("mongoose");

//*order Status
const OrderStatusEnum = ["Pending", "Accepted", "Rejected"];

const PlaceOrderSchema = new mongoose.Schema({

    renterId: { required: true, type: String },
    orderTotalAmount: { required: true, type: String },
    depositAmount: { required: true, type: String },
    orderStatus: { type: String, enum: OrderStatusEnum, default: "Pending" },
    productItems: [{
        hostId: { type: String },
        productId: { type: String },
        pickUpDate: { type: String },
        pickUpTime: { type: String },
        returnDate: { type: String },
        returnTime: { type: String },
    }],
    createdAt: { type: Date, default: Date.now }
})


const PlaceOrder = new mongoose.model('PlaceOrder', PlaceOrderSchema);
module.exports = PlaceOrder;