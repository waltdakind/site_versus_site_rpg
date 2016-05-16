$( document ).ready(function() {

	// Load in the challenger image
	// (Boss 1)
	$('.boss').html(
		"<img src='https://www.seeklogo.net/wp-content/uploads/2015/09/new-google-favicon-logo.png' alt='' class='favico2 animated bounce' class='center'>"
	);
	
	function normalstate(norm) {
		$(norm).css({ opacity: "1" });
	}

	$('.favico').on('click', function() {
		rocketcss(this,'.favico2', 'rocketPulse');
		$('.favico2').addClass('targetPulse');
		setTimeout(function () {
			normalstate('.favico');
			$('.favico2').removeClass('targetPulse');
		}, 2300);

	});

	var currentURL = window.location.origin;

	var party = 0;

	while (party > 4){

		$.post(currentURL + "/api/characters", newURL,
			function(data){
				// Stats modal
				$('#modal1').openModal();
				$("#modHead").text(data[party].name + " is a great match for you!");
				$("#modImg").html( "<p>" + data[party].HP + "'<p>" );

				$('modal agree button').on('click', function() {
					$('.circle'+(party+1)+'').html("<img src='"+data[party].url+"/favicon.ico' alt='' class='favico animated bounce'>");
				};
			});

		party++;

	}

	$('.attack').on('click', function() {

		//USER Attack
		if (boss.dodge < something){
			"attack function"
		} else {
			alert("Attack missed!");
		}

		//BOSS Attack
		if (user.dodge < something){
			"boss attack function"
		} else {
			alert("Attack missed!");
		}

	});

	$('.defend').on('click', function() {

		//USER Defend

		//BOSS Defend

	});

	$('.special').on('click', function() {

		//USER Special

		//BOSS Special

	});
    
});