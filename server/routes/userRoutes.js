

const express = require('express');
const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');

const userRoutes = express.Router();

userRoutes.post('/register', async(req, res) => {
    console.log("register");
    try {
        const user = await User.findOne({email: req.body.email});
        
        if(user) {
            return res.send({success: false, message: "User already registered, please login"});
        }
    
        const newUser = new User(req.body);
        await newUser.save();
        res.send({success: true, messgage: "User has been registered successfully"});
    }catch(err) {
        res.send({success: false, message: 'An error occurred, please try again later'});
    }
});
userRoutes.post('/login', async (req,res) => {
    console.log(req.body);
    try {
        const user = await User.findOne({email: req.body.email});

        if(!user) {
            return res.send({success: false, message: "user doesn't exists, please register before login"});
        }

        if(user.password !== req.body.password) {
            return res.send({success: false, message: "password is incorrect"});
        }
        const token = jwt.sign({userId: user._id}, process.env.jwt_secret, {expiresIn: process.env.expires});
        res.send({success: true, message: "User logged in successfully", data: token});
    }catch(error) {
        res.send({success: false, message: "An error occurred, please try again later"});
    } 
});

userRoutes.get('/get-current-user', authMiddleware, async (req,res) => {
    console.log(req.body.userId);
    try {
        const user = await User.findById(req.body.user).select('-password');
        res.send({success: true, message: "user authenticated!", data: user});
    }catch(err) {
        res.send({success: false, message: err.message});
    } 
});

module.exports = userRoutes;