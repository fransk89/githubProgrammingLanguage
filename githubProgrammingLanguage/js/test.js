
var TEST_USER = 'fransk89'

//	Test Github usernames
QUnit.asyncTest("Testing GitHub Username", 2, function() {
   
	// The number of async calls in this test
	var countDown = createAsyncCounter(2); 
     	
	// Make request to Github using Testuser
    testUser = new User(TEST_USER);
    testUser.fire().done(function(user) {
       equal(user.login, TEST_USER, "Test User 'fransk89' exists in GitHub");
    })
    .always(countDown);
    
    // Make request to Github using empty
    testUser = new User('');
    testUser.fire().fail(function ( jqXHR, textStatus ) {
    	equal(null, null, "User '' doesn´t exist");
    })
    .always(countDown);
});



//	Test Github User repositories
QUnit.asyncTest("Testing GitHub User Repositories", 1, function() {
   
	// The number of async calls in this test
	var countDown = createAsyncCounter(1);
	
	// Make request to Github using User info
	testRepositories = new Repos(TEST_USER);
	testRepositories.fire().done(function(repos) {
		equal(repos[0].language, "JavaScript", "Programming language JavaScript exists in 'fransk89' repository");
    })
    .always(countDown);
});

QUnit.test("Errors Management", function () {
	
	var jqXHR = new jqXHRAux();
	
	jqXHR.status = 0;
    equal( manageError(jqXHR), 'Not connect: Verify Network.', 'Error message: Not connect: Verify Network.' );
	jqXHR.status = 404;
    equal( manageError(jqXHR), 'Requested page not found [404].', 'Error message: Requested page not found [404].' );
    jqXHR.status = 500;
    equal( manageError(jqXHR), 'Internal Server Error [500].', 'Error message: Internal Server Error [500].' );
    
    equal( manageError(null,'parsererror', null), 'Requested JSON parse failed.', 'Error message: Requested JSON parse failed.' );
    equal( manageError(null,'timeout', null), 'Time out error.', 'Error message: Time out error.' );
    equal( manageError(null,'abort', null), 'Ajax request aborted.', 'Error message: Ajax request aborted.' );
    equal( manageError(null,null, null), 'Uncaught Error.', 'Error message: Uncaught Error.' );
   
});

//Create a function that counts down to `start()`
function createAsyncCounter(count) {
    count = count || 1; // count defaults to 1
    return function () { --count || start(); };
}

function jqXHRAux() {
	 this.status;
}

