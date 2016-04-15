var express = require('express');
var app = express();

app.get('/', function (req, res) {
  var name = process.env.NAME || 'unknown';
  res.send('Express JS says "Hello ' + name + '"!');
});

var products = [
  {"id": 1, "name": "Apples"},
  {"id": 2, "name": "Pears"},
  {"id": 3, "name": "Lemons"}
];

app.get('/products', function (req, res){
  res.send(products);
});

app.get('/products/:id', function (req, res){
  res.send(products[req.params.id]);
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", port, app.settings.env);
});
