//	CONSTANTS
var CLIENT_ID_VALUE = 'b71fc0970f52ba87a693';
var CLIENT_SECRET_VALUE = '8fbaa11c252f2f52949813dde24e9c3c9aed4830';

$(document).ready(function (){
	
	$('#searchUser').on('keyup', function (e){
		//	Get username from input box
		var username = e.target.value;

		//	Get User using username
		var myUser = new User(username);
		myUser.fire();
	});
});

//	Fetch User Info
var User = function (username) {
	
	this.fire = function () {
		// Make request to Github using username to fetch user info
		return $.ajax({
			url:'https://api.github.com/users/' + username,
			data:{
				client_id: CLIENT_ID_VALUE,
				client_secret: CLIENT_SECRET_VALUE
			}
		})
		.done(function (user){
			// Show user Name
	    	showName(user.name);
			// Make request to get repositories info 
			var myRepos = new Repos(username);
			myRepos.fire();
		})
		.fail(function ( jqXHR, textStatus ) {
			manageError(jqXHR, textStatus);
		});
    };
};

//	Fetch Repositories info
var Repos =	function (username) {
			
	this.fire = function () {
		// Make request to Github using username to fetch repositories details   
		return $.ajax({
			url:'https://api.github.com/users/' + username + '/repos',
			data:{
		    	  client_id: CLIENT_ID_VALUE,
		    	  client_secret: CLIENT_SECRET_VALUE,
		    	  sort: 'created: asc',
		    	  per_page: 6
			}
		})
	    .done(function(repos) {
	    	// Show programming languages used by the user
		    showLanguages(repos);
		})
		.fail(function ( jqXHR, textStatus) {
			manageError(jqXHR, textStatus);
		});
    };
};


//	We manage Github Api error response
function manageError (jqXHR, textStatus) {
	 
	var errorMessage = "";
	if (jqXHR != null) {
		if (jqXHR.status == 0) {
			errorMessage = 'Not connect: Verify Network.';
		} else if (jqXHR.status == 404) {
			errorMessage = 'Requested page not found [404].';
		} else if (jqXHR.status == 500) {
			errorMessage = 'Internal Server Error [500].';
		}
	} else {
		
		if (textStatus == 'parsererror') {
			errorMessage = 'Requested JSON parse failed.';
		} else if (textStatus == 'timeout') {
			errorMessage = 'Time out error.';
		} else if (textStatus == 'abort') {
			errorMessage = 'Ajax request aborted.';
		} else {
			errorMessage = 'Uncaught Error.';
		}
	}
	showError (errorMessage);
	
	return errorMessage;
}
