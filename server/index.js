const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const User = require('./models/user');


// Initialize express app and middleware
const app = express();  

app.use(cors());
app.use(express.json());

app.get('/',(req,res) => {
    res.send('Welcome to the API');
})

app.post('/signup', async (req,res)=>{
    const {username, email, password} = req.body;
    try{
        const existing = await User.findOne({username:username});
        if(existing) res.status(404).json({message:"User already Exist."});
s
        const hashed = await bcrypt.hash(password,10);
        const newUser =await User.create({username,email,password:hashed});

        const token = jwt.sign({id: newUser._id},process.env.JWT_SECRET,{expiresIn:'7d'});

        res.status(201).json({newUser,token});
    }catch(err){
        res.status(500).json({message:'signup failed',error:err.message});
    }
});

app.post('signin',async (req,res)=>{
    const {signin, password} = req.body();
    
    try{
        const user =await User.find({username:signin});
        if(!user){
            user =await User.find({email:signin});
        }
        if(!user){
            res.status(400).json({message:"user not found"});
        }
        const ismatch = await bcrypt.compare(password,user.password);

        if(!ismatch){res.status(400).json({message:"Invalid credential"});}

        const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.status(200).json({user,token});
    }catch(err){
        res.status(500).json({error:err.message})
    }
})


mongoose.connect(process.env.MONGO_URI,)
    .then(()=>{
        app.listen(5000,()=>{console.log("server on http://localhost:5000")});
    })
    .catch(err=>console.log(err));
