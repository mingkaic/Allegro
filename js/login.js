var express = require('express');
var app = express();
var userServices = require('../services/user-service');

app.post('/login', function(req, res) {
	var somethingGoesWrong = false;
	if (somethingGoesWrong) {
		// show error
	}
	res.json(req.body);
});

app.post('/signup', function(req, res) {
	userService.addUser(req.body, function(err) {
		if (err) {
			console.log(Error);
		}
	});
	res.json(req.body);
});

module.exports = app;