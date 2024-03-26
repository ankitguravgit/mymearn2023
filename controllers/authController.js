const User = require('../models/user');
const bcrypt = require('bcrypt');
const generateOTP = require('../helper/generateOtp')
const sendEmail = require('../helper/sendEmail')


//*Register 
const register = async (req, res) => {
    try {
        const {role, firstName, lastName, email, password, contactNo, city, state, country, pinCode, dateOfBirth } = req.body;

        const userExits = await User.findOne({ email });

        if (userExits) {
            return res.status(400).send({ msg: "email already exists" });
        }

        const userCreated = await User.create({ role, firstName, lastName, email, password, contactNo, city, state, country, pinCode, dateOfBirth });

        res.status(200).send({
            statusCode: 200,
            message: "Register user successfully",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        });

    } catch (error) {
        res.status(400).send({ msg: "Internal server error" });
    }
}

//*Login 
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExits = await User.findOne({ email });

        if (!userExits) {
            return res.status(400).send({ msg: "Invalid credentials" });
        }

        // const user = await userExits.comparePassword(password);

        // if (user) {
        res.status(200).send({
            statusCode: 200,
            message: "Login Successful",
            token: await userExits.generateToken(),
            userId: userExits._id.toString(),
            data: {
                role: userExits.role,
                firstName: userExits.firstName,
                lastName: userExits.lastName,
                email: userExits.email,
                contactNo: userExits.contactNo
            }
        });
        // } else {
        //     res.status(400).send({ msg: "Invalid email or password." });
        // }

    } catch (error) {
        res.status(400).send({ msg: "Internal server error" });
    }
}

//*forgot password
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const userExits = await User.findOne({ email });

        if (!userExits) {
            return res.status(400).send({ msg: "User not found" });
        }

        const otp = generateOTP();
        // await User.updateOne({ email }, { otp });
        userExits.setOtp(otp, 1);
        await userExits.save();
        await sendEmail(email, otp);

        return res.status(200).json({ message: 'OTP sent register email.' });

    } catch (error) {
        res.status(400).send({ msg: "Internal server error" });
    }
}

//*Reset password
const resetPassword = async (req, res) => {
    try {
        const { email, otp, password } = req.body;

        const userExits = await User.findOne({ email });

        if (!userExits) {
            return res.status(400).send({ msg: "User not found" });
        }

        if (!userExits.otp || userExits.otp.code !== otp || userExits.otp.expiresAt < new Date()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }
        await User.updateOne({ email }, { password, otp: null });

        return res.status(200).json({ message: 'Password reset successfully.' });

    } catch (error) {
        res.status(400).send({ msg: "Internal server error" });
    }
}

//*Get All Users
const getAllUsers = async (req, res) => {
    try {
        const { pageNo } = req.body;
        const skip = (pageNo - 1) * 10;
        const totalUser = await User.find()
        const data = await User
            .find()
            .skip(skip)
            .limit(10)
            .sort({ createdAt: -1 });

        const totalPages = Math.ceil(totalUser.length / 10);

        res.status(200).send({
            statusCode: 200,
            message: "Get all users response successfully",
            totalPages: totalPages,
            data: data
        });

    } catch (error) {
        res.status(400).send({ msg: "Internal server error" });
    }
}

//*Get User Details
const getUserDetails = async (req, res) => {
    try {
        const data = await User.findById(req.params.id);
        res.status(200).send({
            statusCode: 200,
            message: "Get users details successfully",
            data: data
        });

    } catch (error) {
        res.status(400).send({ msg: "Internal server error" });
    }
}

//*Delete User
const deleteUser = async (req, res) => {
    try {
        const data = await User.findByIdAndDelete(req.params.id)
        res.status(200).send({
            statusCode: 200,
            message: "User deleted successfully",
        });

    } catch (error) {
        res.status(400).send({ msg: "Internal server error" });
    }
}

//*Update Profile
const updateProfile = async (req, res) => {
    try {
        const id = req.body.userId;
        const updatedData = req.body;
        const options = { new: true };

        const result = await User.findByIdAndUpdate(
            id, updatedData, options
        )
        res.status(200).send({
            statusCode: 200,
            message: "User Details update successfully",
        });

    } catch (error) {
        res.status(400).send({ msg: "Internal server error" });
    }
}


module.exports = { register, login, getAllUsers, getUserDetails, deleteUser, updateProfile, forgotPassword, resetPassword }
