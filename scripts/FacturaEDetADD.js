$(document).ready(function(){

	var vlKEY = localStorage.getItem("KEYEntrada");		
	var vlIdFacturaProveedor =localStorage.getItem("KEYEntrada");	
	var vlIdFacturaProveedorDetalleADD =localStorage.getItem("idEntradaDetalleADD");
	console.log(" id del detalle de fe");
	console.log(vlIdFacturaProveedor);	
	console.log(vlIdFacturaProveedorDetalleADD);

  	function init(){
		if (vlIdFacturaProveedor){
			try{		
		        db.transaction(function (tx) {	
		        	var vlsql=	"SELECT * FROM alm_FacturasProveedor A  ";        	
		        	vlsql += "WHERE  A.idFacturaProveedor = '"+ vlIdFacturaProveedor +"'";
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
			        	vlsql += "WHERE  A.idFacturasProveedorDet_ADDENDA  =  '"+ vlIdFacturaProveedorDetalleADD +"'";
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
								  	$('#inputPrecio').val(results.rows.item(i).precio);								  	
								  	$('#inputCodigo_barras').val(results.rows.item(i).codigo_barras);
								  	fn_BuscarCodigodeBarrasDetalle();
								  	$('#inputClaveOficialSSA').val(results.rows.item(i).ClaveOficialSSA);
								  	fn_BuscarProductoDetalle();
								  	$('#inputClavePresentacionSSA').val(results.rows.item(i).ClavePresentacionSSA);
								  	fn_BuscarPresentacionDetalle();
								  	$('#inputcVerificado').val(results.rows.item(i).cVerificado);
								  	$('#inputObservaciones').val(results.rows.item(i).Observaciones);
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
 	 var vlObservaciones =""; 		
	 if (vlIdFacturaProveedor){		
	  vlcVerificado = $('#inputcVerificado').val();
	  vlObservaciones = $('#inputObservaciones').val();
	  console.log(vlIdFacturaProveedorDetalleADD);
	  if (vlIdFacturaProveedorDetalleADD){
	   try{	
	    db.transaction(function (tx) {	
		 vlsql =  " UPDATE alm_FacturasProveedorDet_ADDENDA ";
		 vlsql += " SET cVerificado = '" + vlcVerificado  + "' ";
		 vlsql += "    ,Observaciones = '" + vlObservaciones  + "' ";								
         vlsql += " WHERE  idFacturasProveedorDet_ADDENDA   =  '"+ vlIdFacturaProveedorDetalleADD +"'";		 			
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
		        	var vlsql=	"SELECT * FROM ctl_Proveedores WHERE RFC = '"+ vlRFC.trim() +"'"
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

	function fn_BuscarPresentacionDetalle(){
		var vlClavePresentacion ="";
	 	vlClavePresentacion = $('#inputClavePresentacionSSA').val(); 
		{
			$('#inputDescripcionPresentacionSSA').val("");
			try{		
		        db.transaction(function (tx) {	
		        	var vlsql=	"SELECT * FROM ctl_Presentaciones WHERE idPresentacion = '"+ vlClavePresentacion.trim() +"'"
			 		console.log(vlsql);
			 		try{
				 		tx.executeSql(vlsql, [] , function (tx, results) {
					 		var len = results.rows.length, i;
					 		console.log( len);
					 		if (len >0) {
					 			console.log("Presentacion encontrada");
							  	$('#inputDescripcionPresentacionSSA').val(results.rows.item(i).Descripcion)						 		
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


	function fn_BuscarProductoDetalle(){
		var vlClave ="";
	 	vlClave = $('#inputClaveOficialSSA').val(); 
		{
			$('#inputDescripcionClaveOficialSSA').val("");
			try{		
		        db.transaction(function (tx) {	
		        	var vlsql=	"SELECT * FROM ctl_Productos WHERE idClaveOficial = '"+ vlClave.trim() +"'"
			 		console.log(vlsql);
			 		try{
				 		tx.executeSql(vlsql, [] , function (tx, results) {
					 		var len = results.rows.length, i;
					 		console.log( len);
					 		if (len >0) {
					 			console.log("Producto encontrado");
							  	$('#inputDescripcionClaveOficialSSA').val(results.rows.item(i).Descripcion)						 		
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


	function fn_BuscarCodigodeBarrasDetalle(){
		var vlClaveCB ="";
	 	vlClaveCB = $('#inputCodigo_barras').val(); 
		{
			$('#inputDescripcionCodigo_barras').val("");
			try{		
		        db.transaction(function (tx) {	
		        	var vlsql=	"SELECT * FROM ctl_CodigosdeBarras WHERE CodigoBarras = '"+ vlClaveCB.trim() +"' ;"
			 		console.log(vlsql);
			 		try{
				 		tx.executeSql(vlsql, [] , function (tx, results) {
					 		var len = results.rows.length, i;
					 		console.log( len);
					 		if (len >0) {
					 			console.log("Codigo de Barras  encontrado");
							  	$('#inputDescripcionCodigo_barras').val(results.rows.item(i).Descripcion)						 		
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

	app.isLoading =true;
	if (app.isLoading) {
	      app.spinner.setAttribute('hidden', true);  
	      app.container.removeAttribute('hidden');   
	      app.isLoading = false;
	    }

});


