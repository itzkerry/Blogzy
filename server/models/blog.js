const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:Object,
        required:true
    },
    tags:{
        type:[String]
    },
    coverImage:{
        type:String
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model('Blog',blogSchema);