var awis = require('awis');
var client = awis({
  key: 'AKIAJNC4TRJ5ET64K3UQ',
  secret: '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'});

var characterCreate={
  findMyCat:function(data){
    var catz = data.related.categories.categoryData;
    if (catz.length > 1){
      var dogz = data.related.categories.categoryData[0].absolutePath;
      var optz = dogz.split("/");
    } else {
      var dogz = data.related.categories.categoryData.absolutePath;
      var optz = dogz.split("/");
    }
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
        break;
      default:
        classz = "Warrior";
        break;      
    }
    return optz[1], classz;},

  findMySpec:function(clasz){
    switch (clasz){
      case "Bard":
        return function(playerCharacters,boss,INT,STR){
          for(var i=0;i<playerCharacters.length;i++){
            playerCharacters[i].dodge+=INT;
            playerCharacters[i].dodgeBuff+=INT;}}
        break;
      case "Gunslinger":
        return function(playerCharacters,boss,INT,STR){
          var damage=0;
          for(var i=0;i<INT;i++){
            damage+=10;}
          boss.currentHP-=damage;}
        break;
      case "Paladin":
        return function(playerCharacters,boss,INT,STR){
          this.currentHP+=INT*5;
          boss.currentHP-=(20+STR);}
        break;
      case "Berserker":
        return function(playerCharacters,boss,INT,STR){
          this.ATKbuff+=STR*2;}
        break;
      case "Wizard":
        return function(playerCharacters,boss,INT,STR){
          var damage=0;
          for(var i=0;i<INT;i++){
            damage+=INT*2;}
          boss.currentHP-=damage;}
        break;
      case "Thief":
        return function(playerCharacters,boss,INT,STR){
          boss.currentHP-=(25+STR+(INT*2));}
        break;
      case "Healer":
        return function(playerCharacters,boss,INT,STR){
          for(var i=0;i<playerCharacters.length;i++){
            playerCharacters[i].currentHP+=INT*10;}}
        break;
      case "Ranger":
        return function(playerCharacters,boss,INT,STR){
          return (50+INT);}
        break;
      case "Explorer":
        return function(playerCharacters,boss,INT,STR){
          this.ATKbuff+=INT/2;
          this.DEFbuff+=INT/2;}
        break;
      case "Monk":
        return function(playerCharacters,boss,INT,STR){
          var damage=0;
          for(var i=0;i<INT;i++){
            damage+=INT+STR;}
          boss.currentHP-=damage;}
        break;
      case "Sorcerer":
        return function(playerCharacters,boss,INT,STR){
          boss.currentHP-=INT*INT;}
        break;
      case "Knight":
        return function(playerCharacters,boss,INT,STR){
          this.DEFbuff+=STR*INT;}
        break;
      case "Druid":
        return function(playerCharacters,boss,INT,STR){
          for(var i=0;i<playerCharacters.length;i++){
            playerCharacters[i].ATKbuff+=INT;
            playerCharacters[i].DEFbuff+=INT;
            playerCharacters[i].currentHP+=INT*5;}}
        break;
      case "Alchemist":
        return function(playerCharacters,boss,INT,STR){
          this.ATKbuff+=INT*5;
          this.currentHP+=INT*10;}
        break;
      case "Warrior":
        return function(playerCharacters,boss,INT,STR){
          boss.currentHP-=STR*STR;}
        break;}},

  findMyHeart:function(data){
    if(parseInt(Math.abs(parseInt(data.trafficData.usageStatistics.usageStatistic[0].pageViews.perMillion.value.replace(/,/g,""))*parseInt(data.trafficData.usageStatistics.usageStatistic[0].pageViews.perMillion.delta)/100))<1000){
        console.log("Hello");
        if(parseInt(data.trafficData.usageStatistics.usageStatistic[0].reach.perMillion.value.replace(/,/g,""))>8000){
            return(parseInt(Math.abs(parseInt(data.trafficData.usageStatistics.usageStatistic[0].reach.perMillion.value.replace(/,/g,""))*parseInt(data.trafficData.usageStatistics.usageStatistic[0].reach.perMillion.delta)/100)))}
        else{
          return(parseInt(data.trafficData.usageStatistics.usageStatistic[0].reach.perMillion.value.replace(/,/g,"")));}}
      else{
        console.log("Goodbye");
        return(parseInt(Math.abs(parseInt(data.trafficData.usageStatistics.usageStatistic[0].pageViews.perMillion.value.replace(/,/g,""))*parseInt(data.trafficData.usageStatistics.usageStatistic[0].pageViews.perMillion.delta)/100)));}},

  Character:function(data){
    if (data == undefined){
      this.class = 'undefined'
    } else {
      this.class=characterCreate.findMyCat(data),
      this.HP=characterCreate.findMyHeart(data),
      this.currentHP=this.HP,
      this.STR=data.contentData.linksInCount.length,
      this.INT=parseInt(data.trafficData.usageStatistics.usageStatistic[0].pageViews.perUser.value),
      this.dodge=parseInt(parseInt(data.contentData.speed.percentile)/4),
      this.ATKbuff=0,
      this.DEFbuff=0,
      this.DodgeBuff=0,
      this.special=characterCreate.findMySpec(this.class),
      this.attack=function(){
        return (20+this.STR)+this.ATKbuff;},
      this.defend=function(){
        return (4+DEFbuff);}
      }
    },


  createCharacter:function(newURL,app,playerCharacters,cb){
    client({'Action': 'UrlInfo','Url': newURL,'ResponseGroup': 'ContentData,Related,TrafficData,LinksInCount'}, function (err, data){
        if (data.related.categories == undefined){

        }
        console.log(data.related.categories.categoryData);
        playerCharacters.push(new characterCreate.Character(data));
        cb(playerCharacters);
        console.log(playerCharacters);
        app.get('/',function(req,res){
          res.json(data);
        })});}}

module.exports=characterCreate;
