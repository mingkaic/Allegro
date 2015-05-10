var express = require('express');
var app = express();

app.post('/login', function(req, res) {
  res.json(req.body);
});

app.post('/signup', function(req, res) {
  res.json(req.body);
});

module.exports = app;