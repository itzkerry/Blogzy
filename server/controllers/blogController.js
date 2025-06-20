const Blog = require('../models/blog');

const createBlog =async (req,res)=>{
    try{
        const {title,content,tags,coverImage} = req.body;
        const author = req.user.id;
    
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
            {tags:{$in:[search]}}
        ]};
    
        const skip = (page-1)*limit;
    
        const [blogs,total] = await Promise.all([    
            Blog.find(filter)
           .sort({createdAt:-1})
           .skip(skip)
           .limit(limit)
           .populate("author", "username"),
    
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

const getBlogById = async (req,res)=>{
    try{
        const {id} = req.params;
        const blog =await Blog.findById(id)
        .populate("author", "username")
        .populate("comments.user", "username")
        .populate("comments.replies.user", "username");
        if(!blog) return res.status(404).json({message:"Blog not found"});

        res.status(200).json({blog});
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Internal server error"});
    }
};

const updateBlog = async (req,res)=>{
    try{
        const {title,content,tags,coverImage} = req.body;
        const userId = req.user.id;
        const {id} = req.params;
        const blog =await Blog.findById(id);

        if(!blog) return res.status(404).json({message:"Blog not found"});

        if(blog.author.toString() !== userId){
            return res.status(401).json({message:"Unautorized user"});
        }
        blog.title = title;
        blog.content = content;
        blog.tags = tags;
        blog.coverImage = coverImage;
        await blog.save();
        res.status(200).json({message:"Blog Updated Sucessfully",blog});
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Internal server error"});
    }
};

const deleteBlog = async (req,res)=>{
    try{
        const userId = req.user.id;
        const {id} = req.params;
        const blog =await Blog.findById(id);
        if(!blog) return res.status(404).json({message:"Blog not found"});

        if(blog.author.toString() !== userId){
            return res.status(401).json({message:"Unautorized user"});
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
        const userId = req.user.id;
        const blog =await Blog.findById(id);
        if(!blog) return res.status(404).json({message:"Blog not found"});

        const index = blog.likes.findIndex(uid=>uid.toString() === userId);
        if(index == -1) blog.likes.push(userId);
        else blog.likes.splice(index,1);

        await blog.save();
        res.status(200).json({message:"Toggled like",likes:blog.likes.length});
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Internal server error"});
    }
}

const addComment  = async (req,res)=>{
    try{
        const {id} = req.params;
        const userId = req.user.id;
        const {text} = req.body;

        const blog =await Blog.findById(id);
        if(!blog) return res.status(404).json({message:"Blog not found"});
        const comment = {
            user:userId,
            text,
            createdAt:new Date(),
            replies:[]
        };
        blog.comments.push(comment);
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

        const blog =await Blog.findById(id)
        .populate("comments.user","username")
        .populate("replies.user","username");
        if(!blog) return res.status(404).json({message:"Blog not found"});

        const comments = blog.comments.populate("user");
        res.status(200).json({comments});
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Internal server error"});
    }

};

const addReply = async (req,res)=>{

    try{
        const {blogId,commentId} = req.params;
        const userId = req.user.id;
        const {text} = req.body;

        const blog = await Blog.findById(blogId);
        if(!blog) return res.status(404).json({message:"Blog not found"});

        const comment = blog.comments.id(commentId);
        if(!comment) return res.status(404).json({ message: "Comment not found" });

        comment.replies.push({
            user:userId,
            text,
            createdAt:new Date(),
        });
        
        await blog.save();
        res.status(200).json({message:"reply added",replies:comment.replies});
    } catch(err){
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// const getReply = async (req,res)=>{
//     try{
//         const {blogId,commentId} = req.params;

//         const blog = await Blog.findById(blogId);
//         if(!blog) return res.status(404).json({message:"Blog not found"});

//         const comment = blog.comments.id(commentId);
//         if(!comment) return res.status(404).json({ message: "Comment not found" });

//         const replies = comment.replies;
//         res.status(200).json({replies});
//     } catch(err){
//         console.error(err);
//         res.status(500).json({ message: "Internal server error" });
//     }
// }

module.exports  = {
    createBlog,
    getAllBlog,
    getBlogById,
    updateBlog,
    deleteBlog,
    toggleLike,
    addReply,
    addComment,
    getComment,
};