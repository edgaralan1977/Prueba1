
$(document).ready(function(){


   var vlKEY = localStorage.getItem("KEYEntrada");	
	
	var vlIdFacturaProveedor =localStorage.getItem("KEYEntrada");	
	var vlIdFacturaProveedorDetalleADD =localStorage.getItem("idEntradaDetalleADD");
	console.log(" id del detalle de fe");
	console.log(vlIdFacturaProveedorDetalleADD);

  	function init(){
		if (vlIdFacturaProveedor){
			try{		
		        db.transaction(function (tx) {	
		        	var vlsql=	"SELECT * FROM alm_FacturasProveedor A  ";        	
		        	vlsql += "WHERE  A.id  =  "+ vlKEY +"";
			 		console.log(vlsql);
			 		try{
				 			tx.executeSql(vlsql, [] , function (tx, results) {
					 		var len = results.rows.length, i;
					 		console.log( len);
					 		if (len >0) {
					 			vlKEY=  results.rows.item(i).id ;
								$('#inputProveedor').val(results.rows.item(i).RFC);
								$('#inputFolio').val(results.rows.item(i).Folio);	
								fn_BuscarProveedorDetalle();
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

			if (vlIdFacturaProveedorDetalleADD){	
			 	try{		
			       	db.transaction(function (tx) {	
			        	var vlsql=	"SELECT * FROM alm_FacturasProveedorDet_ADDENDA A  ";        	
			        	vlsql += "WHERE  A.id  =  "+ vlIdFacturaProveedorDetalleADD +"";
				 		console.log(vlsql);
				 		try{
				 			tx.executeSql(vlsql, [] , function (tx, results) {
								var len = results.rows.length, i;
						 		console.log( len);						 		
						 		if (len >0) {
						 	  		console.log( results.rows.item(i) );
								  	$('#inputLote').val(results.rows.item(i).Lote);
								  	$('#inputFechaCaducidad').val(results.rows.item(i).FechaCaducidad);
								  	$('#inputCantidad').val(results.rows.item(i).Cantidad);
								  	$('#inputCodigo_barras').val(results.rows.item(i).codigo_barras);
								  	$('#inputClaveProdServ').val(results.rows.item(i).ClaveProdServ);
								  	$('#inputPrecio').val(results.rows.item(i).precio);
								  	$('#inputClaveOficialSSA').val(results.rows.item(i).ClaveOficialSSA);
								  	$('#inputClavePresentacionSSA').val(results.rows.item(i).ClavePresentacionSSA);
								  	$('#inputcVerificado').val(results.rows.item(i).cVerificado);
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
  	}
    

  $('#butMenu').click( function() {	
	  location.href ="menu.html";
	});	

  $('#butListarDetalleFactura').click( function() {	
	  location.href ="ListadeFacturasEDetADD.html";
	});	
  $('#butFactura').click( function() {	
	  location.href ="FacturaE.html";
	});	
  


	$('#butGuardar').click (function() {

 		var vlcVerificado ="";


		vlIdFacturaProveedor =localStorage.getItem("KEYEntrada");
				
		if (vlIdFacturaProveedor){		
			//const inputclaveOficial = $('#inputClaveOficial');
			//const inputDescripcionProducto = $('#inputDescripcionProducto');		
			

			vlcVerificado = $('#inputcVerificado').val();
					

			 console.log(vlIdFacturaProveedorDetalleADD);


			if (vlIdFacturaProveedorDetalleADD){

				try{	
			        db.transaction(function (tx) {	
								vlsql =  " UPDATE alm_FacturasProveedorDet_ADDENDA ";
								vlsql += " SET cVerificado = '" + vlIdProducto  + "' ";
		        				vlsql += " WHERE  id   =  "+ vlIdFacturaProveedorDetalleADD +" ";
				 			
					 			console.log(vlsql);
								tx.executeSql(vlsql,[]);
								alert("Se Actualizo con exito");
							});										
				} catch(e) {
					alert("Error processing SQL: "+ e.message);
					return;
				}
			}

		}		
	});	


	init();



	function fn_BuscarProveedorDetalle(){
		var vlRFC ="";
	 	vlRFC = $('#inputProveedor').val(); 
		{
			$('#DescripcionProveedor').val("");
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
							  	$('#DescripcionProveedor').val(results.rows.item(i).Nombre)						 		
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


});


