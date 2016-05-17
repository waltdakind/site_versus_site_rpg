var awis = require('awis');
var client = awis({
  key: 'AKIAJNC4TRJ5ET64K3UQ',
  secret: '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'});

var characterCreate={
  findMyCat:function(data){
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
    return optz[1], classz;},

  findMySpec:function(clasz){
    switch (clasz){
      case "Bard":
        return function(playerCharacters,INT){
          for(var i=0;i<playerCharacters.length;i++){
            playerCharacters[i].dodge+=INT;
            playerCharacters[i].dodgeBuff+=INT;}}
        break;
      case "Gunslinger":
        return function(INT){
          var damage=0;
          for(var i=0;i<INT;i++){
            damage+=10;}
          return damage;}
        break;
      case "Paladin":
        return function(INT,STR){
          this.currentHP+=INT*5;
          return (20+STR);}
        break;
      case "Berserker":
        return function(STR){
          this.ATKbuff+=STR*2;}
        break;
      case "Wizard":
        return function(INT){
          var damage=0;
          for(var i=0;i<INT;i++){
            damage+=INT*2;}
          return damage;}
        break;
      case "Thief":
        return function(INT,STR){
          return (25+STR+(INT*2));}
        break;
      case "Healer":
        return function(playerCharacters,INT){
          for(var i=0;i<playerCharacters.length;i++){
            playerCharacters[i].currentHP+=INT*10;}}
        break;
      case "Ranger":
        return function(INT){
          return (50+INT);}
        break;
      case "Explorer":
        return function(INT){
          this.ATKbuff+=INT/2;
          this.DEFbuff+=INT/2;}
        break;
      case "Monk":
        return function(INT,STR){
          var damage=0;
          for(var i=0;i<INT;i++){
            damage+=INT+STR;}
          return damage;}
        break;
      case "Sorcerer":
        return function(INT){
          return INT*INT;}
        break;
      case "Knight":
        return function(STR,INT){
          this.DEFbuff+=STR*INT;}
        break;
      case "Druid":
        return function(playerCharacters,INT){
          for(var i=0;i<playerCharacters.length;i++){
            playerCharacters[i].ATKbuff+=INT;
            playerCharacters[i].DEFbuff+=INT;
            playerCharacters[i].currentHP+=INT*5;}}
        break;
      case "Alchemist":
        return function(INT){
          this.ATKbuff+=INT*5;
          this.currentHP+=INT*10;}
        break;
      case "Warrior":
        return function(STR){
          return STR*STR;}
        break;}},

  findMyHeart:function(data){
    if(parseInt(Math.abs(parseInt(data.trafficData.usageStatistics.usageStatistic[0].pageViews.perMillion.value.replace(/,/g,""))*parseInt(data.trafficData.usageStatistics.usageStatistic[0].pageViews.perMillion.delta)/100))<1000){
        console.log("Hello");
        if(parseInt(data.trafficData.usageStatistics.usageStatistic[0].reach.perMillion.value.replace(/,/g,""))>10000){
            return(parseInt(Math.abs(parseInt(data.trafficData.usageStatistics.usageStatistic[0].reach.perMillion.value.replace(/,/g,""))*parseInt(data.trafficData.usageStatistics.usageStatistic[0].reach.perMillion.delta)/100)))}
        else{
          return(parseInt(data.trafficData.usageStatistics.usageStatistic[0].reach.perMillion.value.replace(/,/g,"")));}}
      else{
        console.log("Goodbye");
        return(parseInt(Math.abs(parseInt(data.trafficData.usageStatistics.usageStatistic[0].pageViews.perMillion.value.replace(/,/g,""))*parseInt(data.trafficData.usageStatistics.usageStatistic[0].pageViews.perMillion.delta)/100)));}},

  Character:function(data){
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
      return (4+DEFbuff);}},


  createCharacter:function(newURL,app,playerCharacters,cb){
    client({'Action': 'UrlInfo','Url': newURL,'ResponseGroup': 'ContentData,Related,TrafficData,LinksInCount'}, function (err, data){
        playerCharacters.push(new characterCreate.Character(data));
        cb(playerCharacters);
        console.log(playerCharacters);
        app.get('/',function(req,res){
          res.json(data);
        })});}}

module.exports=characterCreate;