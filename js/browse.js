var express = require('express');
var app = express();

app.get('/itemlist', function(req, res) {
	//var user = req.user ? req.user.username : null;

	res.json(user);
});

module.exports = app;