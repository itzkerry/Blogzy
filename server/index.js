//////node index.js -> to start the server

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const User = require('./models/user');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require("./middleware/authMiddleware");


// Initialize express app and middleware
const app = express();  

app.use(cors()); // allow cross-origin request
app.use(express.json());

app.get('/',(req,res) => {
    res.send('Welcome to the API');
})

app.use('/api/auth',authRoutes);

app.use('/api/blogs',blogRoutes);

mongoose.connect(process.env.MONGO_URI,)
    .then(()=>{
        console.log("Connected to MongoDB");
        app.listen(5000,()=>{console.log("server on http://localhost:5000")});
    })
    .catch(err=>console.log(err));
