// const Blog=require('../model/bolg');
// const fs=require('fs');
// const path = require('path');
const Blog = require('../model/bolg'); // Fixed typo: 'bolg' to 'blog'
const fs = require('fs');
const path = require('path');
const blogRoute = require('../router/blog');

// const mongoose = require('mongoose');

const createBlog=async(req,res)=>{
        const {title,content}=req.body;
        const user_id=req.session.user["id"]

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
    try{
        let allData=await Blog.find();
        res.send(allData);
    }catch(error){
        res.send(error.message);
    }
}

const getsingleBlog=async(req,res)=>{
    try{
        let id=req.params.id;
        res.send(data);
    }catch(error){
        res.send(error.message);
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
        const filepath = path.join(__dirname, '/../img', oldFileName);
        fs.unlink(filepath);
    }
    if(!blog){
        return req.status().join({
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

    res.status().json({
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