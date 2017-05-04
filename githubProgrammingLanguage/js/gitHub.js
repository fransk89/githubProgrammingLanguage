// CONSTANTS
var client_id_value = 'b71fc0970f52ba87a693';
var client_secret_value = '8fbaa11c252f2f52949813dde24e9c3c9aed4830';

$(document).ready(function (){
	
	$('#searchUser').on('keyup', function (e){
		// Get username from input box
		var username = e.target.value;

		// Make request to Github using username to fetch user details
		$.ajax({
			url:'https://api.github.com/users/'+username,
			data:{
				client_id: client_id_value,
				client_secret: client_secret_value
			}
		})
		.done(function (user){
			// Make request to Github using username to fetch repository details
			$.ajax({
			      url:'https://api.github.com/users/'+username+'/repos',
			      data:{
			    	  client_id: client_id_value,
			    	  client_secret: client_secret_value,
			    	  sort: 'created: asc',
			    	  per_page: 6
			      }
		    })
		    .done(function(repos) {
		    	// Show user name in the screen
		    	showName(user.name);
		    	// Show programming languages used by the user in the screen
			    showLanguages(repos);
			})
			.fail(function ( jqXHR, textStatus) {
				manageError(jqXHR, textStatus);
			});
		})
		.fail(function ( jqXHR, textStatus ) {
			manageError(jqXHR, textStatus);
		});
	});
});

//	We manage the different errors using Github Api
function manageError (jqXHR, textStatus) {
	 
	var response = "";
	
	if (jqXHR != null) {
		
		if (jqXHR.status == 0) {
			alert('Not connect: Verify Network.');
		    response = 'Not connect: Verify Network.';
		  } else if (jqXHR.status == 404) {
		    alert('Requested page not found [404].');
		    response = 'Requested page not found [404].';
		  } else if (jqXHR.status == 500) {
		    alert('Internal Server Error [500].');
		    response = 'Internal Server Error [500].';
		  }

	} else {
		
		if (textStatus == 'parsererror') {
		    alert('Requested JSON parse failed.');
		    response = 'Requested JSON parse failed.';
		  } else if (textStatus == 'timeout') {
		    alert('Time out error.');
		    response = 'Time out error.';
		  } else if (textStatus == 'abort') {
		    alert('Ajax request aborted.');
		    response = 'Ajax request aborted.';
		  } else {
		    alert('Uncaught Error.');
		    response = 'Uncaught Error.';
		  }
	}
	return response;
}
