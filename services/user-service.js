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
			address : user.address,
			city : user.city,
			manager : user.manager
		});

		newUser.save(function(err) {
			if (err) return next(err);
			next(null);
		});
	});
}

exports.findUser = function(email, next) {
	User.findOne({email: email.toLowerCase()}, function(err, user) {
		next(err, user);
	});
}