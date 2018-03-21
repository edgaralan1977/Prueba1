
$(document).ready(function(){
 
 	var objPresentaciones;
	var objProductos;
	var objCodigosdeBarras;	

	fnCargarPresentaciones();
	fnCargarProductos();
	fnCargarCodigosdeBarras();

	var objPresentaciones2 =localStorage.getItem("objPresentaciones");	
	if (objPresentaciones2){
		objPresentaciones = JSON.parse(objPresentaciones2);		
		console.log (objPresentaciones);
	}	


	var objProductos2 =localStorage.getItem("objProductos");	
	if (objProductos2){			
		objProductos = JSON.parse(objProductos2);		
		console.log (objProductos);
	}
 
 	var objCodigosdeBarras2 =localStorage.getItem("objCodigosdeBarras");	
	if (objCodigosdeBarras2){			
		objCodigosdeBarras = JSON.parse(objCodigosdeBarras2);		
		console.log (objCodigosdeBarras);
	}
	
	var vlIdFacturaProveedor =localStorage.getItem("KEYEntrada");	
	var vlIdFacturaProveedorDetalle =localStorage.getItem("idEntradaDetalle");
	
	//document.getElementById("KEYPresentacion").style.visibility = "hidden";

  	function init(){
		if (vlIdFacturaProveedor){	
			// appFB.database().ref('Entradas/'+vlIdFacturaProveedor).once('value').then(function(snapshot){
			// 	console.log(vlIdFacturaProveedor);
			// 	console.log(vlIdFacturaProveedorDetalle);
			// 	var childData = snapshot.val();
			// 	 $('#inputProveedor').val(childData.Proveedor);
				 
			// 	vlRFC = childData.Proveedor;
			// 	var ListRef = appFB.database().ref('Proveedores');				
			// 	ListRef.orderByChild("RFC").equalTo(vlRFC).once("child_added", function(snapshot1) {
			// 		console.log(snapshot1.val().Nombre);
			//   		$('#DescripcionProveedor').val(snapshot1.val().Nombre);
		 //  		});				 
				 
			// 	 $('#inputFactura').val(childData.FacturaProveedor);
				 
			// 	if (vlIdFacturaProveedorDetalle){
			// 		console.log ('Entradas/'+vlIdFacturaProveedor+"/"+ vlIdFacturaProveedorDetalle);
			// 		appFB.database().ref('Entradas/'+vlIdFacturaProveedor+"/"+ vlIdFacturaProveedorDetalle).once('value').then(function(snapshot1){
			// 			var childData1 = snapshot1.val();
			// 			if (childData1) {
			// 				console.log(childData1);
			// 				 $('#inputClaveOficial').val(childData1.ClaveOficial);
			// 				 $('#inputCodigoBarras').val(childData1.CodigoBarra);
			// 				 $('#inputPresentacion').val(childData1.Presentacion);
			// 				 $('#inputLote').val(childData1.Lote);
			// 				 $('#inputFCaducidad').val(childData1.FechaCaducidad);
			// 				 $('#inputCantidad').val(childData1.Cantidad);
			// 				 $('#inputCosto').val(childData1.Costo);
			// 				 $('#inputIVA').val(childData1.Iva);
			// 				 $('#inputObservaciones').val(childData1.Observaciones);
			// 				 BuscarPresentacion();
			// 				 BuscarProducto();
							 
			// 			}
	
			// 		});		
			// 	}
			// });


		

			try{		
		        db.transaction(function (tx) {	
		        	var vlsql=	"SELECT * FROM ALM_Movimiento A  ";        	
		        	vlsql += "WHERE  A.id  =  "+ vlIdFacturaProveedor +"";
			 		console.log(vlsql);
			 		try{
				 			tx.executeSql(vlsql, [] , function (tx, results) {
					 		var len = results.rows.length, i;
					 		console.log( len);
					 		if (len >0) {
					 			vlKEY=  results.rows.item(i).id ;
				    			var vlSubTotal ;
				    			var vlIVA;
				    			var vlTotal;
								vlSubTotal=results.rows.item(i).SubTotal;
								vlIVA =  results.rows.item(i).IVA;
								vlTotal = parseFloat(vlSubTotal)+parseFloat(vlIVA) ;
								$('#KEY').val(results.rows.item(i).id);	    			
								$('#inputProveedor').val(results.rows.item(i).RFCProveedor);
								$('#inputFactura').val(results.rows.item(i).FolioMovimiento);	
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

			if (vlIdFacturaProveedorDetalle){	
				
				 $('#inputFacturaDetalle').val(vlIdFacturaProveedorDetalle);
				try{		
			        db.transaction(function (tx) {	
			        	var vlsql=	"SELECT * FROM ALM_MovimientoDet A  ";        	
			        	vlsql += "WHERE  A.id  =  "+ vlIdFacturaProveedorDetalle +"";
				 		console.log(vlsql);
				 		try{
					 			tx.executeSql(vlsql, [] , function (tx, results) {
						 		var len = results.rows.length, i;
						 		console.log( len);
						 		if (len >0) {
								 $('#inputClaveOficial').val(results.rows.item(i).ClaveOficialProducto);
								 $('#inputCodigoBarras').val(results.rows.item(i).codigo_barras);
								 $('#inputPresentacion').val(results.rows.item(i).IdPresentacion);
								 $('#inputLote').val(results.rows.item(i).Lote);
								 $('#inputFCaducidad').val(results.rows.item(i).FechaCaducidad);
								 $('#inputCantidad').val(results.rows.item(i).Cantidad);
								 $('#inputCosto').val(results.rows.item(i).Costo);
								 $('#inputIVA').val(results.rows.item(i).IVA);
								 $('#inputObservaciones').val(results.rows.item(i).Observaciones);
								 fnBuscarCodigodeBarras();
								 fnBuscarPresentacion();
								 fnBuscarProducto();
								 fnCalcularTotalDetalle();
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
    

  	$('#butNuevo').click( function() {	
		document.getElementById("myForm").reset();
		localStorage.setItem("idEntradaDetalle", "");
		vlIdFacturaProveedorDetalle="";
		init();
  	});	  


  	$('#butBucarPresentaciones').click( function() {
  		fnBuscarPresentacion();
  	});	
	
	
  // 	function BuscarPresentacion(){
		// var vlIDPresentacion = "";
		// var vlDescripcion = "";
		// var vlKEY="";
		// vlIDPresentacion = $('#inputPresentacion').val();
		// console.log(vlIDPresentacion );		
		// if (vlIDPresentacion===""){
		// 	location.href ="BuscarPresentaciones.html";
		// }
		// else{
		// 	console.log("1");
		// 	var ListRef = appFB.database().ref('Presentaciones');
		// 	ListRef.orderByChild("IDPresentacion").equalTo(vlIDPresentacion).once("child_added", function(snapshot1) {
		// 		vlDescripcion =snapshot1.val().Descripcion;
		// 		console.log(vlDescripcion);
		//   		$('#DescripcionPresentacion').val(vlDescripcion);
		//   		$('#KEYPresentacion').val(vlKEY);
	 //  		});
		// }
	
  // 	}

	function fnBuscarPresentacion(){
		vlIdPresentacion = "";
		vlIDPresentacion = $('#inputPresentacion').val();

		$('#inputPresentacion').val("");				
  		$('#DescripcionPresentacion').val("");

		// var presentacionesListRef = appFB.database().ref('Presentaciones');		  		
		// presentacionesListRef.orderByChild("IDPresentacion").equalTo(vlIDPresentacion).once("child_added", function(snapshot) {			
		// 	var childData = snapshot.val();	
  //   		if (childData){				
		//       	console.log(childData);	      	
		// 		$('#inputIDPresentacion').val(childData.IDPresentacion);				
		// 		$('#DescripcionPresentacion').val(childData.Descripcion);
		// 	}
		// }, function (error) {
  //  			console.log("Error: " + error.code) ;
		// });

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
						  		$('#DescripcionPresentacion').val(results.rows.item(i).Descripcion);
						  		$('#inputPresentacion').val(results.rows.item(i).idPresentacion);
					 		}
				 		}
				 		else{				 			
				 			console.log("Presentacion no encontrada");
							$('#DescripcionPresentacion').val("");
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

  	$('#butBucarProducto').click( function() {  	
		fnBuscarProducto();
	});	

  	$('#butBucarCodigoBarras').click( function() {  	
		fnBuscarCodigodeBarras();
	});	


	$('#inputCantidad').blur( function()	{		
		fnCalcularTotalDetalle();
	});

	$('#inputCosto').blur( function()	{		
		fnCalcularTotalDetalle();
	});


	function fnBuscarCodigodeBarras(){
		var vlCodigodeBarras = "" ;
		vlCodigodeBarras = $('#inputCodigoBarras').val();
  		$('#inputNombreComercial').val("");

		console.log(vlCodigodeBarras);
		
		if (vlCodigodeBarras==="0"){
			return
		}

		try{		
	        db.transaction(function (tx) {	
	        	var  vlsql ="";
	        	vlsql +="SELECT cb.CodigoBarras ,cb.Descripcion,cb.idClaveOficial ,cb.idPresentacion,";  
	        	vlsql += " pre.Descripcion Presentacion, ";
	        	vlsql += " pro.Descripcion Producto ";	        	
	        	vlsql += " FROM ctl_CodigosdeBarras cb ";
	        	vlsql += " INNER JOIN ctl_Presentaciones Pre ";
	        	vlsql += " ON Pre.idPresentacion = cb.idPresentacion  ";	        	
	        	vlsql += " INNER JOIN ctl_Productos Pro ";	        	
	        	vlsql += " ON Pro.idClaveOficial = cb.idClaveOficial  ";	        		        	
	        	vlsql += " WHERE cb.CodigoBarras = '" + vlCodigodeBarras + "'";	        	

		 		//tx.executeSql("SELECT * FROM ctl_Presentaciones where idPresentacion = ? ", [vlIDPresentacion], function (tx, results) {
		 		console.log(vlsql);
		 		try{
			 		tx.executeSql(vlsql, [] , function (tx, results) {
				 		var len = results.rows.length, i;
				 		console.log( len);
				 		if (len >0) {
				 			console.log("Codigo de Barras encontrado");
					 		for (i = 0; i < len; i++) {								
						  		$('#inputNombreComercial').val(results.rows.item(i).Descripcion)
						  		$('#inputClaveOficial').val(results.rows.item(i).idClaveOficial)
						  		$('#DescripcionProducto').val(results.rows.item(i).Producto)
						  		$('#inputPresentacion').val(results.rows.item(i).idPresentacion)
						  		$('#DescripcionPresentacion').val(results.rows.item(i).Presentacion)
					 		}
				 		}
				 		else{
				 			console.log("Codigo de Barras no encontrado");
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


  $('#butMenu').click( function() {	
	  location.href ="menu.html";
	});	

  $('#butListarDetalleFactura').click( function() {	
	  location.href ="ListadeFacturasdeProveedorDetalle.html";
	});	
  $('#butFactura').click( function() {	
	  location.href ="FacturaProveedor.html";
	});	
  


	$('#butGuardar').click (function() {
		var vlTipoMI="";
		var vlClaveOficial="";
		var vlCodigoBarras="";
		var vlPresentacion="";
		var vlIva="";
		var vlIvaP="";
		var vlFactura="";
		var vlProveedor="";
		var vlLote="";
		var vlFCaducidad="";
		var vlCantidad="";
		var vlIdProducto="";
 		var vlidFuente = "";
 		var vlidClasificador ="";
 		var vlidPrograma ="";
 		var vlidComponente ="";
 		var vlidPartida = "";
 		var vlidUbicacionFisica ="";
 		var vlIdProducto ="";


		vlIdFacturaProveedor =localStorage.getItem("KEYEntrada");
				
		if (vlIdFacturaProveedor){		
			//const inputclaveOficial = $('#inputClaveOficial');
			//const inputDescripcionProducto = $('#inputDescripcionProducto');		
			
			vlClaveOficial = $('#inputClaveOficial').val();
			vlCodigoBarras= $('#inputCodigoBarras').val();
			vlPresentacion = $('#inputPresentacion').val();
			vlLote = $('#inputLote').val();
			vlFCaducidad = $('#inputFCaducidad').val();
			vlCantidad = $('#inputCantidad').val();
			vlCosto = $('#inputCosto').val();		
			vlIva = $('#inputIVA').val();			
			vlObservaciones = $('#inputObservaciones').val();
			
					
			if   ( vlClaveOficial ==="") {
		      alert("Hace falta la Clave  " );
		      return false;  
		   	}
		   	if   ( vlCantidad ==="") {
		      alert("Hace falta la Cantidad " );
		      return false;  
		   	}
		   	if   ( vlPresentacion ==="") {
		      alert("Hace falta la Presentacion" );
		      return false;  
		   	}
		   	if (vlIva===""){
		   		vlIva="0";
		   	}
		   	if (vlCodigoBarras===""){
		   		vlCodigoBarras="0";
		   	}	   	

			 console.log(vlIdFacturaProveedorDetalle);
			// if (vlIdFacturaProveedorDetalle !=="" ) {
	
				// var updates = {};
				// updates['/Entradas/' + vlIdFacturaProveedor + '/' + vlIdFacturaProveedorDetalle +'/ClaveOficial' ] = vlClaveOficial;
				// updates['/Entradas/' + vlIdFacturaProveedor + '/' + vlIdFacturaProveedorDetalle +'/CodigoBarra' ] = vlCodigoBarras;
				// updates['/Entradas/' + vlIdFacturaProveedor +  '/' + vlIdFacturaProveedorDetalle +'/Presentacion' ] = vlPresentacion;
				// updates['/Entradas/' + vlIdFacturaProveedor +  '/' + vlIdFacturaProveedorDetalle +'/Lote' ] = vlLote;		
				// updates['/Entradas/' + vlIdFacturaProveedor +  '/' + vlIdFacturaProveedorDetalle +'/FechaCaducidad' ] = vlFCaducidad;			
				// updates['/Entradas/' + vlIdFacturaProveedor +  '/' + vlIdFacturaProveedorDetalle +'/Cantidad' ] = vlCantidad;
				// updates['/Entradas/' + vlIdFacturaProveedor +  '/' + vlIdFacturaProveedorDetalle +'/Costo' ] = vlCosto;			
				// updates['/Entradas/' + vlIdFacturaProveedor +  '/' + vlIdFacturaProveedorDetalle +'/Iva' ] = vlIva;
				// updates['/Entradas/' + vlIdFacturaProveedor +  '/' + vlIdFacturaProveedorDetalle +'/Observaciones' ] = vlObservaciones;
				// console.log(updates);
				// appFB.database().ref().update(updates);
			       
			// 	alert("Se actualizo con exito");			
				
			// }else{	
		
			// 	var entradasListRef = appFB.database().ref('Entradas/'+vlIdFacturaProveedor);
			// 	//console.log (productosListRef);
				
			// 	//entradasListRef.orderByChild("ClaveOficial").equalTo(vlClaveOficial).on("child_added", function(snapshot) {
			// 	//  console.log(snapshot.key);
			// 	//  alert("Esta clave oficial ya existe" + vlClaveOficial);
			//     //  return false; 
			// 	//});
			// 	var vlObjeto ={
			// 	  'ClaveOficial': vlClaveOficial,
			// 	  'CodigoBarra': vlCodigoBarras,
			// 	  'Presentacion': vlPresentacion ,
			// 	  'Lote': vlLote,
			// 	  'FechaCaducidad': vlFCaducidad,
			// 	  'Cantidad': vlCantidad,
			// 	  'Costo': vlCosto,
			// 	  'Iva': vlIva,
			// 	  'Observaciones': vlObservaciones
			// 	};
			// 	console.log(vlObjeto);
			// 	var newDetalleDentradaRef = entradasListRef.push();
			// 	newDetalleDentradaRef.set(vlObjeto);
			// 	alert("Se Agrego con exito");
			// }

			if (vlIdFacturaProveedorDetalle){
				// try{
			 //        db.transaction(function (tx) {	
			 // 			var vlsql=	"DELETE FROM ALM_MovimientoDet WHERE id = "+ vlIdFacturaProveedorDetalle +""
				// 	 	console.log(vlsql);		        
			 //        	try{
			 //        		tx.executeSql(vlsql, []);
				// 	         console.log("Se Elimino con exito");
				//         }catch(e) {
				// 			alert("1 Error processing SQL: "+ e.message);
				// 			return;
				// 		}
				// 	});							
				// } catch(e) {
				// 	alert("Error processing SQL: "+ e.message);
				// 	return;
				// }


				try{	
			        db.transaction(function (tx) {	
								vlsql =  " UPDATE ALM_MovimientoDet ";
								vlsql += " SET IdProducto = '" + vlIdProducto  + "' ";
								vlsql += "    ,ClaveOficialProducto = '" + vlClaveOficial  + "' ";
								vlsql += "    ,IdPresentacion = '" + vlPresentacion  + "' ";
								vlsql += "    ,codigo_barras = '" + vlCodigoBarras  + "' ";								
								//vlsql += "    ,TipoMI = '" + vlTipoMI  + "' ";
								vlsql += "    ,Lote = '" + vlLote  + "' ";
								vlsql += "    ,FechaCaducidad = '" + vlFCaducidad  + "' ";
								vlsql += "    ,Cantidad = '" + vlCantidad  + "' ";
								//vlsql += "    ,idUbicacionFisica = '" + vlidUbicacionFisica  + "' ";
								vlsql += "    ,Costo = '" + vlCosto  + "' ";
								vlsql += "    ,IVA = '" + vlIva  + "' ";
								//vlsql += "    ,IVAP = '" + vlIVAP  + "' ";							
								vlsql += "    ,Observaciones = '" + vlObservaciones  + "' ";																
		        				vlsql += " WHERE  id   =  "+ vlIdFacturaProveedorDetalle +" ";
				 			
					 			console.log(vlsql);
								tx.executeSql(vlsql,[]);
								alert("Se Actualizo con exito");
							});										
				} catch(e) {
					alert("Error processing SQL: "+ e.message);
					return;
				}
			}else{

				try{	
			        db.transaction(function (tx) {	

			 			console.log("insert");
						vlsql=" INSERT INTO ALM_MovimientoDet ( idmovimiento, IdProducto, ClaveOficialProducto, IdPresentacion, codigo_barras, TipoMI,Lote ,FechaCaducidad, Cantidad, ";
						vlsql+="    idFuente, idClasificador, idPrograma, idComponente, idPartida,  idUbicacionFisica, Costo, IVA, IVAP , Observaciones )	";
						vlsql+="  VALUES ( '"+vlIdFacturaProveedor +"', '"+ vlIdProducto +"', '"+ vlClaveOficial +"', '"+ vlPresentacion +"', '"+ vlCodigoBarras +"', '"+ vlTipoMI +"', '"+ vlLote +"', '"+ vlFCaducidad +"', '"+ vlCantidad +"', "
						vlsql+=" '"+ vlidFuente  +"', '"+ vlidClasificador +"', '"+ vlidPrograma  +"', '"+ vlidComponente + "', '"+ vlidPartida +"', ";
						vlsql+=" '"+ vlidUbicacionFisica  +"', '"+ vlCosto +"', '"+ vlIva  +"', '"+ vlIvaP + "', '"+ vlObservaciones +"' ";						
						vlsql+=" ) ";
						console.log(vlsql);
						tx.executeSql(vlsql,[]);
						alert("Se Guardo con exito");
					});							
				} catch(e) {
					alert("Error processing SQL: "+ e.message);
					return;
				}

				try{		
			        db.transaction(function (tx) {	
			        	var vlsql=	"SELECT seq FROM sqlite_sequence  WHERE name = 'ALM_MovimientoDet' "
				 		//tx.executeSql("SELECT * FROM ctl_Presentaciones where idPresentacion = ? ", [vlIDPresentacion], function (tx, results) {
				 		console.log(vlsql);
				 		try{
					 		tx.executeSql(vlsql, [] , function (tx, results) {
						 		var len = results.rows.length, i;
						 		console.log( len);
						 		if (len >0) {
						 			console.log(" max id ");
						 			console.log(results.rows.item(i).seq);
								  	$('#inputFacturaDetalle').val(results.rows.item(i).seq);								  	
									localStorage.setItem("idEntradaDetalle", results.rows.item(i).seq);
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


	init();


	$('#inputClaveOficial').typeahead({
	    source: objProductos ,
	    onselect: function(obj) {	    	
	    	console.log(obj)  ;      	    	
	    	console.log('Selecciono '+obj.value);
	    	 $('#inputClaveOficial').val( obj.ClaveOficial );
	    	 $('#DescripcionProducto').val( obj.Descripcion );	    	 
	    }
	});  
  	

	$('#inputPresentacion').typeahead({
	    source: objPresentaciones ,
	    onselect: function(obj) { console.log(obj)  ;      
	    	console.log('Selecciono '+obj.value);
	    	 $('#inputPresentacion').val( obj.IDPresentacion );
	    	 $('#DescripcionPresentacion').val( obj.Descripcion);
	    }
	});

	$('#inputCodigoBarras').typeahead({
	    source: objCodigosdeBarras ,
	    onselect: function(obj) { console.log(obj)  ;      
	    	console.log('Selecciono '+obj.value);
	    	 $('#inputCodigoBarras').val( obj.KEY );
	    	 fnBuscarCodigodeBarras();
	    }
	});


	function fn_BuscarProveedor(vlRFCProveedor){
		var vlRFC ="";
	 	vlRFC =vlRFCProveedor ;
		// if 	 (vlRFC==!"")
		{
			$('#DescripcionProveedor').val("");
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
							  	$('#DescripcionProveedor').val(results.rows.item(i).Nombre)
						 		
					 		}
					 		else{
					 			console.log("Proveedor no encontrado");
					 			alert("Proveedor no encontrado");
							  	$('#DescripcionProveedor').val("");
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

	function fnBuscarProducto(){
		var vlClaveOficial = "";
		vlClaveOficial = $('#inputClaveOficial').val();
		vlClaveOficial =  vlClaveOficial.trim();
		console.log("Buscar producto " + vlClaveOficial);
		$('#inputClaveOficial').val("");				
  		$('#DescripcionProducto').val("");

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
				 			console.log("Producto encontrado");
					 		for (i = 0; i < len; i++) {
						  		$('#DescripcionProducto').val(results.rows.item(i).Descripcion);
						  		$('#inputClaveOficial').val(results.rows.item(i).idClaveOficial);
					 		}
				 		}
				 		else{				 			
				 			console.log("Producto no encontrado");
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

	function fnCalcularTotalDetalle(){
		var vlSubTotal=0.0;
		var vlIVA ;
		var vlTotal=0.0;
		var vlCantidad;
		var vlCosto;

		vlCantidad = $('#inputCantidad').val();
		vlCosto = $('#inputCosto').val();
		vlIVA= $('#inputIVA').val();
		console.log(vlIVA);
		vlSubTotal = parseInt(vlCantidad)  * parseInt(vlCosto)
		
		$('#inputSubTotal').val(vlSubTotal);
		// $('#inputIVA').val(vlIVA);

		vlTotal = vlSubTotal  + parseInt(vlIVA)		
		$('#inputTotal').val(vlTotal);			
		console.log (vlTotal);		
	}

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


