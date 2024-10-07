const User = require("../model/user");


    const loginuser = async (req, res) => {
        const { username, password } = req.body;

        const user = await User.findOne({ username: username })

        if (user) {
            if (user.password === password) {

             
                req.session.user={
                    id:user._id
                }
                console.log(req.session.user)

                res.status(200).json({
                    msg: "User Logeed In Successfully"
                })
            } else {
                res.status(401).json({
                    msg: "User Password Inccorrect"
                })
            }

        }else{
            res.status(404).json({
                msg:"User Dose Not Exit"
            })
        }
    }


const logoutuser = (req, res) => {
    req.session.destroy(function(err){
        console.log("session destroy")
        console.error(err)
    })

   res.status(200).send({
        msg:"user is logged out succesfully"
    })
}
const registeruser =async (req, res) => {
    const {username,password}=req.body;

    const users=await User.findOne({username:username});

    if(users){
        res.status(409).json({
            msg:"User Alrady Registered",
        });

    }else{
        await User.create({username:username,password:password})
        res.status(201).json({
            msg:"User is Registered"
        });
    }
}


module.exports = { loginuser, logoutuser, registeruser };