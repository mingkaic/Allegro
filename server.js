var express = require('express');
var app = express();
var mongojs = require('mongojs');
var itemdb = mongojs('itemlist', ['itemlist']);
var bodyParser = require('body-parser');

var port = Number(process.env.PORT || 3000);

// access static files (html, and angular controller in public)
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json())
app.listen(port);

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
						category: req.body.category}
				},
		new: true}, 
		function(err, doc) {
			res.json(doc);
		}
	);
});

console.log("listening at port "+port);