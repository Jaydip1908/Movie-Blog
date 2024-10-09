const createBlog=require('../contoler/blog')
const express=require('express')
const sessionAuth=require('../middleware/sessionAuth');
// const storage=require('../middleware/multerImg')
// const Blog = require('../model/bolg');
const upload=require('../middleware/multerImg')

const blogRoute=express.Router();
blogRoute.post('/create',sessionAuth,upload.single("photo"),createBlog)
blogRoute.put('/create:BloaId',sessionAuth,upload.single("photo"),updateBlog)
blogRoute.delete('/create:BlogId',sessionAuth,upload.single("photo"),deleteBlog)


module.exports=blogRoute