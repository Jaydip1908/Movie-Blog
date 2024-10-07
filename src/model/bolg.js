const mongoose=require('mongoose')

const blog_scema=new mongoose.Schema({
    title:{
        type:String,
        require:true,
        midLength:2
    },
    content:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    img:String

})

const Blog=mongoose.model("Blog",blog_scema)

module.exports=Blog