const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/',(req,res) => {
    res.send('Welcome to the API');
})

mongoose.connect(process.env.MONGO_URI,)
    .then(()=>{
        app.listen(5000,()=>{console.log("server on http://localhost:5000")});
    })
    .catch(err=>console.log(err));
