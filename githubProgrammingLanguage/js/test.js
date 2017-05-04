test("Errors Management", function () {
	
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

function jqXHRAux() {
	 this.status;
}

