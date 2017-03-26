 var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var user = require('./routes/user');
var photos = require('./routes/photos');
var http = require('http');
var app = express();
var local = "127.0.0.1";
var inTest = "0.0.0.0";
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('title', 'My photo application');

app.set('photos', path.join(__dirname, 'public/photos'));

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', photos.list);
app.get('/users', user.list);
app.get('/upload', photos.form);
app.post('/upload', photos.submit(app.get('photos')));
app.get('/photo/:id/download', photos.download(app.get('photos')));


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


var routes = require('./routes/routes.js')(app);
module.exports = app;

