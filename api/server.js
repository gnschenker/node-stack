var request = require('request');
var express = require('express');
var app = express();
var pg = require('pg');
var connString = "postgres://admin:admin@postgres/test";

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

app.get('/projects', function (req, res){
  request('http://domain:3001/projects', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      return body;
    }
    res.status(500).send("error: "+error);
  })
});

//***************************************************************
// PostgreSQL
//***************************************************************

app.get('/foos', function(req, res){
  pg.connect(connString, function(err, client, done) {
    if(err) {
      res.status(500).send('error fetching client from pool: ' + err);
    }
    client.query('SELECT * FROM foo', function(err, result) {
      //call `done()` to release the client back to the pool
      done();
  
      if(err) {
        res.status(500).send('error running query: ' + err);
      }
      console.log(result);
      res.status(200).send(result.rows);
    });
  });
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", port, app.settings.env);
});
