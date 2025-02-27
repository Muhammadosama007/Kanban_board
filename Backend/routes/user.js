const express = require('express');
const Router = express.Router();

const {create,getUser,updateUser,delUser}= require('../controller/user')


Router.post('/create',create);
Router.get('/get',getUser);
Router.patch('/updateUser',updateUser);
Router.delete('/delUser',delUser);


module.exports=Router;