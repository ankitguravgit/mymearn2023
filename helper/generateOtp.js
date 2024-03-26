const otpGenerator = require('otp-generator')

const GenerateOTP = (req, res, next) => {
    return otpGenerator.generate(4, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
};

module.exports = GenerateOTP;