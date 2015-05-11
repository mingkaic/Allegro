var express = require('express');

var mongojs = require('mongojs');
var itemdb = mongojs('itemlist', ['itemlist']);

var app = express();

// obtain mongodb data
app.get('/itemlist', function(req, res) {
	itemdb.itemlist.find(function(err, docs) {
		console.log(docs);
		res.json(docs);
	});
});

// add data
app.post('/itemlist', function(req, res) {
	console.log(req.body);

	itemdb.itemlist.insert(req.body, function(err, doc) {
		res.json(doc);
	});
});

// remove data
app.delete('/itemlist/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	itemdb.itemlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	})
});

// search data
app.get('/itemlist/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);

	itemdb.itemlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
});

// update data
app.put('/itemlist/:id', function(req, res) {
	var id = req.params.id;
	console.log(req.body.title);

	itemdb.itemlist.findAndModify({
		query: {_id: mongojs.ObjectId(id)},
		update: { // getting data from request body
				 $set: {title: req.body.title, 
						author: req.body.author, 
						price: req.body.price, 
						stock: req.body.stock, 
						category: req.body.category,
						taxable: req.body.taxable}
				},
		new: true}, 
		function(err, doc) {
			res.json(doc);
		}
	);
});

module.exports = app;