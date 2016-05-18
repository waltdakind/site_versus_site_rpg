$( document ).ready(function() {

var party = 0;
var team = [];

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

		if (party <= 3){
			console.log(party);

			var input = $("#curl").val();

			console.log("YOO its " + input);

			$("#curl").val("http://");

			party++;

			team.push(input);

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
						console.log("Model for: " + (team[party-1]) );
						$("#modHead").text("Do you want " + newURL + " on your team?");
						$("#modTxt").html("<ul> <li>Class: " + data[party-1].class + "</li> <li>HP: " + data[party-1].HP + "</li> <li>STR: " + data[party-1].STR + "</li> <li>INT: " + data[party-1].INT + "</li> <li>Dodge: " + data[party-1].dodge + "</li> </ul>");
					},
					complete: function() { // Callback for Modal close
						
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

			return false;

		form.submit(function() {
			return false;
		});

		if (party = 4){
			startGame();
			return false;
		}

		} else {
			startGame();
		}
	}
});

function startGame() {
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

	$(".invs").animate({
		opacity: 1,
		}, 1500, function() {
			console.log("Complete!")
	});
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


	// // Load in the challenger image
	// // (Boss 1)
	// $('.boss').html(
	// 	"<img src='https://www.seeklogo.net/wp-content/uploads/2015/09/new-google-favicon-logo.png' alt='' class='favico2 animated bounce' class='center'>"
	// );
	
	// function normalstate(norm) {
	// 	$(norm).css({ opacity: "1" });
	// }

	// $('.favico').on('click', function() {
	// 	rocketcss(this,'.favico2', 'rocketPulse');
	// 	$('.favico2').addClass('targetPulse');
	// 	setTimeout(function () {
	// 		normalstate('.favico');
	// 		$('.favico2').removeClass('targetPulse');
	// 	}, 2300);

	// });


	// var party = 0;

	// while (party > 4){

	// 	$.post(currentURL + "/api/characters", newURL,
	// 		function(data){
	// 			// Stats modal
	// 			$('#modal1').openModal();
	// 			$("#modHead").text(data[party].name + " is a great match for you!");
	// 			$("#modImg").html( "<p>" + data[party].HP + "'<p>" );

	// 			$('modal agree button').on('click', function() {
	// 				$('.circle'+(party+1)+'').html("<img src='"+data[party].url+"/favicon.ico' alt='' class='favico animated bounce'>");
	// 			};
	// 		});

	// 	party++;

	// }

	// $('.attack').on('click', function() {

	// 	//USER Attack
	// 	if (boss.dodge < something){
	// 		"attack function"
	// 	} else {
	// 		alert("Attack missed!");
	// 	}

	// 	//BOSS Attack
	// 	if (user.dodge < something){
	// 		"boss attack function"
	// 	} else {
	// 		alert("Attack missed!");
	// 	}

	// });

	// $('.defend').on('click', function() {

	// 	//USER Defend

	// 	//BOSS Defend

	// });

	// $('.special').on('click', function() {

	// 	//USER Special

	// 	//BOSS Special

	// });
    
});