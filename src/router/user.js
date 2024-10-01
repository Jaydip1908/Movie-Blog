const express = require('express');
const {loginuser,logoutuser,registeruser}=require("../contoler/user")

const userRoute = express.Router();

userRoute.post('/login', loginuser);
userRoute.get('/logout', logoutuser);
userRoute.post('/register', registeruser);


module.exports={userRoute};