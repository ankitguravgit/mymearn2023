const nodemailer = require('nodemailer')

const sendEmail = async (email, otp) => {

    // console.log('email----', email)
    // console.log('otp----', otp)

    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'craig.pagac33@ethereal.email',
            pass: 'jJzr22ksjtBwSkrZ1y'
        }
    });

    const mailOptions = {
        from: 'craig.pagac33@ethereal.email',
        to: email,
        subject: 'Password reset OTP',
        text: `Your OTP (It is expired after 1 min) : ${otp}`,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;