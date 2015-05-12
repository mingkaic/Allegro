var express = require('express');
var app = express();
var itemService = require('../services/item-service');

// obtain all items from item collection
app.get('/itemlist', function(req, res) {
	itemService.findAll(function(err, docs) {
		if (err) console.log(err);
		res.json(docs);
	});
});

// add data
app.post('/itemlist', function(req, res) {
	itemService.addItem(req.body, function(err) {
		if (err) return res.json(err);
	});
	res.json(null);
});

// remove data
app.delete('/itemlist/:id', function(req, res) {
	var id = req.params.id;
	itemService.removeItem(id, function(err) {
		if (err) return res.json(err);
	});
	res.json(null);
});

// search data
app.get('/itemlist/:id', function(req, res) {
	var id = req.params.id;
	itemService.findItem(id, function(err, docs) {
		if (err) console.log(err);
		res.json(docs);
	});
});

// update data
app.put('/itemlist/:id', function(req, res) {
	itemService.findAndModify(req, function(err) {
		if (err) return res.json(err);
	});
	res.json(null);
});

module.exports = app;