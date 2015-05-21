var bcrypt = require('bcrypt');
var User = require('../models/user').User;

exports.addUser = function(user, next) {
	bcrypt.hash(user.password, 10, function(err, hash) { // 2^10 iterations
		if (err)
			return next(err);
		var newUser = new User({
			username : user.username,
			password : hash,
			email : user.email.toLowerCase(),
			phone : user.phone,
			manager : user.manager
		});

		newUser.save(function(err) {
			if (err) return next(err);
			next(null);
		});
	});
};

exports.findUser = function(id, next) {
	User.find({$or:[{username: id.toLowerCase()}, {email: id.toLowerCase()}]}, function(err, user) {
		if (user.length === 0) user = null;
		else user = user[0]; // assuming that usernames are unique
		return next(err, user);
	});
};

// we're assuming that usernames can look like emails, otherwise we might as well use findUser
exports.existingUsername = function(username, next) {
	User.findOne({username: username.toLowerCase()}, function(err, user) {
		next(err, user);
	});
};

exports.existingEmail = function(email, next) {
	User.findOne({email: email.toLowerCase()}, function(err, user) {
		next(err, user);
	});
};