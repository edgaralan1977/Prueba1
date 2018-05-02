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
		

		if   ( vlIDFE !=="" ) {			
	  		$('#lista').show();	

			try{
		        db.transaction(function (tx) {	

					vlsql =	"";
		        	vlsql += " SELECT id,idFacturaProveedor, idFacturasProveedorDet_ADDENDA, Lote, ";
		        	vlsql += " FechaCaducidad, FechaCaducidad, Cantidad,  codigo_barras,";
		        	vlsql += " precio  , ClaveOficialSSA , ClavePresentacionSSA  ,cVerificado ";
		        	vlsql += " FROM alm_FacturasProveedorDet_ADDENDA ";
		        	vlsql += " WHERE  idFacturaProveedor   = '"+ vlIDFE +"'";
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
					 		  		vlstr += ' 	"IdFacturaProveedor":"'+ results.rows.item(i).idFacturaProveedor + '", ';					 		  		
					 		  		vlstr += ' 	"IdFacturasProveedorDet_ADDENDA":"'+ results.rows.item(i).idFacturasProveedorDet_ADDENDA + '", ';
						 	  		vlstr += ' 	"Lote":"'+ results.rows.item(i).Lote + '",';
						 	  		vlstr += ' 	"FechaCaducidad":"'+ results.rows.item(i).FechaCaducidad + '",';
									vlstr += ' 	"Cantidad":"'+ results.rows.item(i).Cantidad + '",';						 	  							 	  		
									vlstr += ' 	"Codigo_barras":"'+ results.rows.item(i).codigo_barras + '",';
									vlstr += ' 	"Precio":"'+ results.rows.item(i).precio + '",';
									vlstr += ' 	"ClaveOficialSSA":"'+ results.rows.item(i).ClaveOficialSSA + '",';
									vlstr += ' 	"ClavePresentacionSSA":"'+ results.rows.item(i).ClavePresentacionSSA + '",';
									vlstr += ' 	"CVerificado":"'+ results.rows.item(i).cVerificado + '"';	  				  		
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
	
	
	$.fn.bootgrid.Constructor.prototype.select = function (rowIds) {
	    console.log("Grid.prototype.select");
	    console.dir(rowIds);

	    var _this = this;
	    $.each(rowIds, function () {
	        _this.element.find("[data-row-id='" + this + "']").addClass("active");
	    });

	    return this;
	};

	$.fn.bootgrid.Constructor.prototype.deselect = function (rowIds) {
	    console.log("Grid.prototype.deselect");
	    console.dir(rowIds);

	    var _this = this;
	    $.each(rowIds, function () {
	        _this.element.find("[data-row-id='" + this + "']").removeClass("active");
	    });

	    return this;
	};



	$("#select-btn").click(function () {
	    $("#grid-data").bootgrid("select", [1]);
	});

	$("#unselect-btn").click(function () {
	    $("#grid-data").bootgrid("deselect", [1]);
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
			    localStorage.setItem("idEntradaDetalleADD", $(this).data("row-id"));
			    location.href ="FacturaEDetADD.html";			        
		        
		    }).end().find(".command-delete").on("click", function(e)
		    {
		        alert("You pressed delete on row: " + $(this).data("row-id"));
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