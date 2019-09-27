var express = require('express');
var session = require('express-session')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var loginRouter =require('./routes/login-controller');
const uuid = require('uuid/v4');
var app = express();
var globalreportController=require('./routes/global-reports-controller');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware')
    console.log(req.sessionID)
    return uuid() // use UUIDs for session IDs
  },
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if(req.url.match("/login"))
  {
    next();
  }
  else{
    if(req.session && req.session.username){
      next();
    }
    else{
      res.status(401).json({success:false,message:"Login Required"})
   //  next();
    }
    
  }
});
  
 //console.log(globalreportController);
app.use("/api",loginRouter);
app.use("/api",globalreportController);


app.set('trust proxy', 1) // trust first proxy


module.exports = app;
