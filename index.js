require("dotenv").config();
const express = require('express');
const app = express();
var cors = require('cors');
const connectDb = require('./utils/db');
var session = require('express-session')
const bodyParser = require('body-parser');
const path = require("path");
const jwt = require('jsonwebtoken');
const passport = require('passport');
const ejs = require('ejs');
// const { job1, job2 } = require('./helper/cronJobs');

//*____________________Web Hook___________//
const paymentWebHookRoute = require('./router/paymentWebhookRouter');
app.use("/api/payment/", paymentWebHookRoute);
//*____________________Web Hook___________//


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: process.env.JWT_SECRET_KEY, }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

// Set the view engine to EJS
app.set('view engine', 'ejs');

const router = require('./router/authRouter');
const contactRouter = require('./router/contactRouter');
const productRouter = require('./router/productRouter');
const placeOrderRouter = require('./router/placeOrderRouter');
const studentRouter = require('./router/studentRouter');
const adminRoute = require('./router/adminRouter');
const paymentRoute = require('./router/paymentRouter');
const messageRoute = require('./router/messageRouter');
const profilePictureRoute = require('./router/profilePictureRouter')


app.use("/api/auth", router);
app.use("/api/contact", contactRouter);
app.use("/api/product", productRouter);
app.use("/api/order", placeOrderRouter);
app.use("/api/student", studentRouter);
app.use("/api/payment", paymentRoute);
app.use("/api/message", messageRoute);
app.use("/api/profile", profilePictureRoute);
app.use("/admin", adminRoute);
app.use(express.static('public'));


// Serve static files, including uploaded images
app.use('/', express.static(path.join(__dirname, '/uploads')));
app.use('/', express.static(path.join(__dirname, '/profilePictures')));
// job1.start();
// job2.start();

const PORT = 3001;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log('server is running at port: ' + PORT);
    })
})
