// Dependencies
var path = require('path');

// Routing
module.exports = function(app){
	// Temp route to start page, will be joined as one page soon
	app.get('/battle', function(req,res){
		res.sendFile(path.join(__dirname + '/../../public/start.html'));
	});
	// Default route for home page
	app.use(function(req,res){
		res.sendFile(path.join(__dirname + '/../../public/index.html'));
	});
}