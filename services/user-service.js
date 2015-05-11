var User = require('../models/user').User;

exports.addUser = function(user, next) {
	var newUser = new User({
		username : user.username,
		password : user.password,
		email : user.email.toLowerCase(),
		phone : user.phone,
		address : user.address,
		city : user.city,
	});

	newUser.save(function(err) {
		if (err) return next(err);
		next(null);
	});
}

exports.findUser = function(email, next) {
	User.findOne({email: email.toLowerCase()}, function(err, user) {
		next(err, user);
	});
}