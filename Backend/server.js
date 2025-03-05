const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const cookieParse = require('cookie-parser');
const userAuth = require('../Backend/routes/authentication')
const userCrud = require('../Backend/routes/user');
const taskCrud = require('../Backend/routes/task');
const activityLog= require('../Backend/routes/log');

const app = express();

app.use(express.json());
app.use(cookieParse());
app.use(cors());

mongoose.connect(process.env.dbConection);

app.use('/auth', userAuth);
app.use('/user', userCrud);
app.use('/task', taskCrud);
app.use('/log',activityLog);

app.listen(process.env.Port, () => {
    console.log("server listening on port: ", process.env.Port);
})