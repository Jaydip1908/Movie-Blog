const multer=require('multer')

const storage=multer.diskStorage({
    destination:function(rea,file,cd){
      cd(null,'img/')
    },
  
    filename:function(req,file,cd){
      const prefix=Date.now() + '-' + Math.floor(Math.random()*100000)
      const filename=prefix + '-' +file.originalname
      console.log(filename)
      cd(null,filename)
    }
  })
  
const upload=multer({storage:storage})

module.exports=upload