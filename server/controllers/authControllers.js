const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req,res)=>{
    const {username, email, password} = req.body;
    try{
        const existing = await User.findOne({username:username});
        if(existing) return res.status(404).json({message:"User already Exist."});

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
        if(!passwordRegex.test(password)){
            return res.status(400).json({message:"Password must be 8–16 characters long, with uppercase, lowercase, number, and special character."})
        }
        const hashed = await bcrypt.hash(password,10);
        const newUser =await User.create({username,email,password:hashed});

        const token = jwt.sign({id: newUser._id},process.env.JWT_SECRET,{expiresIn:'7d'});

        return res.status(201).json({newUser,token});
    }catch(err){
        return res.status(500).json({message:'signup failed',error:err.message});
    }
};

exports.signin = async (req,res)=>{
    const {signin, password} = req.body;
    
    try{
        const user = await User.findOne({$or: [{username:signin},{email:signin}]});

        if(!user){
            return res.status(400).json({message:"user not found"});
        }
        console.log("password from req.body:", password);
        console.log("user.password from DB:", user?.password);
        const ismatch = await bcrypt.compare(password,user.password);
        if(!ismatch){ return res.status(400).json({message:"Invalid credential"});}

        const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.status(200).json({user,token});
    }catch(err){
        res.status(500).json({error:err.message})
    }
};