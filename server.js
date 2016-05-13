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
  secret: '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'});

var playerCharacters=[];
var buff=1;

function findMyCat (data){
  var catz = data.related.categories.categoryData[0].absolutePath;
  var optz = catz.split("/");
  switch (optz[1]) {
    case 'Arts':
      classz = "Bard";
      break;
    case 'Games':
      classz = "Gunslinger";
      break;
    case 'Kids_and_Teens':
      classz = "Paladin";
      break;
    case 'Shopping':
      classz = "Berserker";
      break;
    case 'Reference':
      classz = "Wizard";
      break;
    case 'Business':
      classz = "Thief";
      break;
    case 'Health':
      classz = "Healer";
      break;
    case 'News':
      classz = "Ranger";
      break;
    case 'Regional_and_World':
      classz = "Explorer";
      break;
    case 'Society':
      classz = "Monk";
      break;
    case 'Computers':
      classz = "Sorcerer";
      break;
    case 'Home':
      classz = "Knight";
      break;
    case 'Recreation':
      classz = "Druid";
      break;
    case 'Science':
      classz = "Alchemist";
      break;
    case 'Sports':
      classz = "Warrior";
      break;}
  return optz[1], classz;}

function findMyHeart(data){
  if(parseInt(Math.abs(parseInt(data.trafficData.usageStatistics.usageStatistic[0].pageViews.perMillion.value.replace(/,/g,""))*parseInt(data.trafficData.usageStatistics.usageStatistic[0].pageViews.perMillion.delta)/100))<1000){
      return(parseInt(data.trafficData.usageStatistics.usageStatistic[0].reach.perMillion.value.replace(/,/g,"")));}
    else{
      return(parseInt(Math.abs(parseInt(data.trafficData.usageStatistics.usageStatistic[0].pageViews.perMillion.value.replace(/,/g,""))*parseInt(data.trafficData.usageStatistics.usageStatistic[0].pageViews.perMillion.delta)/100)));}}

function Character(data){
  this.class=findMyCat(data),
  this.HP=findMyHeart(data),
  this.STR=data.contentData.linksInCount.length,
  this.INT=parseInt(data.trafficData.usageStatistics.usageStatistic[0].pageViews.perUser.value),
  this.dodge=parseInt(parseInt(data.contentData.speed.percentile)/4),
  this.special=function(buff){
    console.log("BANG!");},
  this.attack=function(buff){},
  this.defend=function(buff){}
  }


var createCharacter=function(newURL){
  client({'Action': 'UrlInfo','Url': newURL,'ResponseGroup': 'ContentData,Related,TrafficData,LinksInCount'}, function (err, data){
      playerCharacters.push(new Character(data));
      console.log(playerCharacters);
      app.get('/',function(req,res){
        res.json(data);
      })});}

createCharacter("google.com");

//Listener 
app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});