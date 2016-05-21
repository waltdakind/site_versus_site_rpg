$( document ).ready(function() {

var party = 0;
var partyWait = 0;
var team = [];
var realTeam = [];
var crew = [];

//LAUNCH INSTRUCTION MODAL
$( document ).ready(function(){
	$("#infoModal").openModal();
});
//=========================

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

			var newURL = cleanURL(input);

			console.log(newURL);
			
			var currentURL = window.location.origin;
			$.post(currentURL + "/api/characters", newURL, function(data){
				console.log(data);
				if (data == ' '){
					$("#undefModal").openModal();
				} else {
				// Open Stats Modal
				$('#modal1').openModal({
					dismissible: false, // Modal canNOT be dismissed by clicking outside of the modal
					opacity: .5, // Opacity of modal background 
					in_duration: 300, // Transition in duration
					out_duration: 200, // Transition out duration
					ready: function () { // Callback for Modal open
						partyWait++;
						team.push(input);
						console.log("Squad :" + team);

						$("#modHead").text("Do you want " + newURL + " on your team?");
						$("#modTxt").html("<ul> <li>Class: " + data.class + "</li> <li>HP: " + data.HP + "</li> <li>STR: " + data.STR + "</li> <li>INT: " + data.INT + "</li> <li>Dodge: " + data.dodge + "</li> </ul>");
					},
					complete: function() { // Callback for Modal close
							data.attack=function(){
								return (20+this.STR)+this.ATKbuff;}
							data.special=findMySpec(data.class);
							realTeam.push(data);
						if (partyWait > 4){
							startGame(realTeam);
						}
					},
				});
				party++;
				$('.A').bind("click", function() {
					if (party == 4){
						partyWait++;
						console.log(partyWait);
					}
					$('.circle'+(party)+'').html("<img src='"+input+"/favicon.ico' alt='' class='favico"+(party)+" animated bounce'>");
					$('.A').unbind("click");
				});
				$('.D').bind('click', function() {
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
						case 4:
							party = 3;
							break;
					}
					
					console.log("Nah bro...");
					$('.D').unbind('click');
				});
				}
			});

			return false;

		form.submit(function() {
			return false;
		});

		} 
	}
});

function startGame(realTeam) {
	$(".topRow").empty();
	$(".topRow").html("<h1 class='center-align animated bounce' id='animateh1'>ROUND 1</h1>");
	$(".topRow").animate({
		opacity: 1,
		}, 1500, function() {
			console.log("Complete!")
	});

	$(".midRow").empty();
	$(".midRow").addClass("centerDat invs");
	$(".midRow").html("<div class='boss circle5 z-depth-4'> <img src='https://www.seeklogo.net/wp-content/uploads/2015/09/new-google-favicon-logo.png' alt='' class='favico5 animated bounce' class='center'></div>");
	$(".boss").append("<h4 class='center-align HPdisplay HP5'></h4> <div class='progress'> <div class='determinate bar5' style='width: 100%'> </div> </div>");
	$(".midRow").animate({
		opacity: 1,
		}, 1500, function() {
			console.log("Complete!")
	});

	$(".progress").css('display', 'block');

	startRound(realTeam,boss,1);
}

function cleanURL(input){
	var headLess = input.split("://");
	console.log(headLess);
	var subHead = headLess[1].split(".");
	console.log(subHead);
	if ( subHead[0] == "www" ){
		var newURL = (subHead[1] + "." + subHead[2]).toString();
		crew.push(subHead[1]);
	} else {
		var goCheck = subHead[1];
		if (goCheck == "go"){
			var newURL = (subHead[0] + "." + subHead[1] + "." + subHead[2]).toString();
			crew.push(subHead[0]);
		} else {
		var newURL = (subHead[0] + "." + subHead[1]).toString();
		crew.push(subHead[0]);
		}
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
	
	$(".HPdisplay").css('display', 'block');
	$(".HP5").css('padding-top', '7%');
	$(".HP"+turn).text(realTeam[playerNum].currentHP);

	$(".menu"+turn).animate({
		opacity: 1,
		}, 1500, function() {});
	$(".menu"+turn+" .atkBtn").bind("click",function(){
		boss.currentHP-=realTeam[playerNum].attack();
		console.log(boss.currentHP);

		var bossNewHP = (boss.currentHP);
		var bossOldHP = (boss.HP);
		var bossHPpercent = ((bossNewHP/bossOldHP) * 100);
		$(".HP5").text(bossNewHP);
		$(".bar5").css('width', bossHPpercent+'%');

		if (bossHPpercent > 50) {
			$(".bar5").css('background-color', '#26A653');
		} else if (bossHPpercent > 20) {
			$(".bar5").css('background-color', '#DAD300');
		} else {
			$(".bar5").css('background-color', '#F53240');
		}

		Materialize.toast(realTeam[playerNum].attack() + ' damage inflicted on the boss', 3000);
		$(".menu"+turn).animate({
			opacity: 0,
			}, 1500, function() {});
		$(".menu"+turn+" .atkBtn").unbind("click");
		$(".menu"+turn+" .spcBtn").unbind("click");
		$(".menu"+turn+" .defBtn").unbind("click");
		if(boss.currentHP<=0){
			$("#animateh1").text("YOU WIN!");
			$(".HP5").text(0);
			$(".circle5").html("<img src='assets/images/error2.png' alt='' class='favico5 animated bounce'>");
			return;}
		startRound(realTeam,boss,turn+1);})

	$(".menu"+turn+" .spcBtn").bind("click",function(){
		realTeam[playerNum].special(realTeam,boss,realTeam[playerNum].INT,realTeam[playerNum].STR);
		Materialize.toast(crew[playerNum] + ' used their special!', 3000);
		console.log(boss.currentHP);
		$(".menu"+turn).animate({
			opacity: 0,
			}, 1500, function() {});
		$(".menu"+turn+" .atkBtn").unbind("click");
		$(".menu"+turn+" .spcBtn").unbind("click");
		$(".menu"+turn+" .defBtn").unbind("click");
		if(boss.currentHP<=0){
			$("#animateh1").text("YOU WIN!");
			$(".HP5").text(0);
			$(".circle5").html("<img src='assets/images/error2.png' alt='' class='favico5 animated bounce'>");
			return;}
		startRound(realTeam,boss,turn+1);})

	$(".menu"+turn+" .defBtn").bind("click",function(){
		Materialize.toast(crew[playerNum] + ' defended itself.', 3000);
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
					Materialize.toast("The boss attacked " + crew[i] + ' !', 3000);
					if((Math.random()*100)+1>players[i].dodge){
						players[i].currentHP-=boss.special(players[i]);
						var playerNewHP = (players[i].currentHP-=boss.special(players[i]));
						var playerOldHP = (players[i].HP);
						var HPpercent = ((playerNewHP/playerOldHP) * 100);
						$(".HP"+(i+1)).text(playerNewHP);
						$(".bar"+(i+1)).css('width', HPpercent+'%');

						if (HPpercent > 50) {
							$(".bar"+(i+1)).css('background-color', '#26A653');
						} else if (HPpercent > 20) {
							$(".bar"+(i+1)).css('background-color', '#DAD300');
						} else {
							$(".bar"+(i+1)).css('background-color', '#F53240');
						}
						playersLoss(players,boss);
						return;}
					else{
						console.log("PLAYER DODGED!");
						playersLoss(players,boss);
						return;}}}}
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
				Materialize.toast("The boss used a special attack on " + crew[i] + ' !', 3000);
				if((Math.random()*100)+1>players[i].dodge){
					players[i].currentHP-=boss.special(players[i]);
					var playerNewHP = (players[i].currentHP-=boss.special(players[i]));
					var playerOldHP = (players[i].HP);
					var HPpercent = ((playerNewHP/playerOldHP) * 100);
					$(".bar"+(i+1)).css('width', HPpercent+'%');
					if (HPpercent > 50) {
						$(".bar"+(i+1)).css('background-color', '#26A653');
					} else if (HPpercent > 20) {
						$(".bar"+(i+1)).css('background-color', '#DAD300');
					} else {
						$(".bar"+(i+1)).css('background-color', '#F53240');
					}
					playersLoss(players,boss);
					return;}
				else{
					console.log("PLAYER DODGED!");
					playersLoss(players,boss);
					return;}}}}}

var playersLoss=function(players,boss){
	var dead=0;
	for(var i=0;i<players.length;i++){
		if(players[i].currentHP<=0){
			$(".HP"+(i+1)).text(0);
			$(".circle"+(i+1)).html("<img src='assets/images/error2.png' alt='' class='favico"+(i+1)+" animated bounce'>");
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
          	if(playerCharacters[i].currentHP<playerCharacters[i].HP){
            	playerCharacters[i].currentHP+=INT*10;}}}
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