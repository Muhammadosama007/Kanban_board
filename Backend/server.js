const express = require('express');
const mongoose = require('mongoose');
const userAuth= require('../Backend/routes/authentication')
const userCrud=require('../Backend/routes/user');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/kanban');

app.use('/auth',userAuth);
app.use('/user',userCrud);


const port= 3002;
app.listen(port,()=>{
    console.log("server listening on port: ",port);
})