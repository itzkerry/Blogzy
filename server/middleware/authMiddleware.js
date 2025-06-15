const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async (req,res,next) =>{

    const authHeader = req.headers.authorization; // get the header from
    console.log("auth: " + authHeader);
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        res.status(401).json({message:"No Token Provided"});
    }
    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    }catch(err){
        res.status(401).json({message:"Invalid token"});
    }
}

module.exports = authMiddleware;