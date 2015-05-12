var mongoose = require('mongoose');
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
	isTaxable : Boolean,
	created: {type: Date, default: Date.now}
});

var Item = mongoose.model('Item', itemSchema);

module.exports = {
	Item: Item
};