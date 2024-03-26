const Product = require('../models/product');

const stripe = require('stripe')('sk_test_51OdsiHSAV05VJuikgzTG4ErQrxX6Zoq9eCqGQwusXcQutkKctkcqjMaLVeT5qSpSu7fmTJUYX9N1wTxNp0kIfP8600tGrV0z2t');
const endpointSecret = 'whsec_eb6009404190811c81ee32869228cef509b2f05bf5a340a6023f9819eea11156';

const getWebHookDetails = async (req, res) => {

    try {
        let signature = req.headers['stripe-signature'];
        let event = req.body;
        if (endpointSecret) {
            try {
                event = await stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
                switch (event.type) {
                    case 'customer.created':
                        break;
                    case 'customer.subscription.created':
                        break;
                    case 'payment_intent.requires_action':
                        let data12 = event.data;
                         console.log('data------', JSON.stringify(data12))
                        break;
                    case 'customer.updated':
                        break;
                    case 'invoice.payment_failed':
                        break;
                    case 'invoice.payment_action_required':
                        break;
                    case 'payment_intent.created':
                        break;
                    case 'invoice.updated':
                        break;
                    case 'invoice.created':
                        break;
                    case 'invoice.finalized':
                        break;
                    case 'checkout.session.completed':
                        let data = event.data;
                        // console.log('event.type-----', event.type);
                        // console.log('data------', JSON.stringify(data))
                        break;
                    case 'invoice.payment_succeeded':
                        break;
                    case 'invoice.updated':
                        break;
                    case 'payment_method.attached':
                        break;
                    case 'invoice.paid':
                        break;
                    case 'customer.updated':
                        break;
                    case 'customer.subscription.updated':
                        break;
                    case 'payment_intent.succeeded':
                        console.log('PaymentIntent succeeded:-----');
                        break;
                    case 'charge.succeeded':
                        break;
                    default:
                        console.log(`Unhandled event type ${event.type}.`);
                }
            } catch (err) {
                // console.log("err---------", err);
                return res.status(400).send('Webhook error');
            }
        }

    } catch (error) {
        // console.log('error----', error)
        res.status(400).send({ msg: "Internal server error" });
    }
}


module.exports = {
    getWebHookDetails
}
