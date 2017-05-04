
// Show programming languages from user repositories
function showLanguages(repos) {
	
	var usedLanguages = [];
	var languageUsed = -1;
	var actualLanguage = '';
	
	$('#repos').empty();
	
	//	Looping each repository
	$.each(repos, function(index, repo){
	  
		actualLanguage = repo.language;
		languageUsed = jQuery.inArray( actualLanguage, usedLanguages );
		
		//	If we have some repositories with the same programming language we only show once
		if (languageUsed == -1){
			usedLanguages.push(actualLanguage);
			if (actualLanguage == null) {
				actualLanguage = "Not specified";
			}
			//	Show programming language in the screen
			$('#repos').append(`
				<div class="well">
					<div class="row">
					<div class="col-md-7"><strong>${actualLanguage}</strong></div>
					</div>
				</div>
			`);
	 	}
   });
 }

// Show user name in the screen
function showName (name) {
	
	$('#profile').html(`
		<div class="panel panel-default">
			<div class="panel-heading">
	        	<h3 class="panel-title">${name}</h3>
	        </div>
	    </div>
	    <h3 class="page-header">Programming Languages</h3>
	`);
}

//Show error message in the screen
function showError (errorMessage) {
	$('#repos').empty();
	$('#profile').html(`
		<div class="panel panel-default">
			<div class="panel-heading">
	        	<h3 class="panel-title" style="color: red">${errorMessage}</h3>
	        </div>
	    </div>
	    
	`);
}