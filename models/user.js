var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userService = require('../services/user-service');

var userSchema = new Schema({
	username : {
		type: String,
		require: 'Please enter your username'
	},
	password : {
		type: String,
		required: 'Please enter your password'
	},
	email : {
		type: String,
		required: 'Please enter your email'
	},
	phone : String,
	manager : Boolean,
	created : {
		type : Date,
		default : Date.now
	}
});

userSchema.path('username').validate(function(username, next) {
	userService.existingUsername(username, function(err, user) {
		if (err) {
			console.log(err);
			return next(false);
		}
		next(!user);
	});
}, 'That username is already in use');

userSchema.path('email').validate(function(email, next) {
	userService.existingEmail(email, function(err, user) {
		if (err) {
			console.log(err);
			return next(false);
		}
		next(!user);
	});
}, 'That email is already in use');

var User = mongoose.model('User', userSchema);

module.exports = {
	User: User
};