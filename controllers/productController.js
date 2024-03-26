const Product = require('../models/product');
const fs = require('fs');
const path = require("path");

//*Add Product 
const AddProductContact = async (req, res) => {
    try {
        const product = new Product({
            userId: req.body.userId,
            productImage: req.files.map(file => file.filename),
            productType: req.body.productType,
            productName: req.body.productName,
            price: req.body.price,
            state: req.body.state,
            city: req.body.city,
            make: req.body.make,
            model: req.body.model,
            isAvailableForDelivery: req.body.isAvailableForDelivery,
            deliveryCost: req.body.deliveryCost,
            otherFee: req.body.otherFee,
            securityDeposit: req.body.securityDeposit,
            insuranceCostPerDay: req.body.insuranceCostPerDay,
            enableSafetyGear: req.body.enableSafetyGear,
            safetyGear: req.body.safetyGear,
            vin: req.body.vin,
            description: req.body.description,
            specificationOfProduct: req.body.specificationOfProduct,
        })

        const productData = await product.save();

        res.status(200).send({
            statusCode: 200,
            message: "Product Add successfully",
            data: productData,
        });

    } catch (error) {
        res.status(400).send({ msg: "Internal server error" });
    }
}

//*Update Product
const updateProduct = async (req, res) => {
    try {
        const publicUploads = path.join(__dirname, '../uploads/');
        const existingProductDetails = await Product.findOne({ _id: req.params.id });
        if (!existingProductDetails) { return res.send({ Error: 'Could not find your post' }) }
        if (req.files) {
            existingProductDetails.productImage.forEach(async (image, index) => {
                fs.unlinkSync(`${publicUploads}${image}`);

                if (index === existingProductDetails.productImage.length - 1) {

                    const id = req.params.id;
                    const updatedData = {
                        productImage: req.files.map(file => file.filename),
                        productType: req.body.productType,
                        productName: req.body.productName,
                        price: req.body.price,
                        state: req.body.state,
                        city: req.body.city,
                        make: req.body.make,
                        model: req.body.model,
                        isAvailableForDelivery: Boolean(req.body.isAvailableForDelivery),
                        deliveryCost: req.body.deliveryCost,
                        otherFee: req.body.otherFee,
                        securityDeposit: req.body.securityDeposit,
                        insuranceCostPerDay: req.body.insuranceCostPerDay,
                        enableSafetyGear: Boolean(req.body.enableSafetyGear),
                        safetyGear: req.body.safetyGear,
                        vin: req.body.vin,
                        description: req.body.description,
                        specificationOfProduct: req.body.specificationOfProduct,
                    };
                    const options = { new: true };

                    const result = await Product.findByIdAndUpdate(
                        id, updatedData, options
                    )
                    res.status(200).send({
                        statusCode: 200,
                        message: "Product update successfully",
                    });
                }
            })
        }

    } catch (error) {
        res.status(400).send({ msg: "Internal server error" });
    }
}


//*Get All Users
const getAllProducts = async (req, res) => {
    try {
        const { pageNo } = req.body;
        const skip = (pageNo - 1) * 10;
        const totalProductsCount = await Product.find().count()
        const totalProducts = await Product.find()
        const data = await Product
            .find()
            .skip(skip)
            .limit(10)
            .sort({ createdAt: -1 });

        const totalPages = Math.ceil(totalProducts.length / 10);
        res.status(200).send({
            statusCode: 200,
            message: "Get all products response successfully",
            totalPages: totalPages,
            totalProductsCount: totalProductsCount,
            data: data
        });

    } catch (error) {
        res.status(400).send({ msg: "Internal server error" });
    }
}

//*Get Specific user list
const getProductListSpecificUser = async (req, res) => {
    try {
        const { userId, pageNo } = req.body;
        const skip = (pageNo - 1) * 10;
        const totalProducts = await Product.find({ userId: userId })
        const data = await Product
            .find({ userId: userId })
            .skip(skip)
            .limit(10)
            .sort({ createdAt: -1 });

        const totalPages = Math.ceil(totalProducts.length / 10);
        res.status(200).send({
            statusCode: 200,
            message: "Get Product details successfully",
            totalPages: totalPages,
            data: data
        });

    } catch (error) {
        res.status(400).send({ msg: "Internal server error" });
    }
}

//*Get User Details
const getProductDetails = async (req, res) => {
    try {
        const data = await Product.findById(req.params.id);
        res.status(200).send({
            statusCode: 200,
            message: "Get Product details successfully",
            data: data
        });

    } catch (error) {
        res.status(400).send({ msg: "Internal server error" });
    }
}

//*Delete Product
const deleteProduct = async (req, res) => {
    try {
        const data = await Product.findByIdAndDelete(req.params.id)
        res.status(200).send({
            statusCode: 200,
            message: "Product deleted successfully",
        });

    } catch (error) {
        res.status(400).send({ msg: "Internal server error" });
    }
}

const getAllProductsWithFilter = async (req, res) => {
    try {
        const { productType, productName, specificationOfProduct, pageNo, startPrice, endPrice } = req.body;

        const filter = {};
        if (productType) { filter.productType = productType };
        if (productName) { filter.productName = productName; }
        if (specificationOfProduct) { filter.specificationOfProduct = specificationOfProduct; }

        if ((startPrice !== undefined && startPrice !== 0) && (endPrice !== undefined && endPrice !== 0)) {
            filter.price = { $gte: startPrice, $lte: endPrice };
        }
        const skip = (pageNo - 1) * 10;
        let filterProducts;
        let totalProductsCount;

        if (Object.keys(filter).length > 0) {

            filterProducts = await Product
                .find(filter)
                .skip(skip)
                .limit(10)
                .sort({ createdAt: -1 });

            totalProductsCount = filterProducts.length;

        } else {
            totalProductsCount = await Product.find().count()
            filterProducts = await Product
                .find()
                .skip(skip)
                .limit(10)
                .sort({ createdAt: -1 });
        }

        const totalPages = Math.ceil(filterProducts.length / 10);

        if (filterProducts.length > 0) {
            res.status(200).send({
                statusCode: 200,
                message: "Get products response successfully",
                totalPages: totalPages,
                totalProductsCount: totalProductsCount,
                data: filterProducts
            });

        } else {

            res.status(200).send({
                statusCode: 200,
                message: "Get products response successfully",
                totalPages: totalPages,
                totalProductsCount: 0,
                data: []
            });
        }


    } catch (error) {
        res.status(400).send({ msg: "Internal server error" });
    }
}

module.exports = { AddProductContact, updateProduct, getAllProducts, getProductDetails, deleteProduct, getProductListSpecificUser, getAllProductsWithFilter }
