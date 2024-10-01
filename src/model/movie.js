const mongoose=require("mongoose")

const movie = new mongoose.Schema({
    fullname:{
        type:String,
        require:true,
        uniqe:true
    } ,
    language:{
        type:Number,
        type:String
    } ,
    size:{
       type: String
    },
    quality:{
        type: Number,
        type:String
    },
    source:{
        type:String
    },
    formate:{
        type: String
    },
    subtitele:{
        type:String
    }


})
const Movie = mongoose.model("Movie", movie)

module.exports={Movie}