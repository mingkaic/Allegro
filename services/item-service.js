var Item = require('../models/item').Item;

exports.addItem = function(item, next) {
	var newItem = new Item({
		UPC : "",
		storeID : "",
		title : item.title,
		author : item.author,
		price : item.price,
		stock : item.stock,
		category : item.category,
		isTaxable : item.taxable
	});

	newItem.save(function(err) {
		if (err) return next(err);
		next(null);
	});
};

exports.removeItem = function(item, next) {

};

exports.findAll = function(next) {
	Item.find({}, function(err, docs) {
		next(err, docs);
	});
};
/*
exports.updateItem = function(item, next) {
	User.findOne({email: email.toLowerCase()}, function(err, user) {
		next(err, user);
	});
};*/