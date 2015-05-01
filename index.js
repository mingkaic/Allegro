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
	title: String,
	author: String,
	price: Number,
	stock: Number,
	category: String
});