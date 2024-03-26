// const cron = require('node-cron');
// const stripe = require('stripe')('sk_test_51OdsiHSAV05VJuikgzTG4ErQrxX6Zoq9eCqGQwusXcQutkKctkcqjMaLVeT5qSpSu7fmTJUYX9N1wTxNp0kIfP8600tGrV0z2t');
// const endpointSecret = 'whsec_eb6009404190811c81ee32869228cef509b2f05bf5a340a6023f9819eea11156';
// const stripePaymentMethod = require('../helper/stripe.payment.js')

// // Schedule a task to run every minute
// const job1 = cron.schedule('* * * * *', ( ) => {
//     console.log('Job 1: This task will run every minute');
//     stripePaymentMethod.autoDeductPayment();

// });

// const job2 = cron.schedule('0 0 * * *', () => {
//     console.log('Job 2: This task will run at midnight every day');
// });

// module.exports = { job1, job2 };
