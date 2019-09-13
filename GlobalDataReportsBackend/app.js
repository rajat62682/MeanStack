var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var loginRouter =require('./routes/login-controller');
var app = express();
var globalreportController=require('./routes/global-reports-controller');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //console.log(req);
    next();
  });
 //console.log(globalreportController);
app.use(loginRouter);
app.use(globalreportController);

module.exports = app;
