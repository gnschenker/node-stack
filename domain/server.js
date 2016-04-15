var express = require('express');
var app = express();

app.get('/', function (req, res) {
  var name = process.env.NAME || 'unknown';
  res.send('this is the domain service');
});

var projects = [
  {"id": 1, "name": "Heart Beat"},
  {"id": 2, "name": "First Glimmer"},
  {"id": 3, "name": "In the Dawn"}
];

app.get('/projects', function (req, res){
  res.send(projects);
});

app.get('/projects/:id', function (req, res){
  res.send(projects[req.params.id]);
});

var port = process.env.PORT || 3001;
app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", port, app.settings.env);
});
