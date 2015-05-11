var express = require('express');
var passport = require('passport');
var app = express();
var userServices = require('../services/user-service');

app.get('/login', function(req, res) {
	if (req.user) {
		res.json(req);
	}
	res.json(null);
})

app.post('/login', passport.authenticate('local'), function(req, res) { // throw error if authentication fails
	res.json(req.body);
});

app.post('/signup', function(req, res) {
	userService.addUser(req.body, function(err) {
		if (err) {
			console.log(err);
		}
	});
	res.json(req.body);
});

module.exports = app;