var express = require('express');
var passport = require('passport');
var app = express();
var userService = require('../services/user-service');

app.get('/login', function(req, res) {
	var vm = {
		user: null,
		error: req.flash('error')
	};
	if (req.user) {
		vm.user = req.user;
	}
	res.json(vm);
});

app.post('/login', passport.authenticate('local', {failureFlash: 'Invalid credentials'}), function(req, res) { // throw error if authentication fails
	req.flash('error');
	console.log(req.body);
	res.json(req.body);
});

app.post('/signup', function(req, res) {
	if (req.body.confirmPassword === req.body.password) {
		var user = {
			username : req.body.username,
			password : req.body.password,
			email : req.body.email,
			phone : "",
			address : "",
			city : "",
			manager : req.body.manager
		}

		userService.addUser(user, function(err) {
			if (err) {
				console.log(err);
			}
		});
		res.json(req.body);
	} else {
		console.log('mismatching passwords');
	}
});

module.exports = app;