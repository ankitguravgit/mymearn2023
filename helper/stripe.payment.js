const stripe = require('stripe')('sk_test_51OdsiHSAV05VJuikgzTG4ErQrxX6Zoq9eCqGQwusXcQutkKctkcqjMaLVeT5qSpSu7fmTJUYX9N1wTxNp0kIfP8600tGrV0z2t');
const endpointSecret = 'whsec_eb6009404190811c81ee32869228cef509b2f05bf5a340a6023f9819eea11156';

const makePayment = async (products) => {

    const lineItems = products.map(product => {
        return {
            price_data: {
                currency: product.currency,
                product_data: {
                    name: product.name,
                },
                unit_amount: product.unit_amount, // amount in cents
            },
            quantity: product.quantity,
        };
    });

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: lineItems,
        success_url: `http://localhost:3001/success`,
        cancel_url: `http://localhost:3001/canceled`,
    });

    return session
}

const createCharge = async (amount, currency, customerId) => {

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: currency,
        customer: customerId,
        // payment_method_types: ['card'],
        confirm: true,
        off_session: true,
        automatic_payment_methods: {
            enabled: true,
        },

    });
    return paymentIntent;

}

// Function to attach a payment method to a Payment Intent
async function attachPaymentMethod(paymentIntentId, paymentMethodId) {
    const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
        payment_method: paymentMethodId,
    });
    return paymentIntent;
}

// Function to confirm a Payment Intent
async function confirmPaymentIntent(paymentIntentId) {
    const paymentIntent = await stripe.paymentIntents.confirm(
        paymentIntentId,
        {
            payment_method: 'pm_card_visa',
            // return_url: 'https://www.example.com',
        }
    );
    return paymentIntent;
}

const refundAmount = () => {
}

const autoDeductPayment = async () => {

    const products = [
        {
            name: 'Product 1',
            currency: 'usd',
            unit_amount: 1000,
            quantity: 1,
        },
        {
            name: 'Product 2',
            currency: 'usd',
            unit_amount: 2000,
            quantity: 2,
        }
    ];

    // Create a Setup Session with the list of products
    const session = await makePayment(products);
    // console.log('session-----', JSON.stringify(session));
    const sessionId = session.id;

    // Retrieve session details to calculate the amount
    const retrievedSession = await stripe.checkout.sessions.retrieve(sessionId);
    // console.log('retrievedSession-----', JSON.stringify(retrievedSession));

    // Calculate the total amount from the line items
    const amount = retrievedSession.amount_total;
    const currency = retrievedSession.currency;
    // console.log('amount-----', amount);
    // console.log('currency-----', currency);


    // // Create a Payment Intent
    const paymentIntent = await createCharge(amount, currency, "cus_PYSfmL5asDUnTQ");
    // console.log('paymentIntent-----', JSON.stringify(paymentIntent));
    // console.log('Payment Intent created:', paymentIntent.id);
    const confirmedPaymentIntent = await confirmPaymentIntent(paymentIntent.id);
}


module.exports = { makePayment, createCharge, refundAmount, autoDeductPayment };