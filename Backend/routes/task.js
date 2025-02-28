const express=require('express');
const Router=express.Router();

const {create,getTask,updateTask,delTask}=require('../controller/task');

Router.post('/create',create);
Router.get('/getTask',getTask);
Router.patch('/updateTask/:id',updateTask);
Router.delete('/delTask/:id',delTask);

module.exports=Router;