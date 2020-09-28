require('dotenv').config();
const express = require('express');
const app = express();

// global middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require('./helpers/morgan'));

//users login,register validation
app.use('/users', require('./Routes/users'));

// check token validation, and updateing infromation about user
app.use(require('./helpers/tokenCheck'));

// expose api
app.use('/api', require('./api'))

// handle unknown endpoint
app.use(require('./helpers/unknownEndpoint'));

// error handling
app.use(require('./helpers/errorHandler'));


module.exports = app;
