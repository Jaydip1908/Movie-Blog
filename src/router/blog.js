const {createBlog}=require('../contoler/blog')
const {updateBlog}=require('../contoler/blog')
const {deleteBlog}=require('../contoler/blog')
const {getBlog}=require('../contoler/blog')
const {getsingleBlog}=require('../contoler/blog')
const express=require('express')
const sessionAuth=require('../middleware/sessionAuth');
// const storage=require('../middleware/multerImg')
// const Blog = require('../model/bolg');
const upload=require('../middleware/multerImg')

const blogRoute=express.Router();
blogRoute.post('/create',sessionAuth,upload.single("photo"),createBlog)
blogRoute.get('/get_data',sessionAuth,upload.single("photo"),getBlog)
blogRoute.get('/get_singleData:blogId',sessionAuth,upload.single("photo"),getsingleBlog)
blogRoute.put('/update:blogId',sessionAuth,upload.single("photo"),updateBlog)
blogRoute.delete('/delete:blogId',sessionAuth,deleteBlog)


module.exports=blogRoute