$(document).ready(function(){



    function init()
    {
    	
        localStorage.setItem("KEYCodigodeBarras", "");
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
			    localStorage.setItem("KEYCodigodeBarras", $(this).data("row-id"));
			    location.href ="CodigosdeBarras.html";			        
		        
		    }).end().find(".command-delete").on("click", function(e)
		    {
		        alert("You pressed delete on row: " + $(this).data("row-id"));
		    });
		});
			
			
		        
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

  	  if (vlBuscar.length<1) {
  	  	  alert("Captura mas de 0 caracteres para hacer la busqueda");  	  	
	      return false;    		
  	  }
  	
	  $('#lista').show();		  	
  	
      console.log("buscando "+ vlBuscar);    	
    	
	 //  var ListRef = appFB.database().ref('CodigosdeBarras');    	
		// ListRef.once('value').then(function(snapshotList) {

		// 		vlstr =" [";
		// 		snapshotList.forEach(function(snapshotItem) {
		// 		    var childKey = snapshotItem.key;
		// 		    var childData = snapshotItem.val();
		// 	  		vlstr = vlstr +' {';
		// 	  		vlstr = vlstr +' 	"KEY":"'+ childKey + '", ';
		// 	  		vlstr = vlstr +' 	"CodigodeBarras":"'+ childData.IDPresentacion + '", ';
		// 	  		vlstr = vlstr +' 	"NombreComercial":"'+ childData.Descripcion + '",';
		// 			vlstr = vlstr +' 	"ClaveOficial":"'+ childData.Descripcion + '",';		  				  		
		// 	  		vlstr = vlstr +' 	"IDPresentacion":"'+ childData.Descripcion + '"';
		// 	  		vlstr = vlstr +' },'; 
		// 		});
		// 		if (vlstr.length>1){
		// 			vlstr = vlstr.slice(0,-1);		
		// 			vlstr = vlstr +']';
		// 			console.log(vlstr);
		// 			var obj = JSON.parse(vlstr);	
		// 	        $("#grid-data").bootgrid("append", obj);
		//         }
		        
		        
		// });


		try{		
	        db.transaction(function (tx) {	
	        	//var vlsql=	"SELECT * FROM ctl_Presentaciones WHERE idPresentacion+ ' ' + Descripcion  LIKE  '%"+ vlBuscar +"%'"
	        	//var vlsql=	"SELECT * FROM ctl_Presentaciones WHERE idPresentacion =  '"+ vlBuscar +"'"
	        	var vlsql=	"SELECT * FROM ctl_CodigosdeBarras WHERE  Descripcion  LIKE  '%"+ vlBuscar +"%' OR CodigoBarras  LIKE  '%"+ vlBuscar +"%'"
		 		console.log(vlsql);
		 		try{
			 		tx.executeSql(vlsql, [] , function (tx, results) {
				 		var len = results.rows.length, i;
				 		console.log( len);
				 		if (len >0) {
				 			vlstr =" [";

					 		for (i = 0; i < len; i++) {
				 		  		vlstr += ' {';
				 		  		vlstr += ' 	"KEY":"'+ results.rows.item(i).CodigoBarras + '", ';
				 		  		vlstr += ' 	"CodigodeBarras":"'+ results.rows.item(i).CodigoBarras + '", ';
					 	  		vlstr = vlstr +' 	"NombreComercial":"'+ results.rows.item(i).Descripcion + '",';
					 			vlstr = vlstr +' 	"ClaveOficial":"'+ results.rows.item(i).idClaveOficial + '",';		  				  		
					 	  		vlstr = vlstr +' 	"IDPresentacion":"'+ results.rows.item(i).idPresentacion + '"';
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


    $("#butNuevo").on("click", function ()
    {
    	localStorage.setItem("KEYCodigodeBarras", "");
	    location.href ="CodigosdeBarras.html";
    });


	app.isLoading =true;
	if (app.isLoading) {
	      app.spinner.setAttribute('hidden', true);  
	      app.container.removeAttribute('hidden');   
	      app.isLoading = false;
	    }


});




