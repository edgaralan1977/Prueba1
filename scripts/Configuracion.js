$(document).ready(function(){
 	var db = openDatabase('mydbAlmacen', '1.0', 'DataBase Almacen', 2 * 1024 * 1024);




	$('#butGuardar').click (function() {		
		var vlServidor="";



		vlServidor = $('#inputServidor').val();
		
	
		if   ( vlServidor ==="") {
	      alert("Hace falta capturar el servidor" );
	      return false;  
	   	}
	



		try{		
	        db.transaction(function (tx) {	
	        	var vlsql=	"SELECT * FROM ctl_Configuracion WHERE id = 1 "
		 		//tx.executeSql("SELECT * FROM ctl_Presentaciones where idPresentacion = ? ", [vlIDPresentacion], function (tx, results) {
		 		console.log(vlsql);
		 		try{
			 		tx.executeSql(vlsql, [] , function (tx, results) {
				 		var len = results.rows.length, i;
				 		console.log( len);
				 		if (len >0) {
							vlsql="UPDATE ctl_Configuracion SET Servidor = '" + vlServidor  + "' WHERE  id= 1 ";
				 			console.log("update");
				 			console.log(vlsql);
							tx.executeSql(vlsql,[]);
				 		}
				 		else{
				 			console.log("insert");
							vlsql="INSERT INTO ctl_Configuracion (Servidor) VALUES (  '"+ vlServidor +"') ";
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




	$('#butMenu').click( function() {	
		location.href ="menu.html";
	});	


	
	
	
	function fnBuscar(){


		try{		
	        db.transaction(function (tx) {	
	        	var vlsql=	"SELECT * FROM ctl_Configuracion WHERE id = 1";
		 		//tx.executeSql("SELECT * FROM ctl_Presentaciones where idPresentacion = ? ", [vlIDPresentacion], function (tx, results) {
		 		console.log(vlsql);
		 		try{
			 		tx.executeSql(vlsql, [] , function (tx, results) {
				 		var len = results.rows.length, i;
				 		console.log( len);
				 		if (len >0) {
				 			console.log("Configuracion encontrada");
					 		for (i = 0; i < len; i++) {
						  		$('#inputServidor').val(results.rows.item(i).Servidor)
					 		}
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
	
	fnBuscar();
	


});


