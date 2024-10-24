const jwt = require('jsonwebtoken');



const sessionAuth = (req, res, next) => {
    // console.log("Session at middleware: ", req.session);
    if (req.session.user) {
        next()
    } else {
        res.status(401).json({
            msg: "you are not valid user"
        })
    }

}

const tokenAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        req.token=token;
        const validToken=jwt.verify(token,process.env.JWTSECRET_KEY ||  'mysecretkey');
        req.user=validToken;
        if (validToken) {
            return next()
        } else {
            return res.status(401).json({
                msg:"you not valid user"
            });
        }

    } catch (error) {
        console.log(error);
        
        res.json({
            msg: "token is not valid"
        });
    }
};
module.exports = { sessionAuth, tokenAuth }