$(document).ready(function(){

	var objProveedores ;
	fnCargarProveedores();
	var objProveedores2 =localStorage.getItem("objProveedores");	
	if (objProveedores2){
		objProveedores = JSON.parse(objProveedores2);		
		console.log (objProveedores);
	}	


    function init()
    {
        localStorage.setItem("IDProveedor", "");
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
			    localStorage.setItem("KEYProveedor", $(this).data("row-id"));
			    localStorage.setItem("RFCProveedor", $(this).data("row-id"));
			    location.href ="ListadeFacturasE.html";			        
		        
		    }).end().find(".command-delete").on("click", function(e)
		    {
		        alert("You pressed delete on row: " + $(this).data("row-id"));
		    });
		});
			
		fnLlenarDatos();	
		  
    }
    
    init();


	$('#butMenu').click( function() {	
		location.href ="menu.html";
	});	

    $("#Limpiar").on("click", function ()
    {
        $("#grid-data").bootgrid("clear");
    });


    function fnLlenarDatos1()
    {
      $("#grid-data").bootgrid("clear");
	  var vlBuscar = "";
		
	  $('#lista').hide();			
		
	  vlBuscar = $('#inputBuscar').val();      

  	  if (vlBuscar.length<3) {
  	  	  alert("Captura mas de 2 caracteres para hacer la busqueda");
	      return false;    		
  	  }
  	
	  $('#lista').show();		  	
  	
      console.log("buscando "+ vlBuscar);    	
    	

		//console.log(vlstr);
		//var obj = JSON.parse(vlstr);	
	    $("#grid-data").bootgrid("append", objProveedores);


	}



    function fnLlenarDatos()
    {
      $("#grid-data").bootgrid("clear");
	  var vlBuscar = "";
		
	  $('#lista').hide();			
		
	  vlBuscar = $('#inputBuscar').val();      

  	  // if (vlBuscar.length<1) {
  	  // 	  alert("Minimo debes escribir 1 caracter para hacer la busqueda")
	    //   return false;    		
  	  // }
  	
	  $('#lista').show();		  	
  	
      console.log("buscando "+ vlBuscar);    	
    	
    	
	//   var ListRef = appFB.database().ref('Proveedores');   
	  
	  
	// //	ListRef.once('value').then(function(snapshotList) {
	//   ListRef.orderByChild("Nombre").startAt(vlBuscar).endAt(vlBuscar +"\uf8ff").once("value", function(snapshot) {
	//   		snapshotList = snapshot.val();
	//   		console.log( JSON.stringify(snapshotList ) );
	//   		if (snapshotList ){
	  	
	// 			vlstr =" [";
	// 			snapshot.forEach(function(snapshotItem) {
	// 			    var childKey = snapshotItem.key;
	// 			    var childData = snapshotItem.val();
	// 		  		vlstr = vlstr +' {';
	// 		  		vlstr = vlstr +' 	"KEY":"'+ childKey + '", ';
	// 		  		vlstr = vlstr +' 	"RFC":"'+ childData.RFC + '", ';
	// 		  		vlstr = vlstr +' 	"Nombre":"'+ childData.Nombre + '"';
	// 		  		vlstr = vlstr +' },';	
	// 			});
	// 			vlstr = vlstr.slice(0,-1);		
	// 			vlstr = vlstr +']';
	// 			console.log(vlstr);
	// 			var obj = JSON.parse(vlstr);	
	// 	        $("#grid-data").bootgrid("append", obj);
	//       	}
	// 	});



		try{		
	        db.transaction(function (tx) {	
	        	//var vlsql=	"SELECT * FROM ctl_Presentaciones WHERE idPresentacion+ ' ' + Descripcion  LIKE  '%"+ vlBuscar +"%'"
	        	//var vlsql=	"SELECT * FROM ctl_Presentaciones WHERE idPresentacion =  '"+ vlBuscar +"'"
	        	var vlsql=	"SELECT p.* ";
	        	vlsql +=	" FROM ctl_Proveedores  p";
	        	vlsql +=	" INNER JOIN  alm_FacturasProveedor f";
	        	vlsql +=	" ON f.RFC =  p.RFC";	        		        	
	        	vlsql +=	" WHERE  p.Nombre  LIKE  '%"+ vlBuscar +"%' OR p.RFC  LIKE  '%"+ vlBuscar +"%'";
		 		console.log(vlsql);
		 		try{
			 		tx.executeSql(vlsql, [] , function (tx, results) {
				 		var len = results.rows.length, i;
				 		console.log( len);
				 		if (len >0) {
				 			vlstr =" [";

					 		for (i = 0; i < len; i++) {
				 		  		vlstr += ' {';
				 		  		vlstr += ' 	"KEY":"'+ results.rows.item(i).RFC + '", ';
				 		  		vlstr += ' 	"RFC":"'+ results.rows.item(i).RFC + '", ';
				 		  		vlstr += ' 	"Nombre":"'+ results.rows.item(i).Nombre + '"';
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
    	localStorage.setItem("KEYProveedor", "");
	    location.href ="Proveedores.html";
    });

	$('#inputBuscar').typeahead({
	    source: objProveedores ,
	    onselect: function(obj) {	    	
	    	console.dir(obj); 
	    	console.log('Selecciono '+obj.value);
	    	console.log('Selecciono '+obj.Nombre);	    	
	    	 $('#inputBuscar').val(obj.Nombre);
	    }
	});  
  	


});


