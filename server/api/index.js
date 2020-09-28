const express = require('express');
const api = express.Router();

api.use('/v1',require('./v1'));

module.exports = api;