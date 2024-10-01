const express=require("express")
const mongoose=require("mongoose")
const {userRoute}=require("./src/router/user")
const {usermovie}=require("./src/router/movie")

const app=express()
app.use(express.json())

app.use("/user",userRoute)

app.use("/movie",usermovie)


app.listen(8000,()=>{
    mongoose.connect("mongodb://localhost:27017/user_db")
    console.log("Server start")
    console.log("DB is connect")
    
})

