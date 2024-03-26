const Product = require('../models/product');
const stripePaymentMethod = require('../helper/stripe.payment.js')
const stripe = require('stripe')('sk_test_51OdsiHSAV05VJuikgzTG4ErQrxX6Zoq9eCqGQwusXcQutkKctkcqjMaLVeT5qSpSu7fmTJUYX9N1wTxNp0kIfP8600tGrV0z2t');
const endpointSecret = 'whsec_eb6009404190811c81ee32869228cef509b2f05bf5a340a6023f9819eea11156';

//*Checkout Payment 

//INDIAN CUR
const checkOutPayment = async (req, res) => {

    try {
        const { paymentArray } = req.body;

        console.log('paymentArray----', paymentArray)

        if (paymentArray !== undefined) {

            const lineItems = paymentArray.map((product) => (
                console.log('product----', product),
                {
                    price_data: {
                        // currency: 'usd',
                        // currency: 'INR',
                        currency: 'USD',
                        product_data: {
                            name: product.name
                        },
                        unit_amount: product.price * 100
                    },
                    quantity: product.quantity
                }))

            let session = await stripePaymentMethod.makePayment(lineItems);

            res.status(200).send({
                statusCode: 200,
                // message: "Student Add successfully",
                id: session.url,
            });

        } else {
            res.status(400).send({
                message: "Pls provide Products",
            });
        }

    } catch (error) {
        console.log('error----', error)
        res.status(400).send({ msg: "Internal server error" });
    }
}

const checkOutPaymentWithSetup = async (req, res) => {

    try {
        const session = await stripe.checkout.sessions.create({
            customer: 'cus_PYSfmL5asDUnTQ',
            // amount: 1000,
            // customer_creation: "always",
            billing_address_collection: "required",
            mode: 'setup',
            payment_method_types: ['card'],
            currency: 'usd',
            success_url: `http://localhost:3001/success`,
            cancel_url: `http://localhost:3001/canceled`,
        });

        res.status(200).send({
            statusCode: 200,
            // message: "Student Add successfully",
            id: session.url,
        });

    } catch (error) {
        console.log('error----', error)
        res.status(400).send({ msg: "Internal server error" });
    }
}

const retrievePaymentWithSetup = async (req, res) => {

    try {
        const session = await stripe.checkout.sessions.retrieve(
            'cs_test_c1Cgbs1TvqB6IXd6RsKfV5KqVIEx68EMqdONSFXrzUkMQdaOvim6iUd2Gj'
        );

        res.status(200).send({
            statusCode: 200,
            // message: "Student Add successfully",
            session: session,
        });

    } catch (error) {
        console.log('error----', error)
        res.status(400).send({ msg: "Internal server error" });
    }
}

const checkOutPaymentIntent = async (req, res) => {

    try {

        const paymentIntent = await stripe.paymentIntents.create({
            amount: 2000,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.status(200).send({
            statusCode: 200,
            // message: "Student Add successfully",
            id: paymentIntent,
        });


    } catch (error) {
        console.log('error----', error)
        res.status(400).send({ msg: "Internal server error" });
    }
}

const updatePaymentIntent = async (req, res) => {

    try {

        const paymentIntent = await stripe.paymentIntents.create({
            amount: 2000,
            currency: 'usd',
        });

        res.status(200).send({
            statusCode: 200,
            // message: "Student Add successfully",
            id: paymentIntent,
        });


    } catch (error) {
        console.log('error----', error)
        res.status(400).send({ msg: "Internal server error" });
    }
}

const getAllPaymentIntent = async (req, res) => {

    try {
        const paymentIntents = await stripe.paymentIntents.list({
            // limit: 3,
        });

        res.status(200).send({
            statusCode: 200,
            // message: "Student Add successfully",
            data: paymentIntents,
        });

    } catch (error) {
        console.log('error----', error)
        res.status(400).send({ msg: "Internal server error" });
    }
}

const confirmPaymentIntent = async (req, res) => {

    const { paymentIntentId } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.confirm(
            paymentIntentId,
            {
                payment_method: 'pm_card_visa',
                return_url: 'https://www.example.com',
            }
        );

        res.status(200).send({
            statusCode: 200,
            // message: "Student Add successfully",
            data: paymentIntent,
        });

    } catch (error) {
        console.log('error----', error)
        res.status(400).send({ msg: "Internal server error" });
    }
}

const refundsPayment = async (req, res) => {

    try {
        const { refundsAmount, paymentIntentId } = req.body;

        const refund = await stripe.refunds.create({
            payment_intent: paymentIntentId,
            amount: refundsAmount,
        });

        res.status(200).send({
            statusCode: 200,
            // message: "Student Add successfully",
            refundData: refund,
        });

    } catch (error) {
        console.log('error----', error)
        res.status(400).send({ msg: "Internal server error" });
    }
}

const cancelRefundsPayment = async (req, res) => {

    try {
        const { refundId } = req.body;
        console.log('refundId----', refundId)
        const refund = await stripe.refunds.cancel('re_3OeE9CSAV05VJuik19Lm21Le');
        console.log('refund----', refund)
        // res.status(200).send({
        //     statusCode: 200,
        //     // message: "Student Add successfully",
        //     cancelRefundsData: refund,
        // });

    } catch (error) {
        console.log('error----', error)
        res.status(400).send({ msg: "Internal server error" });
    }
}

const getAllRefundsPayment = async (req, res) => {

    try {
        const charges = await stripe.refunds.list({
            // limit: 3,
        });
        res.status(200).send({
            statusCode: 200,
            // message: "Student Add successfully",
            RefundsData: charges,
        });

    } catch (error) {
        console.log('error----', error)
        res.status(400).send({ msg: "Internal server error" });
    }
}

//subscription

const createProduct = async (req, res) => {

    try {
        const { productName } = req.body;

        const product = await stripe.products.create({
            name: productName,
        });

        res.status(200).send({
            statusCode: 200,
            // message: "Student Add successfully",
            data: product,
        });

    } catch (error) {
        console.log('error----', error)
        res.status(400).send({ msg: "Internal server error" });
    }
}

const getAllProducts = async (req, res) => {

    try {
        const products = await stripe.products.list({
            // limit: 3,
        });
        res.status(200).send({
            statusCode: 200,
            message: "Get All Products.",
            data: products,
        });

    } catch (error) {
        console.log('error----', error)
        res.status(400).send({ msg: "Internal server error" });
    }
}


const createMonthlyPrice = async (req, res) => {

    try {
        const { productId, price } = req.body;

        const priceDetails = await stripe.prices.create({
            product: productId,
            unit_amount: price,
            currency: 'usd',
            recurring: {
                interval: 'month',
            },
        });

        res.status(200).send({
            statusCode: 200,
            // message: "Student Add successfully",
            data: priceDetails,
        });

    } catch (error) {
        console.log('error----', error)
        res.status(400).send({ msg: "Internal server error" });
    }
}

const createYearlyPrice = async (req, res) => {

    try {
        const { productId, price } = req.body;

        const priceDetails = await stripe.prices.create({
            product: productId,
            unit_amount: price,
            currency: 'usd',
            recurring: {
                interval: 'year',
            },
        });

        res.status(200).send({
            statusCode: 200,
            // message: "Student Add successfully",
            data: priceDetails,
        });

    } catch (error) {
        console.log('error----', error)
        res.status(400).send({ msg: "Internal server error" });
    }
}

const getAllPriceList = async (req, res) => {

    try {
        const prices = await stripe.prices.list({
            // limit: 3,
        });

        res.status(200).send({
            statusCode: 200,
            message: "Get All Prices.",
            data: prices,
        });

    } catch (error) {
        console.log('error----', error)
        res.status(400).send({ msg: "Internal server error" });
    }
}

const createCustomer = async (req, res) => {

    try {
        const { name, email } = req.body;

        const customer = await stripe.customers.create({
            name: name,
            email: email,
        });

        res.status(200).send({
            statusCode: 200,
            // message: "Student Add successfully",
            data: customer,
        });

    } catch (error) {
        console.log('error----', error)
        res.status(400).send({ msg: "Internal server error" });
    }
}

const getCustomerList = async (req, res) => {

    try {

        const customers = await stripe.customers.list({
            //limit: 3,
        });

        res.status(200).send({
            statusCode: 200,
            message: "Get All Customers.",
            data: customers,
        });

    } catch (error) {
        console.log('error----', error)
        res.status(400).send({ msg: "Internal server error" });
    }
}

const getsubscriptionList = async (req, res) => {

    try {

        const customers = await stripe.subscriptions.list({
            //limit: 3,
        });

        res.status(200).send({
            statusCode: 200,
            message: "Get All Customers.",
            data: customers,
        });

    } catch (error) {
        console.log('error----', error)
        res.status(400).send({ msg: "Internal server error" });
    }
}

const monthlySubscription = async (req, res) => {

    try {
        const { priceId } = req.body;

        // const subscription = await stripe.subscriptions.create({
        //     customer: customerId,
        //     items: [
        //         {
        //             price: priceId,
        //         },
        //     ],
        // });

        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            payment_method_types: ['card'],
            success_url: `http://localhost:3001/success`,
            cancel_url: `http://localhost:3001/canceled`,
        });

        if (session) {
            res.status(200).send({
                statusCode: 200,
                message: "Get subscription successfully",
                sessionURl: session.url,
                // data: subscription
            });
        }

    } catch (error) {
        console.log('error----', error)
        res.status(400).send({ msg: "Internal server error" });
    }
}


module.exports = {
    checkOutPayment, refundsPayment, cancelRefundsPayment, getAllRefundsPayment, checkOutPaymentIntent, monthlySubscription,
    createProduct, createMonthlyPrice, createYearlyPrice, createCustomer, monthlySubscription, getAllProducts, getAllPriceList,
    getCustomerList, getsubscriptionList, checkOutPaymentWithSetup, updatePaymentIntent, getAllPaymentIntent, confirmPaymentIntent,
    retrievePaymentWithSetup
}
