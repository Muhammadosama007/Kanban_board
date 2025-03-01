const express=require('express');
const Router=express.Router();
const {authenticate}=require('../middleware/jwtVerify');
const {create,getTask,updateTask,delTask}=require('../controller/task');

Router.post('/create',authenticate,create);
Router.get('/getTask',authenticate,getTask);
Router.patch('/updateTask/:id',authenticate,updateTask);
Router.delete('/delTask/:id',authenticate,delTask);

module.exports=Router;