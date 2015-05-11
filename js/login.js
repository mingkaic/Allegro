var express = require('express');
var passport = require('passport');
var app = express();
var userServices = require('../services/user-service');

app.get('/login', function(req, res) {
	var vm = {
		user: null,
		error: req.flash('error')
	};
	if (req.user) {
		vm.user = req;
	}
	res.json(vm);
})

app.post('/login', passport.authenticate('local', {failureFlash: 'Invalid credentials'}), function(req, res) { // throw error if authentication fails
	res.json(req.body);
});

app.post('/signup', function(req, res) {
	console.log(req.body);
	console.log("signing up");
	userService.addUser(req.body, function(err) {
		if (err) {
			console.log(err);
		}
	});
	res.json(req.body);
});

module.exports = app;