var express = require('express');
var app = express();
var port = 2000;

app.use(express.static(__dirname+'/public'));
app.listen(port);

console.log("listening at port "+port);