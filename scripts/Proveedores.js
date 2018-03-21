$(document).ready(function(){

	var vlKEYProveedor =localStorage.getItem("KEYProveedor");	
	if (vlKEYProveedor){
		$('#inputKEY').val(vlKEYProveedor);
	}
	

	//const btnCerrarSesion = document.getElementById('butLogOut');
	//const lblUsuarioActivo = document.getElementById('lblUsuario');
	 
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

	$('#butMenu').click( function() {	
		location.href ="menu.html";
	});	

	$('#butListar').click( function() {	
		location.href ="ListadeProveedores.html";
	});	

 	 $('#butNuevo').click( function() {	
		fnLimpiar();
	});	


	function fnBuscarKEY(){
		var vlKEY = "" ;
		vlKEY = $('#inputKEY').val();
		if (vlKEY===""){
			return false;
		}		
		
		console.log (vlKEY);
		// appFB.database().ref('Proveedores/'+vlKEY).once('value').then(function(snapshot){		
		// 	var childData = snapshot.val();
		// 	if (childData){		
		// 		console.log(childData);
		// 		 $('#inputRFC').val(childData.RFC);
		// 		 $('#inputNombre').val(childData.Nombre);			 
		// 		document.getElementById('inputNombre').removeAttribute("disabled");
		// 		document.getElementById('inputRFC').setAttribute("disabled","disabled");
		// }
			 
		// }, function (error) {
  //  			console.log("Error: " + error.code) ;
		// });	
		fnBuscar();
		console.log ("final");
	}

	function fnBuscar(){
		var vlRFC = "" ;
		vlRFC = $('#inputRFC').val();
		if (vlRFC===""){
			return false;
		}		
		
		// var productosListRef = appFB.database().ref('Proveedores');			
		// productosListRef.orderByChild("RFC").equalTo(vlRFC).once("value", function(snapshot) {			
		// 	var childData = snapshot.val();	
  //   		if (childData){				
		//       	console.log(snapshot.key);
		//       	console.log(childData);
		// 		document.getElementById('inputNombre').removeAttribute("disabled");
		// 		document.getElementById('inputRFC').setAttribute("disabled","disabled");
		// 		productosListRef.orderByChild("RFC").equalTo(vlRFC).once("child_added", function(snapshot1) {			
		// 	  		$('#inputNombre').val(snapshot1.val().Nombre);
		//   		});


		// 	}else{
		// 		alert( "El RFC " + vlRFC +" nuevo " );
		// 		document.getElementById('inputNombre').removeAttribute("disabled");
		// 		document.getElementById('inputRFC').setAttribute("disabled","disabled");				
		// 	}
			

		// }, function (error) {
  //  			console.log("Error: " + error.code) ;
		// });	

		try{		
	        db.transaction(function (tx) {	
	        	var vlsql=	"SELECT * FROM ctl_Proveedores WHERE RFC = '"+ vlRFC +"'"
		 		//tx.executeSql("SELECT * FROM ctl_Presentaciones where idPresentacion = ? ", [vlIDPresentacion], function (tx, results) {
		 		console.log(vlsql);
		 		try{
			 		tx.executeSql(vlsql, [] , function (tx, results) {
				 		var len = results.rows.length, i;
				 		console.log( len);
				 		if (len >0) {
				 			console.log("Proveedor encontrado");
					 		for (i = 0; i < len; i++) {
								document.getElementById('inputNombre').removeAttribute("disabled");
								document.getElementById('inputRFC').setAttribute("disabled","disabled");
						  		$('#inputNombre').val(results.rows.item(i).Nombre)
					 		}
				 		}
				 		else{
							alert( " Proveedor " + vlRFC +" nuevo " );
							document.getElementById('inputNombre').removeAttribute("disabled");
							document.getElementById('inputRFC').setAttribute("disabled","disabled");	
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
		var vlRFC="";
		vlRFC = $('#inputRFC').val();
		// var productosListRef = appFB.database().ref('Proveedores');	
		// productosListRef.orderByChild("RFC").equalTo(vlRFC).once("value", function(snapshot) {
		// 	const userData = snapshot.val();
  //   		if (userData){
		// 		 productosListRef.orderByChild("RFC").equalTo(vlRFC).once("child_added", function(snapshot1) {
		// 			 var vlRuta = "";
		// 			 vlRuta= "/Proveedores/" + snapshot1.key;
			
		// 			 console.log(vlRuta);
		// 			 var productoRef = appFB.database().ref(vlRuta);
		// 			 productoRef.remove();
		//         	 fnLimpiar();
		// 	         alert("Se Elimino con exito");
		//          });
		// 	}else{

		// 		alert("Este rfc no existe ");
		// 	}			
		// });


		try{		
	        db.transaction(function (tx) {	
	        	var vlsql=	"SELECT * FROM ctl_Proveedores WHERE RFC = '"+ vlRFC +"'"
		 		//tx.executeSql("SELECT * FROM ctl_Presentaciones where idPresentacion = ? ", [vlIDPresentacion], function (tx, results) {
		 		console.log(vlsql);
		 		try{
			 		tx.executeSql(vlsql, [] , function (tx, results) {
				 		var len = results.rows.length, i;
				 		console.log( len);
				 		if (len >0) {
				 			console.log("Proveedor encontrado");
				            var vlsql=	"DELETE FROM ctl_Proveedores WHERE RFC = '"+ vlRFC +"'"
						 	console.log(vlsql);		        
				        	try{
				        		tx.executeSql(vlsql, []);
					        	 fnLimpiar();
						         alert("Se Elimino con exito");
					        }catch(e) {
								alert("1 Error processing SQL: "+ e.message);
								return;
							}
				 		}
				 		else{
				 			console.log("Proveedor no encontrado");
							alert( " Proveedor " + vlRFC +" no encontrado " );
							document.getElementById('inputDescripcion').removeAttribute("disabled");
							document.getElementById('inputIDPresentacion').setAttribute("disabled","disabled");	
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

	$('#butGuardar').click (function() {
		var vlRFC="";
		var vlNombre="";	
		
		vlRFC = $('#inputRFC').val();
		vlNombre = $('#inputNombre').val();
		
	
		if   ( vlRFC ==="") {
	      alert("Hace falta el RFC " );
	      return false;  
	   	}
	   	if   ( vlNombre ==="") {
	      alert("Hace falta el Nombre " );
	      return false;  
	   	}	
	
		
		// var productosListRef = appFB.database().ref('Proveedores');	
		
		// productosListRef.orderByChild("RFC").equalTo(vlRFC).once("value", function(snapshot) {
		// 	const userData = snapshot.val();
  //   		if (userData){			
		//           console.log("ya existe");			
		// 		  console.log(snapshot.key);
		// 		  //alert("Esta RFC ya existe" + vlRFC);
		// 		 productosListRef.orderByChild("RFC").equalTo(vlRFC).once("child_added", function(snapshot1) {
		// 			 var updates = {};
		// 			 updates['/Proveedores/' + snapshot1.key + '/Nombre' ] = vlNombre;
			
		// 			 console.log(updates);
		// 			 appFB.database().ref().update(updates);
		        
		// 	         alert("Se actualizo con exito");
		//          });

		// 	}else{
		// 		var newProductoRef = productosListRef.push();
		// 		console.log("nuevo"+ newProductoRef.key);			
		// 		newProductoRef.set({
		// 		  'RFC': vlRFC,
		// 		  'Nombre': vlNombre
		// 		});		
		// 		alert("Se guardo con exito ");				
		// 	}
			

		// });
	


		try{		
	        db.transaction(function (tx) {	
	        	var vlsql=	"SELECT * FROM ctl_Proveedores WHERE RFC = '"+ vlRFC +"'"
		 		//tx.executeSql("SELECT * FROM ctl_Presentaciones where idPresentacion = ? ", [vlIDPresentacion], function (tx, results) {
		 		console.log(vlsql);
		 		try{
			 		tx.executeSql(vlsql, [] , function (tx, results) {
				 		var len = results.rows.length, i;
				 		console.log( len);
				 		if (len >0) {
							vlsql="UPDATE ctl_Proveedores SET Nombre = '" + vlNombre  + "' WHERE  RFC = '"+ vlRFC +"'";
				 			console.log("update");
				 			console.log(vlsql);
							tx.executeSql(vlsql,[]);
				 		}
				 		else{
				 			console.log("insert");
							vlsql="INSERT INTO ctl_Proveedores (RFC, Nombre) VALUES ( '"+vlRFC +"', '"+ vlNombre +"') ";
							tx.executeSql(vlsql,[]);
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


	function fnLimpiar() {
			document.getElementById("myForm").reset();
			$('#inputRFC').disabled = false;
	 		$('#inputNombre').removeProp("disabled");		
			document.getElementById('inputNombre').setAttribute("disabled","disabled"); 		
			document.getElementById('inputRFC').removeAttribute("disabled");
	}

	if (vlKEYProveedor){
		$('#inputRFC').val(vlKEYProveedor);
		fnBuscarKEY();
	}


});


