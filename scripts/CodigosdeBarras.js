
$(document).ready(function(){

	var objPresentaciones ;
	var objProductos ;

	fnCargarPresentaciones();
	fnCargarProductos();


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

    
    function init()
    {    
	    $('#butBuscarPresentaciones').hide();
	    $('#butBuscarProducto').hide();
	
		var vlKEYCodigodeBarras =localStorage.getItem("KEYCodigodeBarras");
		if (vlKEYCodigodeBarras){
			$('#inputKEY').val(vlKEYCodigodeBarras);
			$('#inputCodigodeBarras').val(vlKEYCodigodeBarras);
			fnBuscarKEY();
		}	
	}


 	 $('#butNuevo').click( function() {	
		fnLimpiar();
	});

	$('#butMenu').click( function() {	
		location.href ="menu.html";
	});


	$('#butListar').click( function() {	
		location.href ="ListadeCodigosdeBarras.html";
	});




	function fnBuscarKEY(){
		var vlKEY = "" ;
		vlKEY = $('#inputKEY').val();
		if (vlKEY===""){
			return false;
		}
		
		console.log (vlKEY);

		fnBuscar();

	}

	function fnBuscar(){
		var vlCodigodeBarras = "" ;
		vlCodigodeBarras = $('#inputCodigodeBarras').val();
  		$('#inputNombreComercial').val("");
  		$('#inputClaveOficial').val("");
  		$('#DescripcionProdcuto').val("");
  		$('#inputIDPresentacion').val("");
  		$('#DescripcionPresentacion').val("");

		console.log(vlCodigodeBarras);
		


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
	        	vlsql += " WHERE cb.CodigoBarras = '"+ vlCodigodeBarras +"'";	        	

		 		//tx.executeSql("SELECT * FROM ctl_Presentaciones where idPresentacion = ? ", [vlIDPresentacion], function (tx, results) {
		 		console.log(vlsql);
		 		try{
			 		tx.executeSql(vlsql, [] , function (tx, results) {
				 		var len = results.rows.length, i;
				 		console.log( len);
				 		if (len >0) {
				 			console.log("Codigo de Barras encontrado");
					 		for (i = 0; i < len; i++) {
					 			document.getElementById('inputCodigodeBarras').setAttribute("disabled","disabled");
								document.getElementById('inputNombreComercial').removeAttribute("disabled");
								document.getElementById('inputClaveOficial').removeAttribute("disabled");
								document.getElementById('inputIDPresentacion').removeAttribute("disabled");
								

						  		$('#inputNombreComercial').val(results.rows.item(i).Descripcion)
						  		$('#inputClaveOficial').val(results.rows.item(i).idClaveOficial)
						  		$('#DescripcionProdcuto').val(results.rows.item(i).Producto)
						  		$('#inputIDPresentacion').val(results.rows.item(i).idPresentacion)
						  		$('#DescripcionPresentacion').val(results.rows.item(i).Presentacion)
					 		}
				 		}
				 		else{
				 			console.log("Codigo de Barras no encontrado");
							alert( " Codigo de Barras " + vlCodigodeBarras +" nuevo " );
							document.getElementById('inputNombreComercial').removeAttribute("disabled");
							document.getElementById('inputClaveOficial').removeAttribute("disabled");
							document.getElementById('inputIDPresentacion').removeAttribute("disabled");

							document.getElementById('inputCodigodeBarras').setAttribute("disabled","disabled");	
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


	function fnBuscarPresentacion(){
		vlIdPresentacion = "";
		vlIDPresentacion = $('#inputIDPresentacion').val();

		$('#inputIDPresentacion').val("");				
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
								document.getElementById('DescripcionPresentacion').removeAttribute("disabled");
								document.getElementById('inputIDPresentacion').setAttribute("disabled","disabled");
						  		$('#DescripcionPresentacion').val(results.rows.item(i).Descripcion);
						  		$('#inputIDPresentacion').val(results.rows.item(i).idPresentacion);
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


	function fnBuscarProducto(){
		//060.166.3685
		var vlClaveOficial = "";
		vlClaveOficial = $('#inputClaveOficial').val();
		vlClaveOficial =  vlClaveOficial.trim();
		console.log("Buscar producto " + vlClaveOficial);
		$('#inputClaveOficial').val("");				
  		$('#DescripcionProdcuto').val("");
  		
		// var productosListRef = appFB.database().ref('Productos');
		// productosListRef.orderByChild("ClaveOficial").equalTo(vlClaveOficial).once("child_added", function(snapshot) {
		// console.log ('uno');
		// 	var childData = snapshot.val();	
  //   		if (childData){
		//       	console.log(childData);	      	
		// 		$('#inputClaveOficial').val(childData.ClaveOficial);				
		// 		$('#DescripcionProdcuto').val(childData.Descripcion);
		// 	}
		// }, function (error) {
  //  			console.log("Error: " + error.code) ;
		// });

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
								document.getElementById('DescripcionProdcuto').removeAttribute("disabled");
								document.getElementById('inputClaveOficial').setAttribute("disabled","disabled");
						  		$('#DescripcionProdcuto').val(results.rows.item(i).Descripcion);
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


	$('#butBuscar').click( function()	{		
		fnBuscar();			
	});
	
	$('#butBuscarPresentacion').click( function()	{		
		fnBuscarPresentacion();	
	});	
	
	$('#butBuscarProducto').click( function()	{		
		fnBuscarProducto();	
	});	
	

	$('#butEliminar').click (function() {
		var vlCodigodeBarras="";

		
		vlCodigodeBarras = $('#inputCodigodeBarras').val();

		if   ( vlCodigodeBarras ==="") {
	      alert("Hace falta el codigo de barras  " );
	      return false;  
	   	}

		// var vlKEY = "";
		// vlKEY = $('#inputKEY').val();
		// if (vlKEY ===""){
		// 	alert("Esta clave no existe ");
		// }else{		
			 // var vlRuta = "";
			 // vlRuta= "/Productos/" + vlKEY;	
			 // console.log(vlRuta);


			 // var ProductoRef = appFB.database().ref(vlRuta);
			 // ProductoRef.remove();

		try{		
	        db.transaction(function (tx) {	
	        	var vlsql=	"SELECT * FROM  ctl_CodigosdeBarras WHERE CodigoBarras = '"+ vlCodigodeBarras +"'"
		 		//tx.executeSql("SELECT * FROM ctl_Presentaciones where idPresentacion = ? ", [vlIDPresentacion], function (tx, results) {
		 		console.log(vlsql);
		 		try{
			 		tx.executeSql(vlsql, [] , function (tx, results) {
				 		var len = results.rows.length, i;
				 		console.log( len);
				 		if (len >0) {
				 			console.log("Codigo de barras encontrado");
				            var vlsql=	"DELETE FROM ctl_CodigosdeBarras WHERE CodigoBarras = '"+ vlCodigodeBarras +"'"
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
				 			console.log("Codigo de barras  no encontrado");
							alert( " Codigo de barras " + vlCodigodeBarras +" no encontrado " );
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



        

		//}		
	});	


	function fnLimpiar() {
			document.getElementById("myForm").reset();
			
			document.getElementById('inputNombreComercial').setAttribute("disabled","disabled"); 		
			document.getElementById('inputIDPresentacion').setAttribute("disabled","disabled");
			document.getElementById('inputClaveOficial').setAttribute("disabled","disabled");
			
			document.getElementById('inputCodigodeBarras').removeAttribute("disabled");	
		 	localStorage.setItem("KEYCodigodebarras", "");		 	

			$('#butBuscar').show();				
		    $('#butBuscarPresentaciones').hide();
		    $('#butBuscarProducto').hide();			 	
			
	}


	$('#butGuardar').click (function() {
		var vlClaveOficial="";
		var vlNombreComercial="";
		var vlIDPresentacion="";
		var vlCodigodeBarras="";

		
		//const inputclaveOficial = $('#inputClaveOficial');
		//const inputDescripcionProducto = $('#inputDescripcionProducto');		

		vlCodigodeBarras = $('#inputCodigodeBarras').val();
		vlNombreComercial = $('#inputNombreComercial').val();
		vlIDPresentacion = $('#inputIDPresentacion').val();
		vlClaveOficial = $('#inputClaveOficial').val();


		if   ( vlCodigodeBarras ==="") {
	      alert("Hace falta el codigo de barras  " );
	      return false;  
	   	}
	   	if   ( vlNombreComercial ==="") {
	      alert("Hace falta el nombre comercial " );
	      return false;  
	   	}
	   	if   ( vlIDPresentacion ==="") {
	      alert("Hace falta la presentacion " );
	      return false;  
	   	}	   	
	   	if   ( vlClaveOficial ==="") {
	      alert("Hace falta la Clave Oficial " );
	      return false;  
	   	}	   
		
		vlKEY = $('#inputKEY').val();
		// if (vlKEY !=="" ) {
		// 	console.log (vlKEY);
		// 	var updates = {};
		// 	updates['/CodigosdeBarras/' + vlKEY + '/NombreComercial' ] = vlNombreComercial;
		// 	updates['/CodigosdeBarras/' + vlKEY + '/ClaveOficial' ] = vlClaveOficial;
		// 	updates['/CodigosdeBarras/' + vlKEY + '/IDPresentacion' ] = vlIDPresentacion;			
		// 	console.log(updates);
		// 	appFB.database().ref().update(updates);
		       
		// 	alert("Se actualizo con exito");			
			
		// }else{		
		// 	console.log ("nuevo Codigo de Barras");	
		// 	var CodigodeBarrasListRef = appFB.database().ref('CodigosdeBarras');
			
		// 	var newCodigodeBarrasRef = CodigodeBarrasListRef.push();
		// 	newCodigodeBarrasRef.set({
		// 	  'CodigodeBarras': vlCodigodeBarras,
		// 	  'NombreComercial': vlNombreComercial,
		// 	  'ClaveOficial': vlClaveOficial ,
		// 	  'IDPresentacion': vlIDPresentacion
		// 	});
		// 	console.log({
		// 	  'CodigodeBarras': vlCodigodeBarras,
		// 	  'NombreComercial': vlNombreComercial,
		// 	  'ClaveOficial': vlClaveOficial ,
		// 	  'IDPresentacion': vlIDPresentacion
		// 	});
			
		// 	console.log(newCodigodeBarrasRef.key);
		// 	$('#inputKEY').val(newCodigodeBarrasRef.key);
		// 	localStorage.setItem("KEYProducto", newCodigodeBarrasRef.key);		
		// 	alert("Se Agrego con exito");	
			
		// }

		try{		
	        db.transaction(function (tx) {	
	        	var vlsql=	"SELECT * FROM ctl_CodigosdeBarras WHERE CodigoBarras = '"+ vlCodigodeBarras +"'"
		 		//tx.executeSql("SELECT * FROM ctl_Presentaciones where idPresentacion = ? ", [vlIDPresentacion], function (tx, results) {
		 		console.log(vlsql);
		 		try{
			 		tx.executeSql(vlsql, [] , function (tx, results) {
				 		var len = results.rows.length, i;
				 		console.log( len);
				 		if (len >0) {
							vlsql =  "UPDATE ctl_CodigosdeBarras ";
							vlsql += "SET Descripcion = '" + vlNombreComercial  + "' ";
							vlsql += "   ,idClaveOficial      = '" + vlClaveOficial  + "' ";
							vlsql += "   ,idPresentacion      = '" + vlIDPresentacion  + "' ";
							vlsql += "WHERE CodigoBarras = '"+ vlCodigodeBarras +"'";
				 			console.log("update");
				 			console.log(vlsql);
							tx.executeSql(vlsql,[]);

							alert("Se Actualizo con exito");
				 		}
				 		else{
				 			console.log("insert");
							vlsql=" INSERT INTO ctl_CodigosdeBarras ( CodigoBarras , Descripcion  ,  idClaveOficial  ,idPresentacion  )";
							vlsql+="  VALUES ( '"+vlCodigodeBarras +"', '"+ vlNombreComercial +"', '"+ vlClaveOficial +"', '"+ vlIDPresentacion +"') ";
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
	

    init();
	

	$('#inputClaveOficial').typeahead({
	    source: objProductos ,
	    onselect: function(obj) { console.log(obj)  ;      
	    	console.log('Selecciono '+obj.value);
	    	 $('#inputClaveOficial').val( obj.ClaveOficial );
	    	fnBuscarProducto();
	    }
	});  
  	

	$('#inputIDPresentacion').typeahead({
	    source: objPresentaciones ,
	    onselect: function(obj) {
	    	console.dir(obj)  ;      
	    	console.log('Selecciono '+obj.IDPresentacion );
	    	 $('#inputIDPresentacion').val( obj.IDPresentacion );
	    	fnBuscarPresentacion();
	    }
	});

});


