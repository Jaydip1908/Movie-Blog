const {createBlog}=require('../contoler/blog')
const {updateBlog}=require('../contoler/blog')
const {deleteBlog}=require('../contoler/blog')
const {getBlog}=require('../contoler/blog')
const {getsingleBlog}=require('../contoler/blog')
const express=require('express')
const {tokenAuth, sessionAuth}=require('../middleware/sessionAuth');
const upload=require('../middleware/multerImg')

const blogRoute=express.Router();
blogRoute.post('/create',tokenAuth,upload.single("photo"),createBlog)
blogRoute.get('/get_data',tokenAuth,upload.single("photo"),getBlog)
blogRoute.get('/get_singleData:blogId',tokenAuth,upload.single("photo"),getsingleBlog)
blogRoute.put('/update:blogId',tokenAuth,upload.single("photo"),updateBlog)
blogRoute.delete('/delete:blogId',tokenAuth,deleteBlog)


module.exports=blogRoute