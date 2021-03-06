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
        localStorage.setItem("KEYEntrada", "");
        var grid = $("#grid-data").bootgrid({
			rowSelect:true,
			keepSelection:true,
			navigation:2,
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
		            return "<button type=\"button\" class=\"btn btn-xs btn-default command-editDETFE\" data-row-id=\"" + row.KEY + "\"><span class=\"glyphicons glyphicons-pen\">Detalle FE</span></button> "+ 
		            	   "<button type=\"button\" class=\"btn btn-xs btn-default command-editADD\" data-row-id=\"" + row.KEY + "\"><span class=\"glyphicons glyphicons-pen\">Detalle ADD</span></button> "+
		            	   "<button type=\"button\" class=\"btn btn-xs btn-default command-editEncabezado\" data-row-id=\"" + row.KEY + "\"><span class=\"glyphicons glyphicons-pen\">Encabezado</span></button>";
		        }
            }
        }).on("loaded.rs.jquery.bootgrid", function()
		{
		    grid.find(".command-editDETFE").on("click", function(e)
		    {
		        console.log("You pressed edit on row: " + $(this).data("row-id"));
			    localStorage.setItem("KEYEntrada", $(this).data("row-id"));
			    location.href ="ListadeFacturasEDetFE.html";
		        
		    }).end().find(".command-editEncabezado").on("click", function(e)
		    {
		        console.log("You pressed edit Encabezado on row: " + $(this).data("row-id"));
			    localStorage.setItem("KEYEntrada", $(this).data("row-id"));
			    location.href ="FacturaE.html";
		    }).end().find(".command-editADD").on("click", function(e)
		    {
		        console.log("You pressed edit Encabezado on row: " + $(this).data("row-id"));
			    localStorage.setItem("KEYEntrada", $(this).data("row-id"));
			    location.href ="ListadeFacturasEDetADD.html";
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

  	  //if (vlBuscar.length < 1) {
  	  //  alert("Captura al menos 1 caracteres para hacer la busqueda");
	  //    return false;    		
  	  //}
  	
	  $('#lista').show();		  	
  	
      console.log("buscando "+ vlBuscar);    	
		try{		
	        db.transaction(function (tx) {	
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
				 		  		vlstr += ' 	"KEY":"'+ results.rows.item(i).idFacturaProveedor + '", ';
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
				 			console.log("Facturas no encontradas ");
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
  	

	app.isLoading =true;
	if (app.isLoading) {
	      app.spinner.setAttribute('hidden', true);  
	      app.container.removeAttribute('hidden');   
	      app.isLoading = false;
	    }


});


