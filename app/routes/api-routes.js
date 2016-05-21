var awis = require('awis');
var characterCreate=require("../controllers/character.js");
var pastSites = require("../model/char_seq.js");

var client = awis({
  key: 'AKIAJNC4TRJ5ET64K3UQ',
  secret: '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'});

var playerCharacters=[];
var charCount=0;

module.exports=function(app){
	app.post('/api/characters',function(req,res){

		var URL = JSON.stringify(req.body);
		var newb = URL.split("{");
		var newb2 = newb[1].split(":");
		var newb3 = newb2[0].split('"');
		var yes = newb3[1];
		pastSites.find({raw:true,where:{site:yes}}).then(function(y){
			if(y!=null){
				console.log(y);
				res.json(y);}
			else{
				console.log("Why?");
			characterCreate.createCharacter(yes,app,playerCharacters,function (x){
				pastSites.sync().then(function (){
					// Table created
					return pastSites.create({
					site: x.site,
					class: x.class,
					HP: x.HP,
					currentHP: x.currentHP,
					STR: x.STR,
					INT: x.INT,
					dodge: x.dodge,
					});
				});
			console.log(x);
			res.json(x);
			});}})
	});
}