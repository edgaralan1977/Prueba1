
$(document).ready(function(){


  var vlKEY = localStorage.getItem("KEYEntrada");		
	
  $('#butNueva').click( function() {	
		document.getElementById("myForm").reset();
		
		$('#descripcionProveedor').html("");
		localStorage.setItem("KEYEntrada", "");

		document.getElementById('inputFecha').setAttribute("disabled","disabled");
		document.getElementById('inputObservaciones').setAttribute("disabled","disabled");
		document.getElementById('inputTotal').setAttribute("disabled","disabled");
		document.getElementById('inputUUID').setAttribute("disabled","disabled");
		
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
		        	var vlsql=	"SELECT * FROM alm_FacturasProveedor A  ";        	
		        	vlsql += " WHERE  A.id = "+ vlKEY +" ";
			 		console.log(vlsql);
			 		try{
				 			tx.executeSql(vlsql, [] , function (tx, results) {
					 		var len = results.rows.length, i;
					 		console.log( len);
					 		if (len >0) {
								 $('#inputRFCProveedor').val(results.rows.item(i).RFC);
								 $('#inputFacturaProveedor').val(results.rows.item(i).Folio);	
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
		        	var vlsql=	"SELECT * FROM alm_FacturasProveedor A  ";        	
		        	vlsql += "WHERE  A.Folio  =  '"+ vlFacturaProveedor +"' AND A.RFC  =  '"+ vlRFCProveedor +"'";
			 		console.log(vlsql);
			 		try{
				 			tx.executeSql(vlsql, [] , function (tx, results) {
					 		var len = results.rows.length, i;
					 		console.log( len);
					 		if (len >0) {
					 			console.log (results.rows.item(i));
					 			vlKEY=  results.rows.item(i).id ;
				    			var vlSubTotal ;
				    			var vlIVA;
				    			var vlTotal;
								 vlTotal= 	numberFormat(results.rows.item(i).Total);
								// vlSubTotal=results.rows.item(i).SubTotal;
								// vlIVA =  results.rows.item(i).IVA;
								// vlTotal = parseFloat(vlSubTotal)+parseFloat(vlIVA) ;
								//$('#KEY').val(results.rows.item(i).id);	    			
								$('#inputRFCProveedor').val(results.rows.item(i).RFC);
								$('#inputFacturaProveedor').val(results.rows.item(i).Folio);	
								// $('#inputSubTotal').val(vlSubTotal);						 
								// $('#inputIVA').val(vlIVA);
								$('#inputTotal').val(vlTotal);
								console.log (results.rows.item(i).Total);
								//$('#inputPedido').val(results.rows.item(i).Pedido);
								$('#inputUUID').val(results.rows.item(i).UUID);
								 
								$('#inputObservaciones').val(results.rows.item(i).Observaciones);					
								$('#inputFecha').val(results.rows.item(i).fecha);					

								// document.getElementById('inputPedido').removeAttribute("disabled");
								document.getElementById('inputFecha').setAttribute("disabled","disabled");
								document.getElementById('inputObservaciones').setAttribute("disabled","disabled");
								//document.getElementById('inputObservaciones').removeAttribute("disabled");
								//document.getElementById('inputSubTotal').removeAttribute("disabled");
								//document.getElementById('inputIVA').removeAttribute("disabled");
								//document.getElementById('inputTotal').removeAttribute("disabled");
								
								document.getElementById('inputRFCProveedor').setAttribute("disabled","disabled");
								document.getElementById('inputFacturaProveedor').setAttribute("disabled","disabled");

								fn_BuscarProveedor (results.rows.item(i).RFC);

					 		}
					 		else{
								console.log ("factura no encontrada ");
								//document.getElementById('inputPedido').removeAttribute("disabled");
								//document.getElementById('inputFecha').removeAttribute("disabled");
								//document.getElementById('inputObservaciones').removeAttribute("disabled");
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



});





