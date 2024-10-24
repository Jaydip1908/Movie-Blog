const express = require("express");
const {getData,getSingleData,createData,upadateData,deleteData}=require("../contoler/movie")
const {sessionAuth}=require("../middleware/sessionAuth")


const usermovie=express.Router();

usermovie.get("/get_data",sessionAuth, getData)

usermovie.get("/get_data/:index",getSingleData)

usermovie.post("/add_data",createData)

usermovie.put("/update_item/:index",upadateData)

usermovie.delete("/delete_item/:index",deleteData)

module.exports={usermovie}
