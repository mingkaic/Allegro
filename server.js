var express = require('express');
var app = express();
var port = 2000;

app.use(express.static(__dirname+'/public'));
app.listen(port);

app.get('/itemlist', function(req, res) {
	var item1 = {
		title: "Concerto no.1",
		author: "Bach",
		price: 17.90,
		stock: 5,
		category: "classical"
	};

	var item2 = {
		title: "Concerto no.2",
		author: "Bach",
		price: 13.90,
		stock: 10,
		category: "classical"
	};

	var item3 = {
		title: "I will always love you",
		author: "Celine Dion",
		price: 19.90,
		stock: 15,
		category: "classical"
	};

	var itemlist = [item1, item2, item3];
	res.json(itemlist);
});

console.log("listening at port "+port);