var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username : {
		type: String,
		require: true
	},
	password : String,
	email : String,
	phone : String,
	address : String,
	city : String,
	created: {type: Date, default: Date.now}
});

var User = mongoose.model('User', userSchema);

module.exports = {
	User: USer
};