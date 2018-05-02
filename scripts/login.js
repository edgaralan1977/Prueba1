
  var UsuarioID;
  var UsuarioNombre;
  var pwd;


  UsuarioID = "" ;
  UsuarioNombre = "";

// const btnCerrarSesion = document.getElementById('butLogOut');
// const lblUsuarioActivo = document.getElementById('lblUsuario');
 const txtUsuario = $('#inputUsuario');

  $('#butIngresar').click (function() {

    UsuarioID  =  $('#inputUsuario').val(); 
    pwd  =  $('#inputpwd').val();   


   if   ( UsuarioID ==="") {
      alert("Hace falta el id del usuario " );
      return false;  
   }
   if   ( pwd ==="") {
      alert("Hace falta el pwd" );
      return false;  
   }
 
 	appFB.auth().signInWithEmailAndPassword(UsuarioID, pwd)
 	 .then(function() {
	 	//btnCerrarSesion.classList.remove("hide");
		location.href ="menu.html";	  
	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;

	  console.log(errorCode );
	  console.log(errorMessage );
	  
	  if (errorCode === 'auth/wrong-password') {
	    alert('Usuario o pwd incorrecto');
	  } else {
	    alert(errorMessage);
	  }
	  console.log(error);	  
	  return false;
	});
  });



  $('#butNuevoUsuario').click( function() {
    UsuarioID  =  $('#inputUsuario').val(); 
    pwd  =  $('#inputpwd').val();   
   if   ( UsuarioID ==="") {
      alert("Hace falta el id del usuario " );
      return false;  
   }
   if   ( pwd ==="") {
      alert("Hace falta el pwd" );
      return false;  
   }
	appFB.auth().createUserWithEmailAndPassword(UsuarioID, pwd).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  alert(errorMessage );
	});

  });


$(document).ready(function(){

	var user = appFB.auth().currentUser;

	if (user) {

		// User is signed in.
		//lblUsuarioActivo.innerHTML=user.email;
		console.log (user);
	    txtUsuario.value =user.email;  		
 		app.user = user.email;
		//btnCerrarSesion.classList.remove("hide");	  
	} else {

		//btnCerrarSesion.classList.add("hide");	  
		//lblUsuarioActivo.innerHTML="";
		app.user = "";
	    // No user is signed in.
	    //location.href ="login.html";
	}


	app.isLoading =true;
	if (app.isLoading) {
	      app.spinner.setAttribute('hidden', true);  
	      app.container.removeAttribute('hidden');   
	      app.isLoading = false;
	    }


});

  

	


