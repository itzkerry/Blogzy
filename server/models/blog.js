const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{ type:String, required:true},
    content:{ type:Object, required:true},
    tags:{ type:[String]},
    coverImage:{ type:String},
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    comments:[{
        user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
        text:String,
        createdAt:{type:Date, default:Date.now},
        replies:[{
            user:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
            text:String,
            createdAt:{type:Date, default:Date.now}
        }]
    }]
},{timestamps:true});

module.exports = mongoose.model('Blog',blogSchema);