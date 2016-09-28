var express = require('express');
var tweetz = require('./database');
var path = require('path');

var app = express();
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/../public'));



app.get('/', function(req, res) {
	result = [];

	tweetz.view('sort', 'by_rel', function(err, body) {
  		if (!err) {
    		body.rows.forEach(function(doc) {
      			result.push({id: doc.id, rel: doc.key, text: doc.value});
    		});
  		}
        console.log(result);
        res.render('index', {"tweets": result});
	});
})

module.exports = app;