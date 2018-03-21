$(document).ready(function(){
	var vlIDEntrada =localStorage.getItem("KEYEntrada");	
	console.log(vlIDEntrada);

	$('#butMenu').click( function() {	
		location.href ="menu.html";
	});	
	
	$('#butFactura').click( function() {	
		location.href ="FacturaProveedor.html";
	});		

    $("#Limpiar").click( function () {
         $("#grid-data").bootgrid("clear");
	});
	 
	 
    $("#butNuevo").on("click", function ()
    {
    	localStorage.setItem("idEntradaDetalle", "");
	    location.href ="FacturaProveedorDetalle.html";
    });


    function fnLlenarDatos()
    {
      $("#grid-data").bootgrid("clear");    	      				
		var vlstr ="";		
		var vlIDEntrada1 =localStorage.getItem("KEYEntrada");		

		if   ( vlIDEntrada1 !=="" ) {			
	  		$('#lista').show();	

			try{
		        db.transaction(function (tx) {	

					vlsql =	"";
		        	vlsql += " SELECT id,ClaveOficialProducto, IdPresentacion, Codigo_Barras, ";
		        	vlsql += " Lote, FechaCaducidad, Cantidad, Costo , Cantidad * Costo SubTotal,";
		        	vlsql += " IVA AS Iva  , ( Cantidad * Costo) +IVA  Total ";
		        	vlsql += " FROM ALM_MovimientoDet ";
		        	vlsql += " WHERE  idmovimiento   = "+ vlIDEntrada1 +"";
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
					 		  		vlstr += ' 	"idEntradaDetalle":"'+ results.rows.item(i).id + '", ';					 		  		
					 		  		vlstr += ' 	"ClaveOficial":"'+ results.rows.item(i).ClaveOficialProducto + '", ';
						 	  		vlstr += ' 	"Presentacion":"'+ results.rows.item(i).IdPresentacion + '",';
						 	  		vlstr += ' 	"Lote":"'+ results.rows.item(i).Lote + '",';
									vlstr += ' 	"FechaCaducidad":"'+ results.rows.item(i).FechaCaducidad + '",';						 	  							 	  		
									vlstr += ' 	"Cantidad":"'+ results.rows.item(i).Cantidad + '",';
									vlstr += ' 	"Costo":"'+ results.rows.item(i).Costo + '",';
									vlstr += ' 	"SubTotal":"'+ results.rows.item(i).SubTotal + '",';
									vlstr += ' 	"Iva":"'+ results.rows.item(i).IVA + '",';
									vlstr += ' 	"Total":"'+ results.rows.item(i).Total + '",';
						 			vlstr += ' 	"CodigoBarra":"'+ results.rows.item(i).codigo_barras + '"';		  				  		
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
					 			console.log("No encontrados ");
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
 	}
		
	$('#butListar').click (function() {
		fnLlenarDatos();
	 });
	
	
	function init(){
		if (vlIDEntrada){		

			try{		
		        db.transaction(function (tx) {	
		        	var vlsql=	"SELECT A.*,";
		        	vlsql += " IFNULL(P.Nombre,'') || ' ' || IFNULL(P.ApellidoPaterno,' ') || ' ' || IFNULL(P.ApellidoMaterno,' ')  AS NombreProvedor";
		        	vlsql += " FROM ALM_Movimiento A  ";        	
		        	vlsql += " INNER JOIN ctl_Proveedores P ON P.RFC  = A.RFCProveedor ";        	
		        	vlsql += " WHERE  A.id   =  "+ vlIDEntrada +"";
			 		console.log(vlsql);
			 		try{
				 			tx.executeSql(vlsql, [] , function (tx, results) {
					 		var len = results.rows.length, i;
					 		console.log( len);
					 		if (len >0) {

				    			
								 $('#inputProveedor').val(results.rows.item(i).RFCProveedor);
								 $('#inputFactura').val(results.rows.item(i).FolioMovimiento);
								 $('#DescripcionProveedor').val(results.rows.item(i).NombreProvedor);	
								 fnLlenarDatos();

								//fn_BuscarProveedor (results.rows.item(i).RFCProveedor);

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
    	
        var grid = $("#grid-data").bootgrid({
			rowSelect:true,
			keepSelection:true,
			navigation:1,
		    rowCount: [ 10, 50, 75,-1],			
			labels: {
		        noResults: "Sin datos",
		        infos: 'Del {{ctx.start}} al {{ctx.end}} de {{ctx.total}} '
		    },			
            formatters: {
		        "commands": function(column, row)
		        {
		            return "<button type=\"button\" class=\"btn btn-xs btn-default command-edit\" data-row-id=\"" + row.idEntradaDetalle + "\"><span class=\"glyphicons glyphicons-pen\">Detalle</span></button> ";
		        }
            },
            rowCount: [-1, 10, 50, 75]
        }).on("loaded.rs.jquery.bootgrid", function()
		{
		    grid.find(".command-edit").on("click", function(e)
		    {
		        console.log("You pressed edit on row: " + $(this).data("row-id"));
			    localStorage.setItem("idEntradaDetalle", $(this).data("row-id"));
			    location.href ="FacturaProveedorDetalle.html";			        
		        
		    }).end().find(".command-delete").on("click", function(e)
		    {
		        alert("You pressed delete on row: " + $(this).data("row-id"));
		    });
		});
    }

    init();
});