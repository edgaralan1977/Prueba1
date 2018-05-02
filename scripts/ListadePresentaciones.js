$(document).ready(function(){

	var objPresentaciones ;

	fnCargarPresentaciones();

	var objPresentaciones2 =localStorage.getItem("objPresentaciones");	
	if (objPresentaciones2){
		objPresentaciones = JSON.parse(objPresentaciones2);		
		console.log (objPresentaciones);
	}		

    function init()
    {    	
        localStorage.setItem("KEYPresentacion", "");
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
		            return "<button type=\"button\" class=\"btn btn-xs btn-default command-edit\" data-row-id=\"" + row.KEY + "\"><span class=\"glyphicons glyphicons-pen\">Detalle</span></button> ";
		        }
            }
        }).on("loaded.rs.jquery.bootgrid", function()
		{
		    grid.find(".command-edit").on("click", function(e)
		    {
		        console.log("You pressed edit on row: " + $(this).data("row-id"));
			    localStorage.setItem("KEYPresentacion", $(this).data("row-id"));
			    location.href ="Presentaciones.html";			        
		        
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

	 //  var ListRef = appFB.database().ref('Presentaciones');
	  
	 //  ListRef.orderByChild("Descripcion").startAt(vlBuscar).endAt(vlBuscar +"\uf8ff").once("value", function(snapshot) {

	 //  		snapshotList = snapshot.val();
	 //  		console.log( JSON.stringify(snapshotList ) );
	 //  		if (snapshotList ){

	 //  			vlstr =" [";
		// 		snapshot.forEach(function(snapshotItem ) {
		// 		    var childKey = snapshotItem.key;
		// 		    console.log(childKey);					    
		// 		   	var childData = snapshotItem.val();
		// 		   	console.log(" MAS DE 1");
		// 		   	if (childData){
		// 		  		vlstr = vlstr +' {';
		// 		  		vlstr = vlstr +' 	"KEY":"'+ childKey + '", ';
		// 		  		vlstr = vlstr +' 	"IDPresentacion":"'+ childData.IDPresentacion + '", ';
		// 		  		vlstr = vlstr +' 	"Descripcion":"'+ childData.Descripcion + '"';
		// 		  		vlstr = vlstr +' },';	
		// 		   	}

		// 		});			  
		// 		vlstr = vlstr.slice(0,-1);		
		// 		vlstr = vlstr +']';		
		// 		console.log(vlstr);		
		// 		var obj = JSON.parse(vlstr);						
		// 		document.getElementById('lista').style.display = "block"; 				
		//         $("#grid-data").bootgrid("append", obj);							        
		// 	}
		// });

		try{		
	        db.transaction(function (tx) {	
	        	//var vlsql=	"SELECT * FROM ctl_Presentaciones WHERE idPresentacion+ ' ' + Descripcion  LIKE  '%"+ vlBuscar +"%'"
	        	//var vlsql=	"SELECT * FROM ctl_Presentaciones WHERE idPresentacion =  '"+ vlBuscar +"'"
	        	var vlsql=	"SELECT * FROM ctl_Presentaciones WHERE  Descripcion  LIKE  '%"+ vlBuscar +"%' OR idPresentacion  LIKE  '%"+ vlBuscar +"%'"
		 		console.log(vlsql);
		 		try{
			 		tx.executeSql(vlsql, [] , function (tx, results) {
				 		var len = results.rows.length, i;
				 		console.log( len);
				 		if (len >0) {
				 			vlstr =" [";
				 			console.log("Presentaciones encontrada");
					 		for (i = 0; i < len; i++) {
				 		  		vlstr += ' {';
				 		  		vlstr += ' 	"KEY":"'+ results.rows.item(i).idPresentacion + '", ';
				 		  		vlstr += ' 	"IDPresentacion":"'+ results.rows.item(i).idPresentacion + '", ';
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
				 			console.log("Presentaciones no encontradas ");
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
    	localStorage.setItem("KEYPresentacion", "");
	    location.href ="Presentaciones.html";
    });

	$('#inputBuscar').typeahead({
	    source: objPresentaciones ,
	    onselect: function(obj) {
	    	console.dir(obj)  ;      
	    	console.log('Selecciono '+obj.Descripcion);
	    	 $('#inputBuscar').val( obj.Descripcion  );

	    }
	});


	app.isLoading =true;
	if (app.isLoading) {
	      app.spinner.setAttribute('hidden', true);  
	      app.container.removeAttribute('hidden');   
	      app.isLoading = false;
	    }


});




