var createError = require('http-errors');
var express = require('express');
var cors = require("cors");
var morgan = require("morgan");
var colors = require("colors");
var errorHandle = require("./app/middleware/error");

const mongoose = require("mongoose");

var app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

const pathConfig      = require('./path');
// Define path
global.__base             =     __dirname + '/';
global.__path_app         =     __base      + pathConfig.folder_app         +   '/';
global.__path_configs     =     __path_app  + pathConfig.folder_configs     +   '/';
global.__path_routes      =     __path_app  + pathConfig.folder_routes      +   '/';
global.__path_schemas     =     __path_app  + pathConfig.folder_schemas     +   '/';
global.__path_models      =     __path_app  + pathConfig.folder_models      +   '/';
global.__path_validates   =     __path_app  + pathConfig.folder_validates   +   '/';

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/todo_list_api",{useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("MongoDB connected.".magenta);
}).catch((error) => {
  console.log(error);
});

// Init all routers
app.use('/api/v1/', require(__path_routes));
app.use(errorHandle);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


module.exports = app;
