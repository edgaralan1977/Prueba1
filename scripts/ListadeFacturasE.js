$(document).ready(function(){


	var objProveedores ;
	fnCargarProveedores();
	var objProveedores2 =localStorage.getItem("objProveedores");	
	if (objProveedores2){
		objProveedores = JSON.parse(objProveedores2);		
		console.log (objProveedores);
	}	

    var vlKEYRFCProveedor = localStorage.getItem("RFCProveedor");	
    $('#inputBuscar').val(vlKEYRFCProveedor);

    function init()
    {
    	//VASJ590823GD3
    	

        localStorage.setItem("KEYEntrada", "");
        var grid = $("#grid-data").bootgrid({
			rowSelect:true,
			keepSelection:true,
			navigation:1,
		    rowCount: [ 10, 50, 75,-1],			
			labels: {
		        noResults: "Sin datos",
		        infos: 'Del {{ctx.start}} al {{ctx.end}} de {{ctx.total}} ',
		        search : 'Buscar',
		        all : 'Todos'		        
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
			    localStorage.setItem("KEYEntrada", $(this).data("row-id"));
			    location.href ="ListadeFacturasEDetFE.html";
		        
		    }).end().find(".command-delete").on("click", function(e)
		    {
		        alert("You pressed delete on row: " + $(this).data("row-id"));
		    });
		});	

		fnLlenarDatos()	  
    }
    
    init();


	$('#butMenu').click( function() {	
		location.href ="menu.html";
	});	

    $("#Limpiar").on("click", function ()
    {
        $("#grid-data").bootgrid("clear");
    });


    function fnLlenarDatos()
    {
      $("#grid-data").bootgrid("clear");
	  var vlBuscar = "";
		
	  $('#lista').hide();			
		
	  vlBuscar = $('#inputBuscar').val();      

  	  if (vlBuscar.length < 1) {
  	  	  alert("Captura al menos 1 caracteres para hacer la busqueda");
	      return false;    		
  	  }
  	
	  $('#lista').show();		  	
  	
      console.log("buscando "+ vlBuscar);    	
    	
	 //  var ListRef = appFB.database().ref('Entradas');    	
	 //  ListRef.orderByChild("Proveedor").startAt(vlBuscar).endAt(vlBuscar +"\uf8ff").once("value", function(snapshot) {
	 //  		snapshotList = snapshot.val();
	 //  		if (snapshotList ){
	 //  			console.log( JSON.stringify(snapshotList ) );	  			
		// 		vlstr =" [";
		// 		snapshot.forEach(function(snapshotItem) {
		// 		    var childKey = snapshotItem.key;
		// 		    var childData = snapshotItem.val();
		// 	  		vlstr = vlstr +' {';
		// 	  		vlstr = vlstr +' 	"KEY":"'+ childKey + '", ';		  		
		// 	  		vlstr = vlstr +' 	"Proveedor":"'+ childData.Proveedor + '", ';
		// 	  		vlstr = vlstr +' 	"Fecha":"'+ childData.Fecha + '", ';			  		
		// 	  		vlstr = vlstr +' 	"FacturaProveedor":"'+ childData.FacturaProveedor + '"';
		// 	  		vlstr = vlstr +' },';	
		// 		});
		// 		vlstr = vlstr.slice(0,-1);		
		// 		vlstr = vlstr +']';
		// 		console.log(vlstr);
		// 		var obj = JSON.parse(vlstr);	
		//         $("#grid-data").bootgrid("append", obj);
		
		// 	}		
		// });

		try{		
	        db.transaction(function (tx) {	
	        	//var vlsql=	"SELECT * FROM ctl_Presentaciones WHERE idPresentacion+ ' ' + Descripcion  LIKE  '%"+ vlBuscar +"%'"
	        	//var vlsql=	"SELECT * FROM ctl_Presentaciones WHERE idPresentacion =  '"+ vlBuscar +"'"
	        	var vlsql=	"SELECT A.* FROM alm_FacturasProveedor A  ";
	        	vlsql += " INNER JOIN  ctl_Proveedores P ON A.RFC = P.RFC ";	        	
	        	vlsql += " WHERE  P.Nombre   LIKE  '%"+ vlBuscar +"%' OR P.RFC  LIKE  '%"+ vlBuscar +"%'";
		 		console.log(vlsql);
		 		try{
			 		tx.executeSql(vlsql, [] , function (tx, results) {
				 		var len = results.rows.length, i;
				 		console.log( len);
				 		if (len >0) {
				 			vlstr =" [";

					 		for (i = 0; i < len; i++) {
				 		  		vlstr += ' {';
				 		  		vlstr += ' 	"KEY":"'+ results.rows.item(i).id + '", ';
				 		  		vlstr += ' 	"Proveedor":"'+ results.rows.item(i).RFC + '", ';
					 	  		vlstr += ' 	"Fecha":"'+ results.rows.item(i).fecha + '",';
					 			vlstr += ' 	"Folio":"'+ results.rows.item(i).Folio + '"';		  				  		
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
				 			console.log("Proveedores no encontrados ");
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


	$('#butListar').click (function() {
		fnLlenarDatos();
	 });


    $("#butEditar").on("click", function ()
    {
       fn_editar();
    });

    $("#butNuevo").on("click", function ()
    {
	    location.href ="FacturaE.html";
    });





	$('#inputBuscar').typeahead({
	    source: objProveedores ,
	    onselect: function(obj) {	    	
	    	console.log(obj)  ;      	    	
	    	console.log('Selecciono '+obj.value);
	    	 $('#inputBuscar').val( obj.RFC );
	    }
	});  
  	


});

