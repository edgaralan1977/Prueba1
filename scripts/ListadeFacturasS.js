$(document).ready(function(){


    function getHeaders() {
        //btoa is a built in browser cmd for encode Base64
        return { 'Authorization': "Basic " + btoa("test:testpw") };
    }

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
		            return "<button type=\"button\" class=\"btn btn-xs btn-default command-edit\" data-row-id=\"" + row.KEY + "\"><span class=\"glyphicons glyphicons-pen\">Detalle</span></button> ";
		        }
            }
        }).on("loaded.rs.jquery.bootgrid", function()
		{
		    grid.find(".command-edit").on("click", function(e)
		    {
		        console.log("You pressed edit on row: " + $(this).data("row-id"));
			    // localStorage.setItem("KEYEntrada", $(this).data("row-id"));
			    // location.href ="ListadeFacturasEDetFE.html";
		        
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

  	  //if (vlBuscar.length < 1) {
  	  //  alert("Captura al menos 1 caracteres para hacer la busqueda");
	  //    return false;    		
  	  //}
  	
	  $('#lista').show();		  	
  	
      console.log("buscando "+ vlBuscar);    	
    	

        var vlRuta = "";
        vlRuta = app.serviceUrl + "MyService.svc/Facturas";

        console.log(vlRuta);
        $.ajax({
            headers: getHeaders(),
            url: vlRuta,
            type: "GET",
            dataType: "json",

            success: function (response) {
                console.log(JSON.stringify(response.results));

                    vlI=0;
                    vlstr = " [";
                    for (var i in response.results) {
                        if (response.results[i].Folio) {
                            vlI += 1;
                            vlstr += ' {';
                            vlstr += '	"KEY":"' + response.results[i].Folio.trim() + '", ';
                            vlstr += ' 	"Proveedor":"' + response.results[i].RFC.trim() + '", ';
                            vlstr += ' 	"Folio":"' + response.results[i].Folio.trim() + '", ';
                            vlstr += ' 	"Fecha":"' + response.results[i].Fecha.trim() + '" ';
                            vlstr += ' },';
                        }
                    }
                    if (vlI > 0) {
                        vlstr = vlstr.slice(0, -1);
                        vlstr = vlstr + ']';
                        console.log(vlstr);
                    
                        var obj = JSON.parse(vlstr);
                        document.getElementById('lista').style.display = "block";
                        $("#grid-data").bootgrid("append", obj);
                    }                 
            },
            error: function (xhr) { console.log(xhr.responseText); }
        });



	}	


	$('#butListar').click (function() {
		fnLlenarDatos();
	 });


  	
    app.isLoading =true;
    if (app.isLoading) {
          app.spinner.setAttribute('hidden', true);  
          app.container.removeAttribute('hidden');   
          app.isLoading = false;
        }


});


