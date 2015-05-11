var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./js/config');
var login = require('./js/login');
var inventory = require('./js/inventory');

var app = express();

var port = normalizePort(process.env.PORT || 3000);

mongoose.connect(config.mongoUri);

// functions I took from express-generator
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

// access static files (html, and angular controller in public)
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json())

app.use(login);
app.use(inventory);

app.listen(port);
console.log("listening at port "+port);