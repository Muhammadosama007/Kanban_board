const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParse = require('cookie-parser');
const userAuth = require('../Backend/routes/authentication')
const userCrud = require('../Backend/routes/user');
const taskCrud = require('../Backend/routes/task');
const activityLog= require('../Backend/routes/log');

const app = express();

app.use(express.json());
app.use(cookieParse());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/kanban');

app.use('/auth', userAuth);
app.use('/user', userCrud);
app.use('/task', taskCrud);
app.use('/log',activityLog);

const port = 3002;
app.listen(port, () => {
    console.log("server listening on port: ", port);
})