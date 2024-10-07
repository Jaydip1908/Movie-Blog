const Blog=require('../model/bolg')

const createBlog=async(req,res)=>{
        const {title,content}=req.body;
        const user_id=req.session.user["id"]

        console.log(title)
        console.log(content)
        console.log(user_id)
        console.log(req.file.filename)

        let filename;
        if(req.file){
            filename=req.file.filename
        }
        else{
            filename=""
        }

        await Blog.create({title:title,content:content,user:user_id,img:filename})

        res.status(201).json({
            msg:"blog crete succesfully"
        })
}

module.exports=createBlog