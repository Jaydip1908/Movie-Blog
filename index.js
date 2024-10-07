const express=require("express")
const mongoose=require("mongoose")
const {userRoute}=require("./src/router/user")
const {usermovie}=require("./src/router/movie")
const session = require('express-session')
const blogRoute=require('./src/router/blog')

const app=express()
app.use(express.json());
app.use('/src/images', express.static("src/images")) // to give access to static files
app.use(session({
    secret: '4485485sadsgvdcgv',
    resave: false,
    saveUninitialized: true
  }))


app.use("/movie",userRoute)
app.use("/user",usermovie)
app.use('/blog',blogRoute)
// app.post("/upload_img",upload.single("photo"),(req,res)=>{
//     res.json({
//       msg:'img upload succesfully'
//     })
// })
app.listen(8000,()=>{
    mongoose.connect("mongodb://localhost:27017/user_db")
    console.log("Server start")
    console.log("DB is connect")
    
})


