const express = require('express');
const Router = express.Router();
const  {login,register} = require('../controller/authentication');


Router.post('/login',login);
Router.post('/signup',register);


module.exports=Router;