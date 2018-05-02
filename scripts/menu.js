

$(document).ready(function(){

  	app.isLoading =true;
	if (app.isLoading) {
	  app.spinner.setAttribute('hidden', true);  
	  app.container.removeAttribute('hidden');   
	  app.isLoading = false;
	}


});


