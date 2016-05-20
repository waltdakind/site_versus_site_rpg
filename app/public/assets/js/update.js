$( document ).ready(function() {

var party = 0;
var team = [];
var realTeam = [];

$("#formValidate").validate({
	rules: {
		curl: {
			required: true,
			url:true
		},
	},
	//For custom messages
	messages: {
	curl: "Enter your site as: http://example.com or http://www.example.com",
	},
	errorElement : 'div',
	errorPlacement: function(error, element) {
		var placement = $(element).data('error');
		if (placement) {
		$(placement).append(error)
		} else {
		error.insertAfter(element);
		}
	},
	success: "valid",

	submitHandler: function(form) {

	var input = $("#curl").val();

		if (team.length < 5){

			console.log(party);

			var input = $("#curl").val();

			$("#curl").val("http://");

			party++;

			team.push(input);

			console.log("Squad :" + team);

			var newURL = cleanURL(input);

			console.log(newURL);
			
			var currentURL = window.location.origin;
			$.post(currentURL + "/api/characters", newURL, function(data){
				// Open Stats Modal
				$('#modal1').openModal({
					dismissible: false, // Modal canNOT be dismissed by clicking outside of the modal
					opacity: .5, // Opacity of modal background 
					in_duration: 300, // Transition in duration
					out_duration: 200, // Transition out duration
					ready: function () { // Callback for Modal open
						$("#modHead").text("Do you want " + newURL + " on your team?");
						$("#modTxt").html("<ul> <li>Class: " + data[party-1].class + "</li> <li>HP: " + data[party-1].HP + "</li> <li>STR: " + data[party-1].STR + "</li> <li>INT: " + data[party-1].INT + "</li> <li>Dodge: " + data[party-1].dodge + "</li> </ul>");
					},
					complete: function() { // Callback for Modal close
						data[party-1].attack=function(){
							return (20+this.STR)+this.ATKbuff;}
						data[party-1].special=findMySpec(data[party-1].class);
						realTeam.push(data[party-1]);
					},
				});

				$('.A').on('click', function() {
					$('.circle'+(party)+'').html("<img src='"+input+"/favicon.ico' alt='' class='favico"+(party)+" animated bounce'>");
				});
				$('.D').on('click', function() {
					switch (party){
						case 0:
							party = 0;
							break;
						case 1:
							party = party - 1;
							break;
						case 2:
							party = 1;
							break;
						case 3:
							party = 2;
							break;
					}
					
					console.log("Nah bro...");
				});

			});

			if (team.length == 4){
				// console.log("2" +team.length);
				startGame(realTeam);
			}

			return false;

		form.submit(function() {
			return false;
		});

		} 
	}
});

function startGame(realTeam) {
	$(".topRow").empty();
	$(".topRow").html("<h1 class='center-align animated bounce' id='animateh1'>ROUTE 1</h1>");
	$(".topRow").animate({
		opacity: 1,
		}, 1500, function() {
			console.log("Complete!")
	});

	$(".midRow").empty();
	$(".midRow").addClass("centerDat invs");
	$(".midRow").html("<div class='circle5'> <img src='https://www.seeklogo.net/wp-content/uploads/2015/09/new-google-favicon-logo.png' alt='' class='favico5 animated bounce' class='center'></div>");
	$(".midRow").animate({
		opacity: 1,
		}, 1500, function() {
			console.log("Complete!")
	});

	// $(".invs").animate({
	// 	opacity: 1,
	// 	}, 1500, function() {
	// 		console.log("Complete!")
	// });

	startRound(realTeam,boss,1);
}

function cleanURL(input){
	var headLess = input.split("://");
	console.log(headLess);
	var subHead = headLess[1].split(".");
	console.log(subHead);
	if ( subHead[0] == "www" ){
		var newURL = (subHead[1] + "." + subHead[2]).toString();
	} else {
		var newURL = (subHead[0] + "." + subHead[1]).toString();
	}
	return (newURL);
}

var boss={
	currentHP:9800,
	HP:9800,
	STR: 7,
	INT: 18,
	special:function(){
        return this.INT*this.INT;},
    attack:function(){
      	return 20+this.STR*2;}
}

var startRound = function(players,boss,turn){
	console.log(turn);
	if(turn<=players.length){
		if(players[turn-1].currentHP>0){
			players[turn-1].turn=true;
			playerMove(turn);
			return;}
		else{
			turn+=1;
			startRound(players,boss,turn);
			return;}}
	if(turn>=5){
		bossAI(players,boss);}}

var playerMove = function(turn){
	console.log(realTeam);
	var playerNum=turn-1;
	$(".menu"+turn).animate({
		opacity: 1,
		}, 1500, function() {});
	$(".menu"+turn+" .atkBtn").bind("click",function(){
		boss.currentHP-=realTeam[playerNum].attack();
		console.log(boss.currentHP);
		$(".menu"+turn).animate({
			opacity: 0,
			}, 1500, function() {});
		$(".menu"+turn+" .atkBtn").unbind("click");
		$(".menu"+turn+" .spcBtn").unbind("click");
		$(".menu"+turn+" .defBtn").unbind("click");
		if(boss.currentHP<=0){
			$("#animateh1").text("YOU WIN!");
			return;}
		startRound(realTeam,boss,turn+1);})

	$(".menu"+turn+" .spcBtn").bind("click",function(){
		realTeam[playerNum].special(realTeam,boss,realTeam[playerNum].INT,realTeam[playerNum].STR);
		console.log(boss.currentHP);
		$(".menu"+turn).animate({
			opacity: 0,
			}, 1500, function() {});
		$(".menu"+turn+" .atkBtn").unbind("click");
		$(".menu"+turn+" .spcBtn").unbind("click");
		$(".menu"+turn+" .defBtn").unbind("click");
		if(boss.currentHP<=0){
			$("#animateh1").text("YOU WIN!");
			return;}
		startRound(realTeam,boss,turn+1);})

	$(".menu"+turn+" .defBtn").bind("click",function(){
		$(".menu"+turn).animate({
			opacity: 0,
			}, 1500, function() {});
		$(".menu"+turn+" .atkBtn").unbind("click");
		$(".menu"+turn+" .spcBtn").unbind("click");
		$(".menu"+turn+" .defBtn").unbind("click");
		startRound(realTeam,boss,turn+1);})}

var bossAI=function(players,boss){
	if(parseInt(Math.random()*2)==1){
		var threatRange=0;
			var possibleTargets=[];
			for(var i=0;i<players.length;i++){
				threatRange+=players[i].currentHP;
				possibleTargets.push(threatRange);}
			randomNumber=((Math.random()*threatRange)+1);
			randomNumber=parseInt(randomNumber);
			console.log(possibleTargets);
			for(var i=0;i<possibleTargets.length;i++){
				if(randomNumber<=possibleTargets[i]){
					console.log("Attacking target "+i);
					players[i].currentHP-=boss.attack(players[i]);
					startRound(players,boss,1);
					return;}}}
	else{
		var threatRange=0;
		var possibleTargets=[];
		for(var i=0;i<players.length;i++){
			threatRange+=players[i].currentHP;
			possibleTargets.push(threatRange);}
		randomNumber=((Math.random()*threatRange)+1);
		randomNumber=parseInt(randomNumber);
		console.log(possibleTargets);
		for(var i=0;i<possibleTargets.length;i++){
			if(randomNumber<=possibleTargets[i]){
				console.log("Special attacking target "+players[i].class);
				players[i].currentHP-=boss.special(players[i]);
				winLoss(players,boss);
				return;}}}}

var playersLoss=function(players,boss){
	var dead=0;
	for(var i=0;i<players.length;i++){
		if(players[i].currentHP<=0){
			dead+=1;}}
	if(dead==4){
		$("#animateh1").text("YOU LOSE! TRY AGAIN!");
		return;}
	else{
		startRound(players,boss,1);}}

var findMySpec=function(clasz){
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
          boss.currentHP-=(50+INT);}
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
        break;}}
  
});