
$(document).ready(function(){

	var objProveedores ;
	fnCargarProveedores();	
	var objProveedores2 =localStorage.getItem("objProveedores");	
	if (objProveedores2){
		objProveedores = JSON.parse(objProveedores2);		
		console.log (objProveedores);
	}


	
  var vlKEY = localStorage.getItem("KEYEntrada");		
	
  $('#butNueva').click( function() {	
		document.getElementById("myForm").reset();
		
		$('#descripcionProveedor').html("");
		localStorage.setItem("KEYEntrada", "");
		document.getElementById('inputPedido').setAttribute("disabled","disabled");
		document.getElementById('inputFecha').setAttribute("disabled","disabled");
		document.getElementById('inputObservaciones').setAttribute("disabled","disabled");
		document.getElementById('inputSubTotal').setAttribute("disabled","disabled");
		document.getElementById('inputIVA').setAttribute("disabled","disabled");
		document.getElementById('inputTotal').setAttribute("disabled","disabled");
		
		document.getElementById('inputRFCProveedor').removeAttribute("disabled");
		document.getElementById('inputFacturaProveedor').removeAttribute("disabled");
		
	});	

  $('#butCapturarDetalle').click( function() {
	  if ($('#KEY').val()==="" ){
	      alert("Hace falta Guardar la Factura antes de capturar el detalle" );
	      return false;
	  }  	
	  location.href ="FacturaProveedorDetalle.html";
	});	

  $('#butListarFacturas').click( function() {	
	  location.href ="ListadeFacturasdeProveedor.html";
	});	

  $('#butListarDetalle').click( function() {	
	  location.href ="ListadeFacturasdeProveedorDetalle.html";
	});
  $('#butListarDetFE').click( function() {	
	  location.href ="ListadeFacturasdeProveedorDetFE.html";
	});	
  $('#butListarDetADD').click( function() {	
	  location.href ="ListadeFacturasdeProveedorDetADD.html";
	});

  $('#butMenu').click( function() {	
	  location.href ="menu.html";
	});	

  $('#butExcel').click( function() {
	  location.href ="FacturaProveedorExcel.html";
	});	

	$('#butGuardar').click (function() {

		var vlFacturaProveedor = "";
		var vlProveedor = "";
		var vlPedido = "";
		var vlObservaciones = "";
		var vlSubTotal = "";
		var vlIVA = "";
		var vlTotal = "";
		var vlFecha ="";
		var vlIDUMedica = "00001";
		var vlAEjercicio = "2018";
		var vlIdMotivo ="001";
		var vlTipoES ="F";
		var vlObservaciones="";
		var vlIdPersonalR ="123";
		var vlestatus ="C";


		vlFacturaProveedor = $('#inputFacturaProveedor').val();
		vlProveedor = $('#inputRFCProveedor').val();
		vlPedido = $('#inputPedido').val();
		vlObservaciones = $('#inputObservaciones').val();
		vlSubTotal = $('#inputSubTotal').val();
		vlIVA = $('#inputIVA').val();
		vlTotal = $('#inputTotal').val();
		vlFecha = $('#inputFecha').val();
		// vlFecha = vlFecha.replace("-", "");
		// vlFecha = vlFecha.replace("-", "");
		console.log(vlFecha);
				
		if   ( vlFacturaProveedor ==="") {
	      alert("Hace falta el folio de la factura  " );
	      return false;  
	   	}
	   	if   ( vlProveedor ==="") {
	      alert("Hace falta el proveedor " );
	      return false;  
	   	}
	   	if   ( vlFecha ==="") {
	      alert("Hace falta la Fecha" );
	      return false;  
	   	}	   		   	
	   	
	   	// if   ( vlSubTotal ==="") {
	    //   alert("Hace falta el SubTotal" );
	    //   return false;  
	   	// }
//	   	if   ( vlTotal ==="") {
//	      alert("Hace falta el Total" );
//	      return false;  
//	   	}
	   	
	   	if (vlIVA===""){
	   		vlIVA="0";
	   	}
		
	   	console.log("Guardar 1");

		try{		
	        db.transaction(function (tx) {	
	        	var vlsql=	"SELECT * FROM ALM_Movimiento A  ";        	
	        	vlsql += "WHERE  A.FolioMovimiento   =  '"+ vlFacturaProveedor +"' AND A.RFCProveedor  =  '"+ vlProveedor +"'";
		 		console.log(vlsql);
		 		try{
			 			tx.executeSql(vlsql, [] , function (tx, results) {
				 		var len = results.rows.length, i;
				 		console.log( len);
				 		if (len >0) {
							vlsql =  " UPDATE ALM_Movimiento ";
							vlsql += " SET Observaciones = '" + vlObservaciones  + "' ";
							vlsql += "    ,Pedido = '" + vlPedido  + "' ";
							vlsql += "    ,Fecha = '" + vlFecha  + "' ";
	        				vlsql += " WHERE  FolioMovimiento   =  '"+ vlFacturaProveedor +"' ";
	        				vlsql += "    AND RFCProveedor  =  '"+ vlProveedor +"'";				 			
				 			console.log(vlsql);
							tx.executeSql(vlsql,[]);
							alert("Se Actualizo con exito");
				 		}
				 		else{
				 			console.log("insert");
							vlsql=" INSERT INTO ALM_Movimiento (   IdUmedica, AEjercicio ,IdMotivo ,FolioMovimiento , TipoES ,Fecha, RFCProveedor  ,Observaciones, Pedido , IdPersonalR  , estatus )";
							vlsql+="  VALUES ( '"+vlIDUMedica +"', '"+ vlAEjercicio +"', '"+ vlIdMotivo +"', '"+ vlFacturaProveedor +"', '"+ vlTipoES +"', '"+ vlFecha +"', '"+ vlProveedor +"', '"+ vlObservaciones  +"', '"+ vlPedido +"', '"+ vlIdPersonalR  +"', '"+ vlestatus + "') ";

							console.log(vlsql);
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



	$('#btnBuscarProveedor').click( function()	{		
		$('#inputNombre').val("");
		var vlRFC = "";
		vlRFC = $('#inputRFCProveedor').val();

		fn_BuscarProveedor(vlRFC);
	});

	
	$('#inputSubTotal').blur( function()	{		
		fnCalcularTotal();
	});

	$('#inputIVA').blur( function()	{		
		fnCalcularTotal();
	});		
	
	function fnCalcularTotal(){
		var vlSubTotal=0.0;
		var vlIVA =0.0;
		var vlTotal=0.0;

		// vlSubTotal = $('#inputSubTotal').val();
		// vlIVA= $('#inputIVA').val();
		// vlTotal=0.0;
		// if (vlSubTotal!==""  && vlIVA!==""  ){
		// 	vlTotal =parseFloat(vlSubTotal) + parseFloat(vlIVA);	
		// }
		document.getElementById('inputIVA').setAttribute("disabled","disabled");
		document.getElementById('inputSubTotal').setAttribute("disabled","disabled");
		document.getElementById('inputTotal').setAttribute("disabled","disabled");	
		if (vlKEY){
			try{		
		        db.transaction(function (tx) {	
		        	var vlsql=	"SELECT SUM(iva) AS IVA, SUM(Cantidad*Costo) SubTotal , SUM(iva) + SUM(Cantidad*Costo) as Total  FROM ALM_MovimientoDet  WHERE id = "+ vlKEY +" GROUP BY id"
			 		//tx.executeSql("SELECT * FROM ctl_Presentaciones where idPresentacion = ? ", [vlIDPresentacion], function (tx, results) {
			 		console.log(vlsql);
			 		try{
				 		tx.executeSql(vlsql, [] , function (tx, results) {
					 		var len = results.rows.length, i;
					 		console.log( len);
					 		if (len >0) {
					 			console.log("Totales");
							  	vlIVA =results.rows.item(i).IVA;
							  	vlSubTotal =results.rows.item(i).SubTotal;
							  	vlTotal =results.rows.item(i).Total;
						 		
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
		

		$('#inputIVA').val(vlIVA);
		$('#inputSubTotal').val(vlSubTotal);
		$('#inputTotal').val(vlTotal);			
	}
	
	
	function fn_BuscarProveedor(vlRFCProveedor){
		var vlRFC ="";
	 	vlRFC =vlRFCProveedor ;
		// if 	 (vlRFC==!"")
		{
			$('#descripcionProveedor').val("");
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
	
	
	$('#butBuscar').click( function()	{		
		fn_Buscar();
	});


	function fn_limpiar(){
		 $('#inputPedido').val("");
		 $('#inputSubTotal').val("");						 
		 $('#inputIVA').val("");
		 $('#inputTotal').val("");
		 $('#inputPedido').val("");
		 $('#inputObservaciones').val("");			
	}

	function fn_BuscarKEY(vlKEY){		

		 $('#inputRFCProveedor').val("");
		 $('#descripcionProveedor').val( "");
		 $('#inputFacturaProveedor').val("");	
		fn_limpiar();
		if (vlKEY){
			try{		
		        db.transaction(function (tx) {	
		        	var vlsql=	"SELECT * FROM ALM_Movimiento A  ";        	
		        	vlsql += "WHERE  A.id = "+ vlKEY +" ";
			 		console.log(vlsql);
			 		try{
				 			tx.executeSql(vlsql, [] , function (tx, results) {
					 		var len = results.rows.length, i;
					 		console.log( len);
					 		if (len >0) {
								 $('#inputRFCProveedor').val(results.rows.item(i).RFCProveedor);
								 $('#inputFacturaProveedor').val(results.rows.item(i).FolioMovimiento);	
								 fn_Buscar();
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



	
	function fn_Buscar(){

		var vlRFCProveedor = "" ;
		var vlFacturaProveedor = "" ;
		vlKEY ="";
		vlRFCProveedor = $('#inputRFCProveedor').val();
		vlFacturaProveedor = $('#inputFacturaProveedor').val();
		console.log(vlRFCProveedor + vlFacturaProveedor);


		{

			try{		
		        db.transaction(function (tx) {	
		        	var vlsql=	"SELECT * FROM ALM_Movimiento A  ";        	
		        	vlsql += "WHERE  A.FolioMovimiento   =  '"+ vlFacturaProveedor +"' AND A.RFCProveedor  =  '"+ vlRFCProveedor +"'";
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
								 $('#inputRFCProveedor').val(results.rows.item(i).RFCProveedor);
								 $('#inputFacturaProveedor').val(results.rows.item(i).FolioMovimiento);	
								 $('#inputSubTotal').val(vlSubTotal);						 
								 $('#inputIVA').val(vlIVA);
								 $('#inputTotal').val(vlTotal);
								 $('#inputPedido').val(results.rows.item(i).Pedido);
								 $('#inputObservaciones').val(results.rows.item(i).Observaciones);					
								 $('#inputFecha').val(results.rows.item(i).Fecha);					


								document.getElementById('inputPedido').removeAttribute("disabled");
								document.getElementById('inputFecha').removeAttribute("disabled");
								document.getElementById('inputObservaciones').removeAttribute("disabled");
								//document.getElementById('inputSubTotal').removeAttribute("disabled");
								//document.getElementById('inputIVA').removeAttribute("disabled");
								//document.getElementById('inputTotal').removeAttribute("disabled");
								
								document.getElementById('inputRFCProveedor').setAttribute("disabled","disabled");
								document.getElementById('inputFacturaProveedor').setAttribute("disabled","disabled");

								fn_BuscarProveedor (results.rows.item(i).RFCProveedor);
								fnCalcularTotal();
					 		}
					 		else{
								console.log ("factura de proveedor nueva");
								document.getElementById('inputPedido').removeAttribute("disabled");
								document.getElementById('inputFecha').removeAttribute("disabled");
								document.getElementById('inputObservaciones').removeAttribute("disabled");
								// document.getElementById('inputSubTotal').removeAttribute("disabled");
								// document.getElementById('inputIVA').removeAttribute("disabled");
								
								document.getElementById('inputRFCProveedor').setAttribute("disabled","disabled");
								document.getElementById('inputFacturaProveedor').setAttribute("disabled","disabled");	
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


	if (vlKEY){
		fn_BuscarKEY(vlKEY);
	}

	$('#inputRFCProveedor').typeahead({
	    source: objProveedores ,
	    onselect: function(obj) {	    	
	    	console.log(obj)  ;      	    	
	    	console.log('Selecciono '+obj.value);
	    	 $('#inputRFCProveedor').val( obj.RFC );
	    	 $('#descripcionProveedor').val( obj.Nombre );	    	 
	    }
	});  
  	


});




