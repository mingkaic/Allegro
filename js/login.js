var express = require('express');
var passport = require('passport');
var bcrypt = require('bcrypt');
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

app.post('/login', function(req, res) {
	userService.findUser(req.body.id, function(err, user) {
		if (err) return res.json(err);
		if (!user) return res.json("Incorrect username/email or password");
		if (req.body.manager && !user.manager) res.json("Does not have management permission");

		bcrypt.compare(req.body.password, user.password, function(err, same) {
			if (err) return res.json(err);
			if (!same) return res.json("Incorrect username/email or password");
			res.json(user);
		});
	});
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
		};

		userService.addUser(user, function(err) {
			if (err) {
				console.log(err);
				var keys = Object.keys(err.errors);
				if (keys.length > 0)
					return res.json(err.errors[keys[0]].message);
				return res.json(err.message);
			}
			res.json(req.body);
		});
	} else {
		res.json('passwords do not match');
	}
});

module.exports = app;