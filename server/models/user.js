const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        index:true,
        minlength:5,
        maxlength:20,
        match:/^(?!.*__)(?!_)[a-zA-Z0-9_]{5,20}(?<!_)$/ // Regex to ensure no consecutive underscores and not starting/ending with underscore
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        index:true,
        match:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ // Regex for email validation
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    bio:{type:String},
    avatar:{        
        url: { type: String },
        public_id: { type: String }
    },

    followers: [{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
    following: [{type:mongoose.Schema.Types.ObjectId, ref:"User"}],

    savedBlogs: [{type:mongoose.Schema.Types.ObjectId, ref:"Blog"}],
    likedBlogs : [{type:mongoose.Schema.Types.ObjectId, ref:"Blog"}],

},{timestamps: true});

module.exports = mongoose.model('User',userSchema);
