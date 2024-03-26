const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({

    role: {
        required: true,
        type: String,
        enum: ['admin', 'user'],
        default: 'admin'
    },
    firstName: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,

    },
    password: {
        required: true,
        type: String,
    },
    contactNo: {
        required: true,
        type: String
    },
    city: {
        required: true,
        type: String
    },
    state: {
        required: true,
        type: String
    },
    country: {
        required: true,
        type: String
    },
    pinCode: {
        required: true,
        type: Number
    },
    dateOfBirth: {
        required: true,
        type: String
    },
    otp: {
        code: { type: Number },
        expiresAt: { type: Date }
    },
    createdAt: { type: Date, default: Date.now }
})

//? Secure the password with bcrypt
UserSchema.pre("save", async function (next) {

    const user = this;

    if (!user.isModified("password")) {
        next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
    } catch (error) {
        next(error);
    }
})

//json web token
UserSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                role: this.role,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "30d"
            }
        )

    } catch (error) {
        console.error(error)
    }
}

//compare the password
UserSchema.methods.comparePassword = async function (password) {
    var value1 = await bcrypt.compare(String(password), String(this.password));
    return value1
}

//otp expire
UserSchema.methods.setOtp = function (code, expirationMinutes) {
    this.otp = {
        code: code,
        expiresAt: new Date(Date.now() + expirationMinutes * 60000) // Convert minutes to milliseconds
    };
};


const User = new mongoose.model('User', UserSchema);
module.exports = User;