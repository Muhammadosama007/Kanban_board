const express = require('express');
const Router = express.Router();

const {create,getUser,updateUser,delUser}= require('../controller/user')


Router.post('/create',create);
Router.get('/get',getUser);
Router.patch('/updateUser/:id',updateUser);
Router.delete('/delUser/:id',delUser);


module.exports=Router;