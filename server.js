// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var awis = require('awis');

// Express Config
var app = express();
var PORT = process.env.PORT || 5000;

// BodyParser makes it easy for our server to interpret data sent to it.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
 
var client = awis({
  key: 'AKIAJNC4TRJ5ET64K3UQ',
  secret: '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'
});
 
client({
  'Action': 'UrlInfo',
  'Url': '',
  'ResponseGroup': 'Rank,Speed,Categories,Related,TrafficData,ContentData'
}, function (err, data) {
  // ... 
  console.log(data);

  	app.get('/api/data', function(req, res){
		res.json(data);
	});
});

//Listener 
app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});