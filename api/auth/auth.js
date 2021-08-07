const jwt = require('jsonwebtoken');
module.exports = (req,res,next)=>{
    try{    
        const token = req.cookies.token;
        const decoded = jwt.verify(token,process.env.AUTH_SECRET,null);
        req.userData = decoded;
        next();
}
catch(err){
    return res.status(401).json({
        message: "Authentication error !",
        do : "/user/login",
        type : "POST",
        param : "username,password"
    });
}
}