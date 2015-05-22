var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var purchaseSchema = new Schema({
	user_id : {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required : "no associated user"
	},
	date : {
		type : Date,
		default : Date.now
	},
	paymentMethod : String
});

var returnSchema = new Schema({
	purchase_id : {
		type: mongoose.Schema.Types.ObjectId,
		ref : "Purchase",
		require: "no associated purchase"
	},
	date : {
		type : Date,
		default : Date.now
	}
});

var Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = {
	Purchase: Purchase
};