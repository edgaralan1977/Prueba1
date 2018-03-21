$(document).ready(function(){


	var objProductos ;


	fnCargarProductos();

	var objProductos2 =localStorage.getItem("objProductos");	
	if (objProductos2){			
		objProductos = JSON.parse(objProductos2);		
		console.dir (objProductos);
	}	


    function init()
    {
    	   
        var grid = $("#grid-data").bootgrid({
			rowSelect:true,
			keepSelection:true,
			navigation:2,
		    rowCount: [ 10, 50, 75,-1],						
			labels: {
		        noResults: "Sin datos",
		        infos: 'Del {{ctx.start}} al {{ctx.end}} de {{ctx.total}} '
		    },			
            formatters: {
		        "commands": function(column, row)
		        {
		            return "<button type=\"button\" class=\"btn btn-xs btn-default command-edit\" data-row-id=\"" + row.KEY + "\"><span class=\"glyphicons glyphicons-pen\">Detalle</span></button> ";
		        }
            }
        }).on("loaded.rs.jquery.bootgrid", function()
		{
		    grid.find(".command-edit").on("click", function(e)
		    {
		        console.log("You pressed edit on row: " + $(this).data("row-id"));
			    localStorage.setItem("KEYProducto", $(this).data("row-id"));
			    location.href ="Productos.html";			        
		        
		    }).end().find(".command-delete").on("click", function(e)
		    {
		        alert("You pressed delete on row: " + $(this).data("row-id"));
		    });
		});			
		  
    }
    
    init();

    $("#Limpiar").on("click", function ()
    {
        $("#grid-data").bootgrid("clear");
    });

	$('#butMenu').click( function() {	
		location.href ="menu.html";
	});	


	function fnLlenarDatos(){		
      	$("#grid-data").bootgrid("clear");
	  	var vlBuscar = "";
		
	  	$('#lista').hide();			
		
	  	vlBuscar = $('#inputBuscar').val();      

  	  	if (vlBuscar.length<1) {
  	  	  alert("Captura mas de 0 caracteres para hacer la busqueda");
	      return false;    		
  	  	}
  	
	  	$('#lista').show();		  	
  	
      	console.log("buscando "+ vlBuscar);    	
    			
		
		// var ListRef = appFB.database().ref('Productos');
				
		// //ListRef.once('value').then(function(snapshotList) {
 	// 	ListRef.orderByChild("Descripcion").startAt(vlBuscar).endAt(vlBuscar +"\uf8ff").once("value", function(snapshot) {
	 //  		snapshotList = snapshot.val();
	 //  		console.log( JSON.stringify(snapshotList ) );
	 //  		if (snapshotList ){ 			
		// 		var vlstr ;
		// 		vlstr ="[";
 			
		// 		snapshot.forEach(function(snapshotItem) {
		// 		    var childKey = snapshotItem.key;
		// 		    var childData = snapshotItem.val();
		// 	  		vlstr = vlstr +' {'	;		
		// 	  		vlstr = vlstr +'  "KEY": "'+ childKey + '",';		  		
		// 	  		vlstr = vlstr +'  "ClaveOficial" : "'+ childData.ClaveOficial + '" ,';
		// 	  		vlstr = vlstr +'  "Descripcion" : "'+ childData.Descripcion  + '" ';
		// 	  		vlstr = vlstr +'  },';
		// 		});			  				
		// 		vlstr = vlstr.slice(0,-1);		
		// 		vlstr = vlstr +']';
		// 		console.log(vlstr);
		// 		var obj = JSON.parse(vlstr);	
		//         $("#grid-data").bootgrid("append", obj);
	 //    	}	        
		// });			


		try{		
	        db.transaction(function (tx) {	
	        	//var vlsql=	"SELECT * FROM ctl_Presentaciones WHERE idPresentacion+ ' ' + Descripcion  LIKE  '%"+ vlBuscar +"%'"
	        	//var vlsql=	"SELECT * FROM ctl_Presentaciones WHERE idPresentacion =  '"+ vlBuscar +"'"
	        	var vlsql=	"SELECT * FROM ctl_Productos WHERE  Descripcion  LIKE  '%"+ vlBuscar +"%' OR idClaveOficial  LIKE  '%"+ vlBuscar +"%'"
		 		console.log(vlsql);
		 		try{
			 		tx.executeSql(vlsql, [] , function (tx, results) {
				 		var len = results.rows.length, i;
				 		console.log( len);
				 		if (len >0) {
				 			vlstr =" [";
				 			console.log("Productos  no encontrados");
					 		for (i = 0; i < len; i++) {
				 		  		vlstr += ' {';
				 		  		vlstr += ' 	"KEY":"'+ results.rows.item(i).idClaveOficial + '", ';
				 		  		vlstr += ' 	"ClaveOficial":"'+ results.rows.item(i).idClaveOficial + '", ';
				 		  		vlstr += ' 	"Descripcion":"'+ results.rows.item(i).Descripcion + '"';
				 		  		vlstr += ' },';						  		
					 		}
							vlstr = vlstr.slice(0,-1);		
							vlstr = vlstr +']';	
					 		console.log(vlstr);		
					 		var obj = JSON.parse(vlstr);						
					 		document.getElementById('lista').style.display = "block"; 				
					         $("#grid-data").bootgrid("append", obj);							        

				 		}
				 		else{
				 			console.log("Productos no encontrados ");
				 		}
					});	
				} catch(e) {
					alert(" 1 Error processing SQL: "+ e.message);
					return;
				}
			});							
		} catch(e) {
			alert("2 Error processing SQL: "+ e.message);
			return;
		}

	}

	$('#butListarProductos').click (function() {
		fnLlenarDatos();
	});	

    $("#butNuevo").on("click", function ()
    {
	    localStorage.setItem("KEYProducto", "");
	    location.href ="Productos.html";	
    });


	$('#inputBuscar').typeahead({
	    source: objProductos ,
	    onselect: function(obj) { console.log(obj)  ;      
	    	console.log('Selecciono : '+obj.Descripcion);
	    	 $('#inputBuscar').val( obj.Descripcion );

	    }
	});  


});


