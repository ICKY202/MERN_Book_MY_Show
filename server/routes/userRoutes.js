

const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');
const EmailHelper = require('../utils/EmailHelper');

const userRoutes = express.Router();

userRoutes.post('/register', async(req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        
        if(user) {
            return res.send({success: false, message: "User already registered, please login"});
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        req.body.password = hashedPassword;
        const newUser = new User(req.body);
        await newUser.save();
        res.send({success: true, messgage: "User has been registered successfully"});
    }catch(err) {
        res.send({success: false, message: 'An error occurred, please try again later'});
    }
});
userRoutes.post('/login', async (req,res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        console.log(user);
        if(!user) {
            return res.status(401).send({success: false, message: "user doesn't exists, please register before login"});
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch) {
            return res.status(400).send({success: false, message: "password is incorrect"});
        }
        const token = jwt.sign({userId: user._id}, process.env.jwt_secret, {expiresIn: process.env.expires});
        res.send({success: true, message: "User logged in successfully", data: token});
    }catch(error) {
        res.status(501).send({success: false, message: "An error occurred, please try again later"});
    } 
});

userRoutes.get('/get-current-user', authMiddleware, async (req,res) => {
    try {
        const user = await User.findById(req.body.user).select('-password');
        res.send({success: true, message: "user authenticated!", data: user});
    }catch(err) {
        res.send({success: false, message: err.message});
    } 
});
const otpGenerator = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
}
userRoutes.patch('/forgot-password', async (req, res) => {
    try {   
        const {email} = req.body;
        if(!email) {
            return res.send({success: false, message: "Please enter your email"});
        }
        const user = await User.findOne({email: email});
        if(!user) {
            return res.send({success: false, message: "user doesn't exists"});
        }

        const otp = otpGenerator();
        user.otp = otp;
        user.otpExpires = Date.now() + 300 * 1000; // 5 minutes
        await user.save();
        res.send({success: true, message: "OTP has been sent to your email", data: otp});

        await EmailHelper('otp.html', user.email, {name: user.name, otp: otp}, "reset password");
    }catch(err) {
        res.send({success: false, message: err.message});
    }   
});

userRoutes.patch('/reset-password', async (req, res) => {
    try {
        const {password, otp} = req.body;
        if(!password || !otp) {
            return res.send({success: false, message: "Please enter your password and otp"});
        }
        const user = await User.findOne({otp: otp});
        if(!user) {
            return res.send({success: false, message: "Invalid OTP"});
        }
        if(user.otpExpires < Date.now()) {
            return res.send({success: false, message: "OTP has been expired"});
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        user.password = hashedPassword;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();
        res.send({success: true, message: "Password has been changed successfully"});
    }catch(err) {
        res.send({success: false, message: err.message});
    }
}); 
module.exports = userRoutes;