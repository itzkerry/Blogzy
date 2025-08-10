const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{ type:String, required:true},
    content:{ type:Object, required:true},
    tags:{ type:[String]},
    coverImage:{
        url: { type: String },
        public_id: { type: String }
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    views:{type:Number, default:0},
    saves: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    likes:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    
},{timestamps:true});

module.exports = mongoose.model('Blog',blogSchema);