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
	address : String,
	city : String,
	created: {type: Date, default: Date.now}
});

userSchema.path('email').validate(function(value, next) {
	userService.findUser(value, function(err, user) {
		if (err) {
			console.log(err);
			return next(false);
		}
		next(!user);
	});	
}), 'That email is already in use');

var User = mongoose.model('User', userSchema);

module.exports = {
	User: User
};