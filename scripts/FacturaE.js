$(document).ready(function(){

	var vlKEY = localStorage.getItem("KEYEntrada");

  	$('#butListarFacturas').click( function() {	
	  location.href ="ListadeFacturasE.html";
	});	

  	$('#butListarDetFE').click( function() {	
	  location.href ="ListadeFacturasEDetFE.html";
	});	

  	$('#butListarDetADD').click( function() {	
	  location.href ="ListadeFacturasEDetADD.html";
	});

  	$('#butMenu').click( function() {	
	  location.href ="menu.html";
	});	

  	$('#butExcel').click( function() {
	  location.href ="FacturaProveedorExcel.html";
	});	

	function fn_BuscarProveedor(vlRFCProveedor){
		var vlRFC ="";
	 	vlRFC =vlRFCProveedor ;
	 	console.log (vlRFC);
		// if 	 (vlRFC==!"")
		{
			$('#descripcionProveedor').val("");
			try{		
		        db.transaction(function (tx) {	
		        	var vlsql=	"SELECT * FROM ctl_Proveedores WHERE RFC = '"+ vlRFC +"'"
			 		console.log(vlsql);
			 		try{
				 		tx.executeSql(vlsql, [] , function (tx, results) {
					 		var len = results.rows.length, i;
					 		console.log( len);
					 		if (len >0) {
					 			console.log("Proveedor encontrado");
							  	$('#descripcionProveedor').val(results.rows.item(i).Nombre)
						 		
					 		}
					 		else{
					 			console.log("Proveedor no encontrado");
					 			alert("Proveedor no encontrado");
							  	$('#descripcionProveedor').val("");
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
	}
	
	function fn_limpiar(){
		$('#inputPedido').val("");
		$('#inputSubTotal').val("");
		$('#inputIVA').val("");
		$('#inputTotal').val("");
		$('#inputPedido').val("");
		$('#inputObservaciones').val("");
		$('#inputcVerificado').val("");
		$('#inputRFCProveedor').val("");
		$('#inputSerie').val("");	
		$('#inputFolio').val("");
	}

	function fn_BuscarKEY(vlKEY){
		fn_limpiar();
		if (vlKEY){
			try{		
		        db.transaction(function (tx) {	
		        	var vlsql=	"SELECT * FROM alm_FacturasProveedor A  ";        	
		        	vlsql += " WHERE  A.idFacturaProveedor = '"+ vlKEY +"'";
			 		console.log(vlsql);
			 		try{
			 			tx.executeSql(vlsql, [] , function (tx, results) {
					 		var len = results.rows.length, i;
					 		console.log( len);
					 		if (len >0) {
					 			console.log (results.rows.item(i));
				    			var vlSubTotal ;
				    			var vlIVA;
				    			var vlTotal;
								 vlTotal= 	numberFormat(results.rows.item(i).Total);
								$('#inputRFCProveedor').val(results.rows.item(i).RFC);
								$('#inputSerie').val(results.rows.item(i).serie);	
								$('#inputFolio').val(results.rows.item(i).Folio);	
								$('#inputTotal').val(vlTotal);
								$('#inputUUID').val(results.rows.item(i).UUID);								 
								$('#inputObservaciones').val(results.rows.item(i).observaciones);					
								$('#inputFecha').val(results.rows.item(i).fecha);
								$('#inputcVerificado').val(results.rows.item(i).cVerificada);

								document.getElementById('inputObservaciones').removeAttribute("disabled");
								document.getElementById('inputcVerificado').removeAttribute("disabled");
								fn_BuscarProveedor (results.rows.item(i).RFC);
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
	}


	$('#butGuardar').click (function() {
 		var vlcVerificado ="";
 		var vlObservaciones ="";
		vlIdFacturaProveedor =localStorage.getItem("KEYEntrada");				
		if (vlIdFacturaProveedor){					
			vlcVerificado = $('#inputcVerificado').val();			
			vlObservaciones = $('#inputObservaciones').val();			
			try{	
		        db.transaction(function (tx) {	
					vlsql =  " UPDATE alm_FacturasProveedor";
					vlsql += " SET cVerificada = '" + vlcVerificado.substring(0,1)  + "' ";
					vlsql += "    ,Observaciones = '" + vlObservaciones  + "' ";
    				vlsql += " WHERE  idFacturaProveedor   =  '"+ vlIdFacturaProveedor +"' ";
		 			console.log(vlsql);
					tx.executeSql(vlsql,[]);
					alert("Se Actualizo con exito");
				});										
			} catch(e) {
				alert("Error processing SQL: "+ e.message);
				return;
			}
		}		
	});	


	if (vlKEY){
		fn_BuscarKEY(vlKEY);
	}

	app.isLoading =true;
	if (app.isLoading) {
		app.spinner.setAttribute('hidden', true);  
		app.container.removeAttribute('hidden');   
		app.isLoading = false;
	}

});
