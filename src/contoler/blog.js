const Blog = require('../model/bolg'); // Fixed typo: 'bolg' to 'blog'
const fs = require('fs');
const path = require('path');
// const { populate } = require('../model/user');
const mongoose = require('mongoose');
const { populate } = require('../model/user');
const User = require('../model/user');
// const {tokenAuth}=require('../middleware/sessionAuth')



const createBlog=async(req,res)=>{
        const {title,content}=req.body;
        const user_id=req.user["id"]

        // console.log(title)
        // console.log(content)
        // console.log(user_id)
        // console.log(req.file.filename)
        

        let filename;
        if(req.file){
            filename=req.file.filename
        }
        else{
            filename=null
        }

        await Blog.create({title:title,content:content,user:user_id,img:filename})

        res.status(201).json({
            msg:"blog crete succesfully"
        })
}

const getBlog=async(req,res)=>{

    const page = Number(req.query["page"]) || 1;
    const dataLimit = Number(req.query["limit"]) || 2;
    const skipCount = (page - 1) * dataLimit;
    const totalData = await Blog.countDocuments()
    const totalPages = Math.ceil(totalData / dataLimit)
    try{
    let allData=await Blog.find().skip(skipCount).limit(dataLimit).populate("user");
    res.send(allData,);
    req.json({
        page: page,
        limit: dataLimit,
        total: totalData,
        // movies: movies,
        totalPages: totalPages
    })
    }catch(error){
    }
    console.log(getBlog)
}

// const getsingleBlog=async(req,res)=>{
//     try{
//         let id=req.params.id;
//         let data=await Blog.findById(id)
//         res.send(data);
//     }catch(error){
//         res.send(error.message);
//     }
// }
const getsingleBlog = async (req, res) => {
    const id = req.params.blogId.replace(':', '');
    // console.log(id);
    const data = await Blog.findOne({ _id: id }).populate('user');
    // populate('User')
    if (!data) {
        res.status(404).send({
            msg: "user not found"
        })
    } else {
        res.send(data);
    }
}


const updateBlog=async(req,res)=>{
    // const blogId =req.params["blogId"];
    const blogId = req.params.blogId.replace(':', ''); // Remove colon if present

    const {title,content}=req.body;
    const user_id=req.session.user["id"];

    const blog=await Blog.findOne({_id:blogId,user:user_id});
    // console.log(blog)

    let filename=null;
    
    if(req.file){
        filename=req.file.filename;
        const oldFileName=blog.img;
        // console.log(img)
        const filepath = path.join(__dirname, '/../img', oldFileName);
        fs.unlinkSync(filepath);
    }
    if(!blog){
        return res.json({
            msg:"blog id not found"
        })
    }
    if(title){
        blog.title=title;
    }
    if(content){
        blog.content=content;
    }
    if(filename !==null){
        blog.img=filename;
    }

    await blog.save();

    res.json({
        msg:"data updated"
    })
}

const deleteBlog=async(req,res)=>{
    // const blogId =req.params.blogId;
    const blogId = req.params.blogId.replace(':', ''); // Remove colon if present

    // console.log(blogId)

    const blog=await Blog.findById(blogId)

    if(!blog){
        return res.json({
            msg:"blog is not found"
    })
    }

    const filename=blog.img
    const filepath=path.join(__dirname , '/..img/' , filename)

    // fs.unlinkSync(filepath)
    fs.unlink(filepath, (err) => {
        if (err && err.code !== 'ENOENT') {
            return res.status(500).json({ msg: "Error deleting image", error: err });
        }
    });

    await Blog.deleteOne({_id:blogId})

    res.status(200).json({
     msg:"Data Removed"
    })
}



module.exports={createBlog,updateBlog,deleteBlog,getBlog,getsingleBlog}