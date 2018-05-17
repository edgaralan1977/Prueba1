$(document).ready(function(){
	var vlIDEntrada =localStorage.getItem("KEYEntrada");	
	console.log(vlIDEntrada);

	$('#butMenu').click( function() {	
		location.href ="menu.html";
	});	
	
	$('#butFactura').click( function() {	
		location.href ="FacturaEDetADD.html";
	});

    $("#Limpiar").click( function () {
    	$("#grid-data").bootgrid("clear");
	});

    function fnLlenarDatos()
    {
      $("#grid-data").bootgrid("clear");    	      				
		var vlstr ="";		
		

		if   ( vlIDEntrada !=="" ) {			
	  		$('#lista').show();	

			try{
		        db.transaction(function (tx) {	

					vlsql =	"";
		        	vlsql += " SELECT id,idFacturaProveedor, idFacturasProveedorDet_ADDENDA, Lote, ";
		        	vlsql += " FechaCaducidad, FechaCaducidad, Cantidad,  codigo_barras,";
		        	vlsql += " precio  , ClaveOficialSSA , ClavePresentacionSSA  ,cVerificado, IFNULL(Observaciones,'') Observaciones ";
		        	vlsql += " FROM alm_FacturasProveedorDet_ADDENDA ";
		        	vlsql += " WHERE  idFacturaProveedor = '"+ vlIDEntrada +"';";
			 		console.log(vlsql);
			 		try{
				 		tx.executeSql(vlsql, [] , function (tx, results) {
					 		var len = results.rows.length, i;
					 		console.log( len);
					 		if (len >0) {
					 			vlstr =" [";

						 		for (i = 0; i < len; i++) {
					 		  		vlstr += ' {';
					 		  		vlstr += ' 	"KEY":"'+ results.rows.item(i).idFacturasProveedorDet_ADDENDA + '", ';
					 		  		vlstr += ' 	"IdFacturaProveedor":"'+ results.rows.item(i).idFacturaProveedor + '", ';
					 		  		vlstr += ' 	"IdFacturasProveedorDet_ADDENDA":"'+ results.rows.item(i).idFacturasProveedorDet_ADDENDA + '", ';
						 	  		vlstr += ' 	"Lote":"'+ results.rows.item(i).Lote + '",';
						 	  		vlstr += ' 	"FechaCaducidad":"'+ results.rows.item(i).FechaCaducidad + '",';
									vlstr += ' 	"Cantidad":"'+ results.rows.item(i).Cantidad + '",';						 	  							 	  		
									vlstr += ' 	"Codigo_barras":"'+ results.rows.item(i).codigo_barras + '",';
									vlstr += ' 	"Precio":"'+ results.rows.item(i).precio + '",';
									vlstr += ' 	"ClaveOficialSSA":"'+ results.rows.item(i).ClaveOficialSSA + '",';
									vlstr += ' 	"ClavePresentacionSSA":"'+ results.rows.item(i).ClavePresentacionSSA + '",';
									vlstr += ' 	"CVerificado":"'+ results.rows.item(i).cVerificado + '",';
									vlstr += ' 	"Observaciones":"'+ results.rows.item(i).Observaciones + '"';
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
		        	vlsql += " FROM alm_FacturasProveedor A  ";        	
		        	vlsql += " INNER JOIN ctl_Proveedores P ON P.RFC  = A.RFC ";        	
		        	vlsql += " WHERE  A.idFacturaProveedor   =  '"+ vlIDEntrada +"'";
			 		console.log(vlsql);
			 		try{
				 			tx.executeSql(vlsql, [] , function (tx, results) {
					 		var len = results.rows.length, i;
					 		console.log( len);
					 		if (len >0) {				    			
								 $('#inputProveedor').val(results.rows.item(i).RFC);
								 $('#inputFactura').val(results.rows.item(i).Folio);
								 $('#DescripcionProveedor').val(results.rows.item(i).NombreProvedor);	
								 vlIDFE = 	 results.rows.item(i).idFacturaProveedor ;
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
		            return "<button type=\"button\" class=\"btn btn-xs btn-default command-edit\" data-row-id=\"" + row.KEY + "\"><span class=\"glyphicons glyphicons-pen\">Detalle</span></button> " +
		            "<button type=\"button\" class=\"btn btn-xs btn-default command-verificado\" data-row-id=\"" + row.KEY + "\"><span class=\"glyphicons glyphicons-pen\">Verificado</span></button> "+ 
		            "<button type=\"button\" class=\"btn btn-xs btn-default command-Diferencia\" data-row-id=\"" + row.KEY + "\"><span class=\"glyphicons glyphicons-pen\">Diferencia</span></button> ";
		        }
            },
            rowCount: [-1, 10, 50, 75]
        }).on("loaded.rs.jquery.bootgrid", function()
		{
		    grid.find(".command-edit").on("click", function(e)
		    {
		        console.log("You pressed edit on row: " + $(this).data("row-id"));
			    localStorage.setItem("idEntradaDetalleADD", $(this).data("row-id"));
			    location.href ="FacturaEDetADD.html";			        
		        
		    }).end().find(".command-verificado").on("click", function(e)
		    {
		    	console.log("verificado");
		    	console.log($(this).data("row-id"));
			    var vlsql =  "UPDATE alm_FacturasProveedorDet_ADDENDA ";
			    vlsql += "SET cVerificado = 'V' ";						
			    vlsql += "WHERE idFacturasProveedorDet_ADDENDA = '"+ $(this).data("row-id") +"';";			       	
			    console.log(vlsql);		    	
				try{		
			      db.transaction(function (tx) {
			       try{	
				    tx.executeSql(vlsql,[]);
					} catch(e) {
					 alert("Error processing SQL: "+ e.message);					
					}
				   });							
			    } catch(e) {
				   alert("Error processing SQL: "+ e.message);
			    }
 				fnLlenarDatos();
		    }).end().find(".command-Diferencia").on("click", function(e)
		    {
		    	console.log("verificado");
		    	console.log($(this).data("row-id"));
			    var vlsql =  "UPDATE alm_FacturasProveedorDet_ADDENDA ";
			    vlsql += "SET cVerificado = 'D' ";						
			    vlsql += "WHERE idFacturasProveedorDet_ADDENDA = '"+ $(this).data("row-id") +"';";			       	
			    console.log(vlsql);		    	
				try{		
			      db.transaction(function (tx) {
			       try{	
				    tx.executeSql(vlsql,[]);
					} catch(e) {
					 alert("Error processing SQL: "+ e.message);					
					}
				   });							
			    } catch(e) {
				   alert("Error processing SQL: "+ e.message);
			    }
 				fnLlenarDatos();
		    });
		}).on("loaded.rs.jquery.bootgrid", function (e, c, rows) {
		    console.log("Grid is loaded.");
		    $(this).bootgrid("select", [1]);
		});    

		$("#grid-data").bootgrid("select", [1]);		
    }


    init();

	app.isLoading =true;
	if (app.isLoading) {
	      app.spinner.setAttribute('hidden', true);  
	      app.container.removeAttribute('hidden');   
	      app.isLoading = false;
	    }

    
});