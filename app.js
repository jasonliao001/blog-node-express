var express = require('express');
var app = express();
require('babel-register');
// var validator = require('./plugins');

// body-parse
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// params validator
// validator.register(app);
// data server
const mongodb = require('./models/index');
mongodb.connect();
// register router
const route = require('./routes/index');
route(app);
module.exports = app;
