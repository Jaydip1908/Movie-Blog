const express = require('express');
const {loginuser,logoutuser,registeruser,OTPVerify}=require("../contoler/user");


const userRoute = express.Router();

userRoute.post('/login',loginuser);
userRoute.get('/logout', logoutuser);
userRoute.post('/register', registeruser);
userRoute.get('/register/otp',OTPVerify);



module.exports={userRoute}; 