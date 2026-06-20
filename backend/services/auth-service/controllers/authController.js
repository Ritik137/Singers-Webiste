const jwt = require("jsonwebtoken");
const User = require("../models/User");
const OTP = require("../models/OTP");

const Session = require("../models/Session");

const generateRefreshToken = require("../utils/generateRefereshToken.js");
const bcrypt = require("bcryptjs");

const generateOTP = require("../utils/generateOTP");
const generateToken = require("../utils/generateToken");

const sendOTPEmail = require("../services/emailServices.js");


// ================= SEND OTP =================

exports.sendOTP = async (req, res) => {

    try {

        const { name, email, phone, password } = req.body;

        if (!name || !email || !phone || !password) {
            return res.status(400).json({
                msg: "All fields are required"
            });

        }
        const exists = await User.findOne({
            $or: [
                { email },
                { phone }
            ]
        });

        if (exists) {
            return res.status(400).json({
                msg: "User already exists"
            });
        }

        const otp = generateOTP();

        await OTP.deleteMany({ email });

        await OTP.create({
            email,
            otp,
            expiresAt: new Date(
                Date.now() + 5 * 60 * 1000
            )
        });

        await sendOTPEmail(email, otp);

        res.status(200).json({
            msg: "OTP sent successfully"
        });

    }
    catch (err) {

        res.status(500).json({
            msg: err.message
        });

    }

};


// ================= VERIFY OTP =================

exports.verifyOTP = async (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            password,
            otp
        } = req.body;

        const otpData = await OTP.findOne({
            email,
            otp: otp.toString()
        });

        if (!otpData) {

            return res.status(400).json({
                msg: "Invalid OTP"
            });

        }

        if (otpData.expiresAt < Date.now()) {

            return res.status(400).json({
                msg: "OTP expired"
            });

        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const existingUser = await User.findOne({
            $or: [
                { email },
                { phone }
            ]
        });

        if (existingUser) {
            return res.status(400).json({
                msg: "User already exists"
            });
        }

        if (password.length < 6) {

            return res.status(400).json({
                msg: "Password must be at least 6 characters"
            });

        }

        const user = await User.create({

            name,
            email,
            phone,
            password: hashedPassword,
            isVerified: true

        });

        await OTP.deleteMany({ email });

        const token = generateToken(user);

        const refreshToken =
            generateRefreshToken(user);

        await Session.create({

            userId: user._id,

            refreshToken

        });

        res.status(201).json({

            success: true,

            msg: "Registration successful",

            token,

            refreshToken,

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                phone: user.phone,

                role: user.role

            }

        });
    } catch (err) {

        res.status(500).json({
            msg: err.message
        });

    }

};


// ================= LOGIN =================

exports.login = async (req, res) => {

    try {

        const {
            identifier,
            password
        } = req.body;

        const user = await User.findOne({

            $or: [

                { email: identifier },

                { phone: identifier }

            ]

        });

        if (!user) {

            return res.status(400).json({
                msg: "Invalid credentials"
            });

        }
        if (!user.isVerified) {

            return res.status(400).json({
                msg: "Please verify your account first"
            });

        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {

            return res.status(400).json({
                msg: "Invalid credentials"
            });

        }

        const token = generateToken(user);

        const refreshToken =
            generateRefreshToken(user);

        await Session.create({

            userId: user._id,

            refreshToken

        });
        res.status(200).json({

            success: true,

            msg: "Login successful",

            token,

            refreshToken,

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                phone: user.phone,

                role: user.role

            }

        });
    } catch (err) {

        res.status(500).json({
            msg: err.message
        });

    }

};


// ================= FORGOT PASSWORD =================

exports.forgotPassword = async (req, res) => {

    try {

        const { email } = req.body;

        const user = await User.findOne({
            email
        });

        if (!user) {

            return res.status(404).json({
                msg: "User not found"
            });

        }

        const otp = generateOTP();

        await OTP.deleteMany({ email });

        await OTP.create({

            email,

            otp,

            expiresAt: new Date(
                Date.now() + 5 * 60 * 1000
            )

        });

        await sendOTPEmail(email, otp);

        res.json({
            msg: "OTP sent successfully"
        });

    }

    catch (err) {

        res.status(500).json({
            msg: err.message
        });

    }

};


// ================= RESET PASSWORD =================

exports.resetPassword = async (req, res) => {

    try {

        const {
            email,
            otp,
            newPassword
        } = req.body;

        const otpData = await OTP.findOne({
            email,
            otp
        });

        if (!otpData) {

            return res.status(400).json({
                msg: "Invalid OTP"
            });

        }

        if (otpData.expiresAt < Date.now()) {

            return res.status(400).json({
                msg: "OTP expired"
            });

        }

        const hashedPassword =
            await bcrypt.hash(
                newPassword,
                10
            );

        await User.findOneAndUpdate(

            { email },

            {
                password: hashedPassword
            }

        );

        await OTP.deleteMany({
            email
        });

        res.json({
            msg: "Password updated successfully"
        });

    }

    catch (err) {

        res.status(500).json({
            msg: err.message
        });

    }

};

// GET profile..
exports.getProfile = async (req, res) => {

    try {

        const user = await User.findById(
            req.user.id
        ).select("-password");

        res.json(user);

    } catch (err) {

        res.status(500).json({
            msg: err.message
        });

    }

};

// update profile 
exports.updateProfile = async (req, res) => {

    try {

        const { name, phone } = req.body;

        const phoneExists = await User.findOne({
            phone,
            _id: { $ne: req.user.id }
        });

        if (phoneExists) {

            return res.status(400).json({
                msg: "Phone number already in use"
            });

        }
        const user = await User.findByIdAndUpdate(

            req.user.id,

            {
                name,
                phone
            },

            {
                new: true
            }

        ).select("-password");

        res.json(user);

    }

    catch (err) {

        res.status(500).json({
            msg: err.message
        });

    }

};


exports.changePassword = async (req, res) => {

    try {

        const {
            oldPassword,
            newPassword
        } = req.body;

        const user = await User.findById(
            req.user.id
        );

        const isMatch = await bcrypt.compare(
            oldPassword,
            user.password
        );

        if (!isMatch) {

            return res.status(400).json({
                msg: "Old password incorrect"
            });

        }

        if (oldPassword === newPassword) {

            return res.status(400).json({
                msg: "New password cannot be same as old password"
            });

        }

        user.password = await bcrypt.hash(
            newPassword,
            10
        );

        await user.save();

        res.json({
            msg: "Password changed successfully"
        });

    }

    catch (err) {

        res.status(500).json({
            msg: err.message
        });

    }

};

exports.deleteAccount = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({
                msg: "User not found"
            });

        }

        await User.findByIdAndDelete(req.user.id);

        await OTP.deleteMany({
            email: user.email
        });

        res.json({
            msg: "Account deleted successfully"
        });

    }

    catch (err) {

        res.status(500).json({
            msg: err.message
        });

    }

};

exports.refreshToken = async (req, res) => {

    try {

        const { refreshToken } = req.body;

        if (!refreshToken) {

            return res.status(401).json({
                msg: "No refresh token"
            });

        }

        const session =
            await Session.findOne({
                refreshToken
            });

        if (!session) {

            return res.status(401).json({
                msg: "Invalid session"
            });

        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_SECRET
        );

        const user =
            await User.findById(
                decoded.id
            );
        if (!user) {

            return res.status(404).json({
                msg: "User not found"
            });

        }

        const accessToken =
            generateToken(user);

        res.json({

            token: accessToken

        });

    }
    catch (err) {

        res.status(401).json({
            msg: "Invalid refresh token"
        });

    }

};


exports.logout = async (
    req,
    res
) => {

    try {

        const { refreshToken } = req.body;

        const session = await Session.findOne({
            refreshToken
        });

        if (!session) {

            return res.status(404).json({
                msg: "Session not found"
            });

        }

        await Session.deleteOne({
            refreshToken
        });

        res.json({
            msg: "Logged out successfully"
        });

    }
    catch (err) {

        res.status(500).json({
            msg: err.message
        });

    }


};


exports.uploadProfilePicture = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user.id, { profilePic: req.file.path },

            {
                new: true
            }

        );

        res.json(user);

    }catch (err) {

        res.status(500).json({

            msg:
                err.message

        });

    }

};