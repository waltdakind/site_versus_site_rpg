$('.favico').on('click', function() {
	rocketcss(this,'.favico2', 'rocketPulse');
	$('.favico2').addClass('targetPulse');
});


	$("#newSiteForm").on("submit", function(){
		var newSite = $("#urlBox").val().trim();
		$("#addThisModal").modal('toggle');
		$("#addThisModal").find('modal-body input').val(newSite);
		
		console.log(newSite);
 	$("#addToTeam").on("click", function() {
		$("#addThisModal").modal('toggle');
		$("#urlBox").val(" ");
		$("#newSiteHeader").addClass("hidden");
		$("#newSiteForm").addClass("hidden");
		$(".favico1").removeClass("hidden");
 	})

		
		return false;

	});


	$("#addButton").on("click", function(){
		var newSite = $("#urlBox").val().trim();
		console.log(newSite);
	$("#urlBox").val(" ");
	// $("addThisModal").modal('show');
	return false;
		})

