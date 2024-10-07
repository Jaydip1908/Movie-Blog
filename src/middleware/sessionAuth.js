
const sessionAuth=(req,res,next)=>{ 
    console.log("Session at middleware: ", req.session);
    if(req.session.user){
        next()
    }else{
        res.status(401).json({
            msg:"you are not valid user"
        })
    }

}
module.exports=sessionAuth