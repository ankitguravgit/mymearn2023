const PlaceOrderSchema = require('../models/placeOrder');
const { filterOrdersByHostId } = require('../helper/commonFunction')

//*Place Order 
const placeOrder = async (req, res) => {
    try {
        const { renterId, orderTotalAmount, depositAmount, orderStatus, productItems } = req.body;
        await PlaceOrderSchema.create({ renterId, orderTotalAmount, depositAmount, orderStatus, productItems });

        res.status(200).send({
            statusCode: 200,
            message: "Order place successfully.",
        });

    } catch (error) {
        res.status(400).send({ msg: "Internal server error" });
    }
}

//*get All Orders 
const getAllOrders = async (req, res) => {
    try {
        const { pageNo } = req.body;
        const skip = (pageNo - 1) * 10;
        const totalRecords = await PlaceOrderSchema.find()
        const data = await PlaceOrderSchema
            .find()
            .skip(skip)
            .limit(10)
            .sort({ createdAt: -1 });

        const totalPages = Math.ceil(totalRecords.length / 10);
        res.status(200).send({
            statusCode: 200,
            message: "Get all order response successfully",
            totalPages: totalPages,
            data: data
        });

    } catch (error) {
        res.status(400).send({ msg: "Internal server error" });
    }
}

//*get host order 
const getOrderByHost = async (req, res) => {
    try {
        const data = await PlaceOrderSchema.find().sort({ createdAt: -1 });
        var getHostOrderResponse = await filterOrdersByHostId(data, req.params.id)
        res.status(200).send({
            statusCode: 200,
            message: "Get all order response successfully.",
            data: getHostOrderResponse ? getHostOrderResponse : []
        });

    } catch (error) {
        res.status(400).send({ msg: "Internal server error" });
    }
}

//*get renter order 
const getOrderByRenter = async (req, res) => {
    try {
        const { renterId, pageNo } = req.body;
        const skip = (pageNo - 1) * 10;
        const totalRecords = await PlaceOrderSchema.find({ renterId: renterId })
        const data = await PlaceOrderSchema
            .find({ renterId: renterId })
            .skip(skip)
            .limit(10)
            .sort({ createdAt: -1 });

        const totalPages = Math.ceil(totalRecords.length / 10);

        res.status(200).send({
            statusCode: 200,
            message: "Get all order response successfully.",
            totalPages: totalPages,
            data: data
        });

    } catch (error) {
        res.status(400).send({ msg: "Internal server error" });
    }
}

//*order Details 
const orderDetails = async (req, res) => {
    try {
        const data = await PlaceOrderSchema.findById(req.params.id);
        res.status(200).send({
            statusCode: 200,
            message: "Get order details successfully.",
            data: data
        });

    } catch (error) {
        res.status(400).send({ msg: "Internal server error" });
    }
}

//*status update 
const updateOrderStatus = async (req, res) => {
    try {
        const id = req.body.orderId;
        const updatedData = req.body;
        const options = { new: true };

        const result = await PlaceOrderSchema.findByIdAndUpdate(
            id, updatedData, options
        )
        res.status(200).send({
            statusCode: 200,
            message: "Status update successfully.",
        });


    } catch (error) {
        res.status(400).send({ msg: "Internal server error" });
    }
}

//*order Search 
const searchOrder = async (req, res) => {
    try {
        const { orderStatus, pageNo } = req.body;
        const skip = (pageNo - 1) * 10;
        const totalRecords = await PlaceOrderSchema.find({ orderStatus: orderStatus })
        const data = await PlaceOrderSchema
            .find({ orderStatus: orderStatus })
            .skip(skip)
            .limit(10)
            .sort({ createdAt: -1 });

        const totalPages = Math.ceil(totalRecords.length / 10);
        res.status(200).send({
            statusCode: 200,
            message: "Get all order response successfully.",
            totalPages: totalPages,
            data: data
        })

    } catch (error) {
        res.status(400).send({ msg: "Internal server error" });
    }
}


module.exports = { placeOrder, getAllOrders, getOrderByHost, getOrderByRenter, orderDetails, updateOrderStatus, searchOrder }
