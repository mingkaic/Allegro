var mongojs = require('mongojs');
var Item = require('../models/item').Item;

exports.findAll = function(next) {
	Item.find({}, function(err, docs) {
		next(err, docs);
	});
};

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

exports.removeItem = function(itemid, next) {
	Item.remove({_id: mongojs.ObjectId(itemid)}, function(err) {
	    if (err) return next(err);
	    next(null);
	});
};

exports.findItem = function(itemid, next) {
	Item.findOne({_id: mongojs.ObjectId(itemid)}, function(err, docs) {
		next(err, docs);
	});
};

exports.changeItem = function(req, next) {
	var id = mongojs.ObjectId(req.params.id);
	Item.update({_id: id}, {
		title: req.body.title,
		author: req.body.author,
		price: req.body.price,
		stock: req.body.stock,
		category: req.body.category,
		taxable: req.body.taxable
	}, function(err, numberAffected, rawResponse) {
		next(err);
	});
};

exports.findOnCriteria = function(criteria, next) {
	var searchObj = {
		title: criteria.title,
		author: criteria.author,
		category: criteria.category
	};
	if (criteria.title === "") delete searchObj.title;
	if (criteria.author === "") delete searchObj.author;
	if (criteria.category === "") delete searchObj.category;
	if (!isNaN(criteria.priceMin)) {
		searchObj.price = {};
		searchObj.price.$gte = criteria.priceMin;
	}
	if (!isNaN(criteria.priceMax)) {
		if (typeof searchObj.price == 'undefined') searchObj.price = {};
		searchObj.price.$lte = criteria.priceMax;
	}

	Item.find(searchObj, function(err, docs) {
		next(err, docs);
	});
};