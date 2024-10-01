const {User} = require("../model/user");


    const loginuser = async (req, res) => {
        const { username, password } = req.body;

        const user = await User.findOne({ username: username })

        if (user) {
            if (user.password === password) {
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
   res.status(400).send({
        msg:"user is logged out"
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