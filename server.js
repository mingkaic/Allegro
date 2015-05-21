var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var expressSession = require('express-session');
var flash = require('connect-flash');
var connectMongo = require('connect-mongo');
var MongoStore = connectMongo(expressSession);

var config = require('./js/config');
var login = require('./js/login');
var inventory = require('./js/inventory');

var passportConfig = require('./auth/passport-config');
passportConfig(); // same instance as passport due to singleton

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
app.use(bodyParser.json());

app.use(expressSession(
  {
    secret: 'mmmmm cookie',
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
       mongooseConnection: mongoose.connection
    })
  }
));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(login);
app.use(inventory);

app.listen(port);
console.log("listening at port "+port);