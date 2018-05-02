$(document).ready(function(){

	// const btnCerrarSesion = document.getElementById('butLogOut');
	// const lblUsuarioActivo = document.getElementById('lblUsuario');
	 
	//var user = appFB.auth().currentUser;

	// if (user) {
	//  	// User is signed in.
	//  	lblUsuarioActivo.innerHTML=user.email;
	//  	console.log (user);
	//  	btnCerrarSesion.classList.remove("hide");	  
	//} else {
	//	btnCerrarSesion.classList.add("hide");	  
	//	lblUsuarioActivo.innerHTML="";
	  	// No user is signed in.
	  	//location.href ="login.html";
	//}
	
	var vlKEYProducto =localStorage.getItem("KEYProducto");


 	 $('#butNuevo').click( function() {	
		fnLimpiar();
		document.getElementById('inputClaveOficial').removeAttribute("disabled");		
	});	

	$('#butMenu').click( function() {	
		location.href ="menu.html";
	});	


	$('#butListar').click( function() {	
		location.href ="ListadeProductos.html";
	});	


	function fnBuscarKEY(){
		// var vlKEY = "" ;
		// vlKEY = $('#inputKEY').val();
		// if (vlKEY===""){
		// 	return false;
		// }		
		
		// console.log (vlKEY);
		// appFB.database().ref('Productos/'+vlKEY).once('value').then(function(snapshot){		
		// 	var childData = snapshot.val();
		// 	if (childData){		
		// 		console.log(childData); 
			
				
		// 		document.getElementById('inputClaveOficial').setAttribute("disabled","disabled");
		// 		$('#inputClaveOficial').val(childData.ClaveOficial);				
	
		// 		document.getElementById('inputDescripcionProducto').removeAttribute("disabled");
		// 		$('#inputDescripcionProducto').val(childData.Descripcion);
		// 		document.getElementById('inputPartida').removeAttribute("disabled");
		// 		$('#inputPartida').val(childData.Partida);			
		// 		document.getElementById('inputPorcentaIva').removeAttribute("disabled");
		// 		$('#inputPorcentaIva').val(childData.IvaP);	
		// 		document.getElementById('inputManejaLotes').removeAttribute("disabled");	
		// 		$('#inputManejaLotes').val(childData.ManejaLotes);

		// 	}
			 
		// }, function (error) {
  //  			console.log("Error: " + error.code) ;
		// });	

		fnBuscar();
		
	}

	function fnBuscar(){
		var vlIdProducto = "" ;
		vlIDProducto = $('#inputClaveOficial').val();

		if   ( vlIDProducto ==="") {
	      alert("Hace falta la Clave  " );
	      return false;  
	   	}

		// var ListRef = appFB.database().ref('Productos');		
		
		// ListRef.orderByChild("IDroducto").equalTo(vlIDProducto).once("value", function(snapshot) {			
		// 	var childData = snapshot.val();	
  //   		if (childData){				
		//       	console.log(snapshot.key);
		      	
		//       	console.log(childData);
		      	
		// 		$('#inputKEY').val(snapshot.key);
		// 		localStorage.setItem("KEYProducto", snapshot.key);		      	
		      	
		// 		fnBuscarKEY();


		// 	}else{
		// 		alert( " Producto " + vlIDProducto +" nueva " );
		// 		document.getElementById('inputClaveOficial').removeAttribute("disabled");		
		// 		document.getElementById('inputDescripcionProducto').removeAttribute("disabled");
		// 		document.getElementById('inputPartida').removeAttribute("disabled");
		// 		document.getElementById('inputPorcentaIva').removeAttribute("disabled");
		// 		document.getElementById('inputManejaLotes').removeAttribute("disabled");	
		// 		document.getElementById('inputIDProducto').setAttribute("disabled","disabled");			
		// 	}
			

		// }, function (error) {
  //  			console.log("Error: " + error.code) ;
		// });			
		

		try{		
	        db.transaction(function (tx) {	
	        	var vlsql=	"SELECT * FROM ctl_Productos WHERE idClaveOficial = '"+ vlIDProducto +"'"
		 		//tx.executeSql("SELECT * FROM ctl_Presentaciones where idPresentacion = ? ", [vlIDPresentacion], function (tx, results) {
		 		console.log(vlsql);
		 		try{
			 		tx.executeSql(vlsql, [] , function (tx, results) {
				 		var len = results.rows.length, i;
				 		console.log( len);
				 		if (len >0) {
				 			console.log("Presentacion encontrada");
					 		for (i = 0; i < len; i++) {
								// document.getElementById('inputDescripcion').removeAttribute("disabled");
								// document.getElementById('inputIDPresentacion').setAttribute("disabled","disabled");
						  // 		$('#inputDescripcion').val(results.rows.item(i).Descripcion)
									document.getElementById('inputClaveOficial').setAttribute("disabled","disabled");
									$('#inputClaveOficial').val(results.rows.item(i).idClaveOficial);				
						
									document.getElementById('inputDescripcionProducto').removeAttribute("disabled");
									$('#inputDescripcionProducto').val(results.rows.item(i).Descripcion);
									document.getElementById('inputPartida').removeAttribute("disabled");
									$('#inputPartida').val(results.rows.item(i).idPartida);			
									document.getElementById('inputPorcentaIva').removeAttribute("disabled");
									$('#inputPorcentaIva').val(results.rows.item(i).IVAP);	
									document.getElementById('inputManejaLotes').removeAttribute("disabled");	
									$('#inputManejaLotes').val(results.rows.item(i).ManejaLotes);
									document.getElementById('inputTipoMI').removeAttribute("disabled");	
									$('#inputTipoMI').val(results.rows.item(i).TipoMI);									
					 		}
				 		}
				 		else{
							alert( " Producto " + vlIDProducto +" nueva " );
							document.getElementById('inputClaveOficial').setAttribute("disabled","disabled");
							document.getElementById('inputDescripcionProducto').removeAttribute("disabled");
							document.getElementById('inputPartida').removeAttribute("disabled");
							document.getElementById('inputPorcentaIva').removeAttribute("disabled");
							document.getElementById('inputManejaLotes').removeAttribute("disabled");
							document.getElementById('inputTipoMI').removeAttribute("disabled");
				 		}
					});	
				} catch(e) {
					alert("Error processing SQL: "+ e.message);
					return;
				}
			});							
		} catch(e) {
			alert("Error processing SQL: "+ e.message);
			return;
		}
	}


	$('#butBuscar').click( function()	{		
		fnBuscar();
	});
	

	$('#butEliminar').click (function() {
		var vlKEY = "";
		vlKEY = $('#inputKEY').val();
		if (vlKEY ===""){
			alert("Esta clave no existe ");
		}else{
		
			 var vlRuta = "";
			 vlRuta= "/Productos/" + vlKEY;	
			 console.log(vlRuta);
			 var ProductoRef = appFB.database().ref(vlRuta);
			 ProductoRef.remove();
        	 fnLimpiar();
	         alert("Se Elimino con exito");
		}
		
	});	


	function fnLimpiar() {
			document.getElementById("myForm").reset();
	
			
			document.getElementById('inputClaveOficial').setAttribute("disabled","disabled"); 		
			document.getElementById('inputDescripcionProducto').setAttribute("disabled","disabled");
			document.getElementById('inputPartida').setAttribute("disabled","disabled");
			document.getElementById('inputPorcentaIva').setAttribute("disabled","disabled");
			document.getElementById('inputManejaLotes').setAttribute("disabled","disabled");
			document.getElementById('inputTipoMI').setAttribute("disabled","disabled");				
		 	localStorage.setItem("KEYProducto", "");		
			
	}


	$('#butGuardar').click (function() {
		var vlClaveOficial;
		var vlDescripcionProducto;
		var vlPartida;
		var vlIvaP;
		var vlManejaLotes;
		var vlKEY;
		
		//const inputclaveOficial = $('#inputClaveOficial');
		//const inputDescripcionProducto = $('#inputDescripcionProducto');		

		vlClaveOficial = $('#inputClaveOficial').val();
		vlDescripcionProducto = $('#inputDescripcionProducto').val();
		vlPartida = $('#inputPartida').val(); ;
		vlIvaP = $('#inputPorcentaIva').val();
		vlManejaLotes = $('#inputManejaLotes').val();
		TipoMI = $('#inputTipoMI').val();

		if   ( vlClaveOficial ==="") {
	      alert("Hace falta la Clave  " );
	      return false;  
	   	}
	   	
	   	if   ( vlDescripcionProducto ==="") {
	      alert("Hace falta la Descripcion " );
	      return false;  
	   	}

	   	if (vlIvaP===""){
	   		vlIvaP="0";
	   	}
		
		try{		
	        db.transaction(function (tx) {	
	        	var vlsql=	"SELECT * FROM ctl_Productos WHERE idClaveOficial = '"+ vlClaveOficial +"'"
		 		//tx.executeSql("SELECT * FROM ctl_Presentaciones where idPresentacion = ? ", [vlIDPresentacion], function (tx, results) {
		 		console.log(vlsql);
		 		try{
			 		tx.executeSql(vlsql, [] , function (tx, results) {
				 		var len = results.rows.length, i;
				 		console.log( len);
				 		if (len >0) {
							vlsql =  "UPDATE ctl_Productos ";
							vlsql += "SET Descripcion = '" + vlDescripcion  + "' ";
							vlsql += "   ,TipoMI      = '" + TipoMI  + "' ";
							vlsql += "   ,idPartida      = '" + vlPartida  + "' ";
							vlsql += "   ,ManejaLotes      = '" + vlManejaLotes  + "' ";							
							vlsql += "WHERE idClaveOficial = '"+ vlClaveOficial +"'";
				 			console.log("update");
				 			console.log(vlsql);
							tx.executeSql(vlsql,[]);
							fnCargarProductos();
							alert("Se Actualizo con exito");
				 		}
				 		else{
				 			console.log("insert");
							vlsql=" INSERT INTO ctl_Productos ( idClaveOficial , Descripcion  ,  TipoMI  ,idPartida ,ManejaLotes, IVAP )";
							vlsql+="  VALUES ( '"+vlClaveOficial +"', '"+ vlDescripcionProducto +"', '"+ TipoMI +"', '"+ vlPartida +"', '"+ vlManejaLotes +"', '"+ vlIvaP +"') ";
							console.log(vlsql);
							tx.executeSql(vlsql,[]);
							fnCargarProductos();
							alert("Se Guardo con exito");
				 		}
					});	
				} catch(e) {
					alert("Error processing SQL: "+ e.message);
					return;
				}
			});							
		} catch(e) {
			alert("Error processing SQL: "+ e.message);
			return;
		}
	});	
	
	
	if (vlKEYProducto){
		$('#inputKEY').val(vlKEYProducto);
		$('#inputClaveOficial').val(vlKEYProducto);		
		fnBuscarKEY();
	}

	app.isLoading =true;
	if (app.isLoading) {
	      app.spinner.setAttribute('hidden', true);  
	      app.container.removeAttribute('hidden');   
	      app.isLoading = false;
	    }


});


