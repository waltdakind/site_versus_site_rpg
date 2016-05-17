var awis = require('awis');
var characterCreate=require("../controllers/character.js");
var mons = require("../model/char_seq.js");

var client = awis({
  key: 'AKIAJNC4TRJ5ET64K3UQ',
  secret: '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'});

var playerCharacters=[];
var charCount=0;

module.exports=function(app){
	app.post('/api/characters',function(req,res){

		var URL = req.body;

		characterCreate.createCharacter(URL,app,playerCharacters,function(x){
			mons.sync().then(function () {
				// Table created
				return mons.create({
				class:    x[0].class,
				HP:   x[0].HP,
				currentHP:  x[0].currentHP,
				STR:  x[0].STR,
				INT:  x[0].INT,
				dodge:  x[0].dodge,
				});
			});
		});
		
		res.redirect('/');})
}