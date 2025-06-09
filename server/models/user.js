const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:5,
        maxlength:20,
        match:/^(?!.*__)(?!_)[a-zA-Z0-9_]{5,20}(?<!_)$/ // Regex to ensure no consecutive underscores and not starting/ending with underscore
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        match:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ // Regex for email validation
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:8,
        maxlength:16,
        match:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/ // Regex for password validation
    }
},{timestamps: true});

module.exports = mongoose.model('User',userSchema);
