var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/itemlist');

var db = mongoose.connection;

db.on('error', function(err) {
	console.log('connection error', err);
});

db.once('open', function() {
	console.log('connected.');
});

var Schema = mongoose.Schema;

var itemSchema = new Schema({
	UPC : {
		type: String,
		require: true
	},
	storeID : {
		type: String,
		require: true
	},
	title : String,
	author : String,
	price : Number,
	stock : Number,
	category : String,
	isTaxable : Boolean
});

var userSchema = new Schema({
	username : {
		type: String,
		require: true
	},
	password : String,
	email : String,
	phone : String,
	address : String,
	city : String
});

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