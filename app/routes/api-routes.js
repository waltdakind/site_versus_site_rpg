var awis = require('awis');
var characterCreate=require("../controllers/character.js")
var client = awis({
  key: 'AKIAJNC4TRJ5ET64K3UQ',
  secret: '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'});

var playerCharacters=[];

module.exports=function(app){
	app.post('/api/characters',function(req,res){
		characterCreate.createCharacter(req.body.URL,app,playerCharacters);
		res.redirect('/');})}