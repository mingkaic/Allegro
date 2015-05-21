var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var addressSchema = new Schema({
	user_ud : {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required : "no associated user"
	},
	building_number : {
		type : String,
		required : "please leave your building number"
	},
	street : {
		type : String,
		required : "please leave your street name"
	},
	city : {
		type : String,
		required : "please record your city of residence"
	},
	zip_code : {
		type : String,
		required : "please leave your Zip Code"
	},
	state_provice : String,
	country : {
		type : String,
		required : "please record your country of residence"
	}
});

var Addr = mongoose.model('Addr', addressSchema);

module.exports = {
	Addr: Addr
};