//////node index.js -> to start the server

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/user');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const morgan = require('morgan');


// Initialize express app and middleware
const app = express();  

// log requests to the console
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // short colored logs for local dev
} else {
  app.use(morgan("combined")); // standard Apache style logs
}

app.use(cors()); // allow cross-origin request
app.use(express.json());

app.get('/',(req,res) => {
    res.send('Welcome to the API');
})

app.use('/api/auth',authRoutes);

app.use('/api/blogs',blogRoutes);

app.use('/api/profile',profileRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to MongoDB");
        app.listen(5000,'0.0.0.0',()=>{console.log("server on http://localhost:5000")});
    })
    .catch(err=>console.log(err));
