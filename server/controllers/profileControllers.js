const User = require("../models/user");
const Blog = require('../models/blog');
const cloudinary = require('../config/cloudinary.config')
const getProfile = async (req,res)=>{
    try{
        const {username} = req.params;
        const userId  = req.user._id;

        const user = await User.findOne({username:username})
            .populate("followers", "username avatar")
            .populate("following", "username avatar")
            .select('-password');

        if(!user) return res.status(404).json({message:"user not found"}); 
        const blogs = await Blog.find({author : user._id}).sort({createdAt:-1});
        const isFollowing = user.followers.some(f => f._id.toString() === userId.toString());
        res.status(200).json({user,isFollowing,blogs});
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Internal server error"});
    }
}

const updateAvatar = async(req,res)=>{
    try{
        const userId = req.user._id;
        const {id} = req.params;
        if(!userId.equals(id)){
            return res.status(401).json({message:"Unautorized user"});
        }
        const user =await User.findById(id).select('-password');
        if(!user) return res.status(404).json({message:"user not found"});

        if (req.cloudinaryImage) {
            //delete old avater
            if (user.avatar?.public_id) {
                await cloudinary.uploader.destroy(user.avatar.public_id);
            }
            user.avatar = req.cloudinaryImage;
        }else{
            return res.status(400).json({message:"file not provided"});
        }
        await user.save();
        res.status(200).json({message:"Profile Updated Sucessfully",avatar:user.avatar});
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Internal server error"});
    }
}
const updateBio = async(req,res)=>{
    try{
        const {bio} = req.body;
        const userId = req.user._id;
        const {id} = req.params;
        if(!userId.equals(id)){
            return res.status(401).json({message:"Unautorized user"});
        }
        const user =await User.findById(id).select('-password');
        if(!user) return res.status(404).json({message:"user not found"});
        user.bio = bio;
        await user.save();
        res.status(200).json({message:"Bio updated Sucessfully",bio:user.bio});
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Internal server error"});
    }
}

const togglefollow = async(req,res)=>{
    try{
        const userId = req.user._id;
        const {id:blogerId} = req.params;

        const [user,bloger] = await Promise.all([
            User.findById(userId),
            User.findById(blogerId)
        ]);
        
        if(!user) return res.status(404).json({message:"user not found"});
        if(!bloger) return res.status(404).json({message:"Bloger not found"});

        let isFollowing=false;

        if(user.following.includes(blogerId)){
            await Promise.all([
                User.findByIdAndUpdate(userId, { $pull: { following: blogerId } }),
                User.findByIdAndUpdate(blogerId, { $pull: { followers: userId } })
            ])
        }else{
            await Promise.all([
                User.findByIdAndUpdate(userId, { $addToSet: { following: blogerId } }),
                User.findByIdAndUpdate(blogerId, { $addToSet: { followers: userId } }),
            ])
            isFollowing=true;
        }

        const [updatedBlogger,updatedUser] = await Promise.all([
            User.findById(blogerId).populate("followers", "username avatar"),
            User.findById(userId).populate("following", "username avatar")
        ])
        
        res.status(200).json({
            message:'toggled following',
            isFollowing,
            followers:updatedBlogger.followers,
            following:updatedUser.following
        });
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Internal server error"});
    }
}
module.exports = {
    getProfile,
    updateAvatar,
    updateBio,
    togglefollow,
}