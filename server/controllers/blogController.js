const Blog = require('../models/blog');
const Comment = require('../models/comment');
const cloudinary = require('../config/cloudinary.config');
const User = require('../models/user');

const createBlog =async (req,res)=>{
    try{
        const {title} = req.body;
        const tags = JSON.parse(req.body.tags);
        const content = JSON.parse(req.body.content);
        const coverImage = req.cloudinaryImage;
        const author = req.user._id;
    
        const blog = await Blog.create({title,content,tags,coverImage,author});
        res.status(201).json({message:'blog created',blog});
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Internal server error"});
    }
};

const getAllBlog = async (req,res)=>{
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";

        const filter = {$or:[
            {title:new RegExp(search,"i")},
            {tags:{ $regex: search, $options: "i"}}
        ]};
    
        const skip = (page-1)*limit;
    
        const [blogs,total] = await Promise.all([    
            Blog.find(filter)
           .sort({createdAt:-1})
           .skip(skip)
           .limit(limit)
           .populate("author", "username avatar _id"),
           Blog.countDocuments(filter)
        ]);
        res.status(200).json({
            blogs,page,limit,
            totalPages:Math.ceil(total/limit),
            totalBlog:total
        });
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Internal server error"});
    }
};

const getFeedBlog = async(req,res)=>{
    try{
        const feed = req.query.feed;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page-1)*limit;
        let filter = {};
        if (feed === 'following') {
                filter = { author: { $in: req.user.following } };
            } else if (feed === 'saved') {
                filter = { saves: req.user._id };
            } else if (feed === 'liked') {
                filter = { likes: req.user._id };
        }

        const [blogs,total] = await Promise.all([
            Blog.find(filter)
            .sort({createdAt:-1})
            .skip(skip)
            .limit(limit)
            .populate('author','username avatar _id'),
            Blog.countDocuments(filter)
        ])
        res.status(200).json({
            blogs,page,limit,
            totalPages:Math.ceil(total/limit),
            totalBlog:total
        })
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Internal server error"});
    }
}

const getBlogById = async (req,res)=>{
    try{
        const {id} = req.params;
        const userId = req.user._id;
        const blog = await Blog.findByIdAndUpdate(
            id,
            {$inc:{views:1}},
            {new:true}
        )
        .populate("author", "username avatar _id");
        if(!blog) return res.status(404).json({message:"Blog not found"});

        res.status(200).json({blog,
            isLiked:blog.likes.includes(userId),
            isSaved:blog.saves.includes(userId),
            });
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Internal server error"});
    }
};

const getBlogs = async (req,res) =>{
    try{
        const userId = req.user._id;
        const blogs = await Blog.find({author : userId}).sort({createdAt:-1}).populate('author');
        // console.log(blogs);
        res.status(200).json({blogs}); 
    }catch (error) {
        res.status(500).json({message: 'Something went wrong', error });
    }
}

const updateBlog = async (req,res)=>{
    try{
        const {title} = req.body;
        const tags = JSON.parse(req.body.tags);
        const content = JSON.parse(req.body.content);
        const userId = req.user._id;
        const {id} = req.params;
        const blog = await Blog.findById(id);

        if(!blog) return res.status(404).json({message:"Blog not found"});

        if(!blog.author.equals(userId)){
            return res.status(401).json({message:"Unautorized user"});
        }

        // delete old coverImage
        if (req.cloudinaryImage) {
            if (blog.coverImage?.public_id) {
                await cloudinary.uploader.destroy(blog.coverImage.public_id);
            }
            blog.coverImage = req.cloudinaryImage;
        }

        blog.title = title;
        blog.content = content;
        blog.tags = tags;
        blog.updatedAt = new Date();
        await blog.save();
        res.status(200).json({message:"Blog Updated Sucessfully",blog});
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Internal server error"});
    }
};

const deleteBlog = async (req,res)=>{
    try{
        const userId = req.user._id;
        const {id} = req.params;
        const blog = await Blog.findById(id);
        if(!blog) return res.status(404).json({message:"Blog not found"});

        if(!blog.author.equals(userId)){
            return res.status(401).json({message:"Unautorized user"});
        }
        if(blog.coverImage){
            if (blog.coverImage?.public_id) {
                await cloudinary.uploader.destroy(blog.coverImage.public_id);
            }
        }
        await blog.deleteOne();
        res.status(200).json({message:"Blog Deleted Sucessfully"});
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Internal server error"});
    }
};

const toggleLike = async (req,res)=>{
    try{
        const {id} = req.params;
        const userId = req.user._id;

        const [user,blog] = await Promise.all([
            User.findById(userId),
            Blog.findById(id)
        ]);

        if(!user) return res.status(404).json({message:"user not found"});
        if(!blog) return res.status(404).json({message:"Blog not found"});

        let isLiked = false;

        if(blog.likes.includes(userId)){
            await Promise.all([
                Blog.findByIdAndUpdate(id,{$pull : {likes:userId}}),
                User.findByIdAndUpdate(userId,{$pull : {likedBlogs:id}})
            ])
        }else{
            await Promise.all([
                Blog.findByIdAndUpdate(id,{$addToSet : {likes:userId}}),
                User.findByIdAndUpdate(userId,{$addToSet : {likedBlogs:id}})
            ])
            isLiked=true;
        }
        const [updatedUser,updatedBlog] = await Promise.all([
            User.findById(userId),
            Blog.findById(id)
        ]);

        res.status(200).json({
            message:"Toggled like",
            isLiked,
            likes:updatedBlog.likes,
            likedBlogs:updatedUser.likedBlogs,
        });
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Internal server error"});
    }
}

const toggleSave = async (req,res) =>{
    try{
        const {id} = req.params;
        const userId = req.user._id;

        const [user,blog] = await Promise.all([
            User.findById(userId),
            Blog.findById(id)
        ]);

        if(!user) return res.status(404).json({message:"user not found"});
        if(!blog) return res.status(404).json({message:"Blog not found"});

        let isSaved=false;

        if(blog.saves.includes(userId)){
            await Promise.all([
                Blog.findByIdAndUpdate(id,{$pull : {saves:userId}}),
                User.findByIdAndUpdate(userId,{$pull : {savedBlogs:id}})
            ])
        }else{
            await Promise.all([
                Blog.findByIdAndUpdate(id,{$addToSet : {saves:userId}}),
                User.findByIdAndUpdate(userId,{$addToSet : {savedBlogs:id}})
            ])
            isSaved=true;
        }
        const [updatedUser,updatedBlog] = await Promise.all([
            User.findById(userId),
            Blog.findById(id)
        ]);

        res.status(200).json({
            message:"Toggled save",
            isSaved,
            saves:updatedBlog.saves,
            savedBlogs:updatedUser.savedBlogs,
        });

    }catch(err){
        console.error(err);
        res.status(500).json({message:"Internal server error"});
    }
}
//////////////////////////
//////////////////////////
//////////////////////////
//////////////////////////
const addComment  = async (req,res)=>{
    try{
        const {id} = req.params;
        const userId = req.user._id;
        const {text} = req.body;

        const blog =await Blog.findById(id);
        if(!blog) return res.status(404).json({message:"Blog not found"});

        const comment = await new Comment.create({
            blog:id,
            user:userId,
            text,
        })
        
        blog.comments.push(comment._id);
        await blog.save();
        res.status(200).json({message:"comment added",comment});
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Internal server error"});
    }
};

const getComment = async (req,res)=>{
    try{
        const {id} = req.params;

        const blog = await Blog.findById(id).populate({
            path:"comments",
            options:{sort:{createdAt:-1}},
            populate:{path:'user', select:'username avatar _id'}
        })

        if(!blog) return res.status(404).json({message:"Blog not found"});

        const comments = blog.comments.populate("Comment");
        res.status(200).json({comments});
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Internal server error"});
    }

};


module.exports  = {
    createBlog,
    getAllBlog,
    getFeedBlog,
    getBlogById,
    getBlogs,
    updateBlog,
    deleteBlog,
    toggleLike,
    toggleSave,
    addComment,
    getComment,
};