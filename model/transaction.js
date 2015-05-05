var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var purchaseSchema = new Schema({
	tid : {
		type: String.
		require: true
	},
	date : Date,
	creditCard : String,
	expiryDate : Date
});

var returnSchema = new Schema({
	tid : {
		type: String.
		require: true
	},
	date : Date,
	purchase_tid : {
		type: String,
		ref: 'purchaseSchema'
	}
});