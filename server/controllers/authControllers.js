const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// /api/auth/signup
exports.signup = async (req,res)=>{
    const {username, email, password} = req.body;
    try{
        const existing = await User.findOne({username});
        if(existing) return res.status(404).json({message:"User already Exist."});

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
        if(!passwordRegex.test(password)){
            return res.status(400).json({message:"Invalid password"})
        }
        const hashed = await bcrypt.hash(password,10);
        const newUser =await User.create({username,email,password:hashed});

        const token = jwt.sign({id: newUser._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        const { password:_ , ...userWithoutPassword } = newUser.toObject();
        return res.status(201).json({user:userWithoutPassword,token});
    }catch(err){
        return res.status(500).json({message:'SignUp Failed', error:err.message});
    }
};

exports.signin = async (req,res)=>{
    const {signin, password} = req.body;

    try{
        const user = await User.findOne({$or: [{username:signin},{email:signin}]});

        if(!user){
            return res.status(400).json({message:"user not found"});
        }

        const ismatch = await bcrypt.compare(password,user.password);
        if(!ismatch){ return res.status(400).json({message:"Invalid credential"});}

        const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn:'7d'});

        const { password:_ , ...userWithoutPassword } = user.toObject();
        res.status(200).json({user:userWithoutPassword,token});
    }catch(err){
        console.log(err.message);
        res.status(500).json({message:"SignIn Failed", error:err.message});
    }
};