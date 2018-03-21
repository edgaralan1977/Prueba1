
$(document).ready(function(){


   var vlKEY = localStorage.getItem("KEYEntrada");	
	
	var vlIdFacturaProveedor =localStorage.getItem("KEYEntrada");	
	var vlIdFacturaProveedorDetalleFE =localStorage.getItem("idEntradaDetalleFE");
	console.log(" id del detalle de fe");
	console.log(vlIdFacturaProveedorDetalleFE);

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

			if (vlIdFacturaProveedorDetalleFE){	
								
				try{		
			        db.transaction(function (tx) {	
			        	var vlsql=	"SELECT * FROM alm_FacturasProveedorDet_FacturaElectronia A  ";        	
			        	vlsql += "WHERE  A.id  =  "+ vlIdFacturaProveedorDetalleFE +"";
				 		console.log(vlsql);
				 		try{
					 			tx.executeSql(vlsql, [] , function (tx, results) {
						 		var len = results.rows.length, i;
						 		console.log( len);
						 		if (len >0) {
								 $('#inputDescripcion').val(results.rows.item(i).Descripcion);
								 $('#inputUnidad').val(results.rows.item(i).Unidad);
								 $('#inputClaveUnidad').val(results.rows.item(i).ClaveUnidad);
								 $('#inputCantidad').val(results.rows.item(i).Cantidad);
								 $('#inputClaveProdServ').val(results.rows.item(i).ClaveProdServ);
								 $('#inputImporte').val(results.rows.item(i).Importe);
								 $('#inputValorUnitario').val(results.rows.item(i).ValorUnitario);
								 $('#inputNoIdentificacion').val(results.rows.item(i).NoIdentificacion);
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
	  location.href ="ListadeFacturasEDetFE.html";
	});	
  $('#butFactura').click( function() {	
	  location.href ="FacturaE.html";
	});	
  


	$('#butGuardar').click (function() {
 		var vlcVerificado ="";


		vlIdFacturaProveedor =localStorage.getItem("KEYEntrada");
				
		if (vlIdFacturaProveedor){		

			
			vlcVerificado = $('#inputcVerificado').val();
			
			 console.log(vlIdFacturaProveedorDetalleFE);


			if (vlIdFacturaProveedorDetalleFE){

				try{	
			        db.transaction(function (tx) {	
								vlsql =  " UPDATE alm_FacturasProveedorDet_FacturaElectronia ";
								vlsql += " SET cVerificado = '" + vlIdProducto  + "' ";																
		        				vlsql += " WHERE  id   =  "+ vlIdFacturaProveedorDetalle +" ";
				 			
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


