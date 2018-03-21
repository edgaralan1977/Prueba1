$(document).ready(function(){
 	var db = openDatabase('mydbAlmacen', '1.0', 'DataBase Almacen', 2 * 1024 * 1024);

	var vlKEYPresentacion = localStorage.getItem("KEYPresentacion");	
	if (vlKEYPresentacion){
		$('#inputKEY').val(vlKEYPresentacion);
	}


	$('#butEliminar').click (function() {
		vlIdPresentacion = "";
		vlIDPresentacion = $('#inputIDPresentacion').val();

		if  (vlIDPresentacion ==="") {
	      alert("Hace falta capturar la clave " );
	      return false;  
	   	}


		try{		
	        db.transaction(function (tx) {	
	        	var vlsql=	"SELECT * FROM ctl_Presentaciones WHERE idPresentacion = '"+ vlIDPresentacion +"'"
		 		//tx.executeSql("SELECT * FROM ctl_Presentaciones where idPresentacion = ? ", [vlIDPresentacion], function (tx, results) {
		 		console.log(vlsql);
		 		try{
			 		tx.executeSql(vlsql, [] , function (tx, results) {
				 		var len = results.rows.length, i;
				 		console.log( len);
				 		if (len >0) {
				 			console.log("Presentacion encontrada");
				            var vlsql=	"DELETE FROM ctl_Presentaciones WHERE idPresentacion = '"+ vlIDPresentacion +"'"
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
				 			console.log("Presentacion no encontrada");
							alert( " Presentacion " + vlIDPresentacion +" nueva " );
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
		var vlDescripcion="";
		// try{		
	 //        db.transaction(function (tx) {
		// 		vlsql =" INSERT INTO ctl_Presentaciones (idPresentacion, Descripcion) VALUES ( 'A01', 'PIEZA') ";
		// 		tx.executeSql(vlsql, []);
		// 	});		
		// } catch(e) {
		// 	alert("Error processing SQL: "+ e.message);
		// 	return;
		// }
		// return;			

		vlIDPresentacion="";
		
		vlIDPresentacion = $('#inputIDPresentacion').val();
		vlDescripcion = $('#inputDescripcion').val();
		
	
		if   ( vlIDPresentacion ==="") {
	      alert("Hace falta el IDPresentacion " );
	      return false;  
	   	}
	   	if   ( vlDescripcion ==="") {
	      alert("Hace falta el Descripcion " );
	      return false;  
	   	}		



		try{		
	        db.transaction(function (tx) {	
	        	var vlsql=	"SELECT * FROM ctl_Presentaciones WHERE idPresentacion = '"+ vlIDPresentacion +"'"
		 		//tx.executeSql("SELECT * FROM ctl_Presentaciones where idPresentacion = ? ", [vlIDPresentacion], function (tx, results) {
		 		console.log(vlsql);
		 		try{
			 		tx.executeSql(vlsql, [] , function (tx, results) {
				 		var len = results.rows.length, i;
				 		console.log( len);
				 		if (len >0) {
							vlsql="UPDATE ctl_Presentaciones SET Descripcion = '" + vlDescripcion  + "' WHERE  idPresentacion = '"+ vlIDPresentacion +"'";
				 			console.log("update");
				 			console.log(vlsql);
							tx.executeSql(vlsql,[]);
				 		}
				 		else{
				 			console.log("insert");
							vlsql="INSERT INTO ctl_Presentaciones (idPresentacion, Descripcion) VALUES ( '"+vlIDPresentacion +"', '"+ vlDescripcion +"') ";
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
		vlIDPresentacion="";
		document.getElementById("myForm").reset();
		$('#inputIDPresentacion').disabled = false;
	 	$('#inputDescripcion').removeProp("disabled");		
		document.getElementById('inputDescripcion').setAttribute("disabled","disabled"); 		
		document.getElementById('inputIDPresentacion').removeAttribute("disabled");
	}
	

	$('#butMenu').click( function() {	
		location.href ="menu.html";
	});	


	$('#butListar').click( function() {	
		location.href ="ListadePresentaciones.html";
	});	

 	 $('#butNuevo').click( function() {	
		fnLimpiar();
	});	

	$('#butBuscar').click( function()	{		
		fnBuscar();			
	});
	
	
	function fnBuscarKEY(){
		var vlKEY = "" ;
		vlKEY = $('#inputKEY').val();
		if (vlKEY===""){
			return false;
		}
		$('#inputIDPresentacion').val(vlKEY);
		fnBuscar();

	}	
	
	function fnBuscar(){
		vlIdPresentacion = "";
		vlIDPresentacion = $('#inputIDPresentacion').val();

		if  (vlIDPresentacion ==="") {
	      alert("Hace falta capturar la clave " );
	      return false;  
	   	}

		try{		
	        db.transaction(function (tx) {	
	        	var vlsql=	"SELECT * FROM ctl_Presentaciones WHERE idPresentacion = '"+ vlIDPresentacion +"'"
		 		//tx.executeSql("SELECT * FROM ctl_Presentaciones where idPresentacion = ? ", [vlIDPresentacion], function (tx, results) {
		 		console.log(vlsql);
		 		try{
			 		tx.executeSql(vlsql, [] , function (tx, results) {
				 		var len = results.rows.length, i;
				 		console.log( len);
				 		if (len >0) {
				 			console.log("Presentacion encontrada");
					 		for (i = 0; i < len; i++) {
								document.getElementById('inputDescripcion').removeAttribute("disabled");
								document.getElementById('inputIDPresentacion').setAttribute("disabled","disabled");
						  		$('#inputDescripcion').val(results.rows.item(i).Descripcion)
					 		}
				 		}
				 		else{
				 			console.log("Presentacion no encontrada");
							alert( " Presentacion " + vlIDPresentacion +" nueva " );
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

		console.log("A");

	}
	
	
	if (vlKEYPresentacion){
		fnBuscarKEY();
	}	


});


