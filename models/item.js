var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
	title : {
		type : String,
		required : "please enter the title"
	},
	author : {
		type : String,
		required : "please enter the author"
	},
	price : {
		type : Number,
		required : "please enter the price"
	},
	stock : {
		type : Number,
		default : 0
	},
	category : String,
	isTaxable : Boolean,
	created : {
		type : Date,
		default : Date.now
	}
});

var Item = mongoose.model('Item', itemSchema);

module.exports = {
	Item: Item
};