$(document).ready(function(){
	var vlIDEntrada =localStorage.getItem("KEYEntrada");	
	console.log(vlIDEntrada);
	var vlIDFE ;

	$('#butMenu').click( function() {	
		location.href ="menu.html";
	});	
	
	$('#butFactura').click( function() {	
		location.href ="FacturaE.html";
	});		

    $("#Limpiar").click( function () {
         $("#grid-data").bootgrid("clear");
	});
	 
	 


    function fnLlenarDatos()
    {
      $("#grid-data").bootgrid("clear");    	      				
		var vlstr ="";		
	

		if   ( vlIDFE !=="" ) {			
	  		$('#lista').show();	

			try{
		        db.transaction(function (tx) {	

					vlsql =	"";
		        	vlsql += " SELECT id, idFacturaProveedor ,idFacturaProveedordet_fe ,Descripcion ,Unidad ";
         			vlsql +=  "   ,ClaveUnidad ,Cantidad ,ClaveProdServ ,Importe ,ValorUnitario ,NoIdentificacion , cVerificado ";
		        	vlsql += " FROM alm_FacturasProveedorDet_FacturaElectronia ";
		        	vlsql += " WHERE  idFacturaProveedor   = '"+ vlIDFE +"'";
			 		console.log(vlsql);
			 		try{
				 		tx.executeSql(vlsql, [] , function (tx, results) {
					 		var len = results.rows.length, i;
					 		console.log( len);
					 		if (len >0) {
					 			console.log (results.rows.item(i));
					 			vlstr =" [";

						 		for (i = 0; i < len; i++) {
					 		  		vlstr += ' {';
					 		  		vlstr += ' 	"KEY":"'+ results.rows.item(i).id + '", ';				 		  		
					 		  		vlstr += ' 	"idFacturaProveedor":"'+ results.rows.item(i).idFacturaProveedor + '", ';					 		  		
					 		  		vlstr += ' 	"idFacturaProveedordet_fe":"'+ results.rows.item(i).idFacturaProveedordet_fe + '", ';
						 	  		vlstr += ' 	"Descripcion":"'+ results.rows.item(i).Descripcion + '",';
						 	  		vlstr += ' 	"Unidad":"'+ results.rows.item(i).Unidad + '",';
									vlstr += ' 	"ClaveUnidad":"'+ results.rows.item(i).ClaveUnidad + '",';						 	  							 	  		
									vlstr += ' 	"Cantidad":"'+ results.rows.item(i).Cantidad + '",';
									vlstr += ' 	"ClaveProdServ":"'+ results.rows.item(i).ClaveProdServ + '",';
									vlstr += ' 	"Importe":"'+ results.rows.item(i).Importe + '",';
									vlstr += ' 	"ValorUnitario":"'+ results.rows.item(i).ValorUnitario + '",';
									vlstr += ' 	"NoIdentificacion":"'+ results.rows.item(i).NoIdentificacion + '",';
						 			vlstr += ' 	"cVerificado":"'+ results.rows.item(i).cVerificado + '"';		  				  		
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
		        	vlsql += " WHERE  A.id   =  "+ vlIDEntrada +"";
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
								 console.log(vlIDFE);
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
			selection: true,
    		multiSelect: true,		    
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
            },
            rowCount: [-1, 10, 50, 75]
        }).on("loaded.rs.jquery.bootgrid", function()
		{
		    grid.find(".command-edit").on("click", function(e)
		    {
		        console.log("You pressed edit on row: " + $(this).data("row-id"));
			    localStorage.setItem("idEntradaDetalleFE", $(this).data("row-id"));
			    location.href ="FacturaEDetFE.html";
		        
		    }).end().find(".command-delete").on("click", function(e)
		    {
		        alert("You pressed delete on row: " + $(this).data("row-id"));
		    });
		});
    }

    init();
});