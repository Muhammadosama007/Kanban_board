const express= require('express');
const Router= express.Router();
const {getLog}=require('../controller/log');


Router.get('/getLog',getLog);

module.exports=Router;