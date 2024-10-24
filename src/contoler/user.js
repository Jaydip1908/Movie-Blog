const User = require("../model/user");
const bcrypt = require('bcrypt')
const { sentOTP } = require('../config/emailConfig');
const {sessionAuth} = require('../middleware/sessionAuth');
const jwt=require('jsonwebtoken')
// const session = require("express-session");

let otpStore = {}

const loginuser = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username })
    // console.log(user);


    if (user) {
        if (bcrypt.compareSync(password, user.password)) {
            // console.log(user.password);

            const userData = {
                id: user._id,
                username:user.username,
                email:user.email
            };
            // console.log(req.session.user)
            const token= jwt.sign(userData,process.env.JWTSECRET_KEY  ||  'mysecretkey',{expiresIn:"1h"});


            res.status(200).json({
                msg: "User Logeed In Successfully",
                token:token,
            })
        } else {
            res.status(401).json({
                msg: "User Password Inccorrect"
            });
        }

    } else {
        res.status(404).json({
            msg: "User Dose Not Exit"
        })
    }
}

const logoutuser = (req, res) => {
    req.session.destroy(function (err) {
        console.log("session destroy")
        console.error(err)
    })

    res.status(200).send({
        msg: "user is logged out succesfully"
    })
}
const registeruser = async (req, res) => {
    const { username, password, email, otp } = req.body;

    if (!otpStore[email] || otpStore[email]["otp"] !== otp || (Date.now() - otpStore[email]["time"] >= 60000)) {
        return res.json({
            msg: "Email verification failed"
        });
    }
    delete otpStore[email]
    console.log(otpStore)

    const users = await User.findOne({ username: username });

    if (users) {
        return res.status(409).json({
            msg: "User Alrady Registered",
        });
    }
    const salt = bcrypt.genSaltSync(10);
    const bPassword = await bcrypt.hashSync(password, salt);
    await User.create({
        username: username,
        password: bPassword,
        // age:age,
        email: email

    })
    console.log(password);


    // console.log(bcryptPassword)
    // await User.create({ username: username, password: bPassword, email: email })
    res.status(201).json({
        msg: "User is Registered"
    });
}
const OTPVerify = async (req, res) => {
    const { email } = req.body

    console.log(email)
    const to = email
    const subject = "OTP from Admin"
    const OTP = Math.round(Math.random() * 10000 - 1)

    otpStore[email] = {
        otp: OTP,
        time: Date.now()
    }
    console.log(otpStore)
    const html = `
      <p>OTP expire in 2 min</p>
      <h1>OTP:${OTP}</h1>
      <p>Thank you</p>`

    await sentOTP(to, subject, html)

    res.json({
        msg: "Email sent"
    })

}

module.exports = { loginuser, logoutuser, registeruser, OTPVerify };