  $.support.cors = true;

  var myUserName = 'Test';
  var myUserPassword = 'test1234';
  var serviceUrl = 'http://localhost:24706/';     
  
  function getHeaders() {
       //btoa is a built in browser cmd for encode Base64
      return { 'Authorization': "Basic " + btoa("test:testpw") };
  }


  $('#butBorrarFacturas').click( function() { 
      var vlSql =" DELETE FROM alm_FacturasProveedor; ";

      try{    
        db.transaction(function (tx) { 
          console.log( vlSql );
          tx.executeSql(vlSql,[]);                          
        });       
      } catch(e) {
        alert("Error processing SQL: "+ e.message);
        return;
      };

   
  }); 


  $('#butBorrarFacturasDETFE').click( function() { 
      var vlSql =" DELETE FROM alm_FacturasProveedorDet_FacturaElectronia;";

      try{    
        db.transaction(function (tx) { 
          console.log( vlSql );
          tx.executeSql(vlSql,[]);                          
        });       
      } catch(e) {
        alert("Error processing SQL: "+ e.message);
        return;
      };

   
  }); 


  $('#butBorrarFacturasDETADD').click( function() { 
      var vlSql =" DELETE FROM alm_FacturasProveedorDet_ADDENDA;";

      try{    
        db.transaction(function (tx) { 
          console.log( vlSql );
          tx.executeSql(vlSql,[]);                          
        });       
      } catch(e) {
        alert("Error processing SQL: "+ e.message);
        return;
      };

   
  });   



  $('#butBorrarProveedores').click( function() { 
      var vlSql =" DELETE FROM ctl_Proveedores;";

      try{    
        db.transaction(function (tx) { 
          console.log( vlSql );
          tx.executeSql(vlSql,[]);                          
        });       
      } catch(e) {
        alert("Error processing SQL: "+ e.message);
        return;
      };

   
  });   


  $('#butBajarFacturas').click( function() { 
    console.log ('Bajando facturas');
    $.ajax({
      headers: getHeaders(),
      url: serviceUrl + "MyService.svc/Facturas",
      type: "GET",
      // tell jQuery we're expecting JSONP
      dataType: "json",
      // work with the response
      success: function( response ) {
        console.log( response );
        $('#results').append('<p>Testing Facturas Service...</p>').append('<code>'+ JSON.stringify(response) +'</code>');

        var vlSql = "";
        vlSql +=  " insert into alm_FacturasProveedor ";
        vlSql +=  " (idFacturaProveedor ,Folio,IdProveedor ,fecha ,observaciones ";
        vlSql +=  " ,Estatus ,UUID ,RFC ,serie ,RFCReceptor ,Total ,cVerificada )";
        vlSql +=  "  values ";
        for (var i in response.results) {
          console.log(i);
          if (i >0)  vlSql +=  ",";
          vlSql +=  "('" +response.results[i].IdFacturaProveedor + "',";
          vlSql +=  "'" +response.results[i].Folio + "',";
          vlSql +=  "'" +response.results[i].IdProveedor + "',";
          vlSql +=  "'" +response.results[i].Fecha + "',";
          vlSql +=  "'" +response.results[i].Observaciones + "',";
          vlSql +=  "'" +response.results[i].Estatus + "',";
          vlSql +=  "'" +response.results[i].UUID + "',";
          vlSql +=  "'" +response.results[i].RFC + "',";
          vlSql +=  "'" +response.results[i].Serie + "',";
          vlSql +=  "'" +response.results[i].RFCReceptor + "',";
          vlSql +=  "'" +response.results[i].Total + "',";
          vlSql +=  "'" +response.results[i].CVerificada + "'";          
          vlSql +=  ")";                    
        }

        console.log(vlSql);
        try{    
          db.transaction(function (tx) { 
            tx.executeSql(vlSql,[]);                          
          });       
        } catch(e) {
          alert("Error processing SQL: "+ e.message);
          return;
        }
      },
      error: function (xhr) { console.log(xhr.responseText); }
    });

  }); 



  $('#butBajarFacturasDETFE').click( function() { 
    console.log ('Bajando DET FE');


    $.ajax({
      headers: getHeaders(),
      url: serviceUrl + "MyService.svc/FacturaDetallesFE",
      type: "GET",
      // tell jQuery we're expecting JSONP
      dataType: "json",
      // work with the response
      success: function( response ) {
        console.log( response );
        $('#results').append('<p>Testing FacturaDetalleFE Service...</p>').append('<code>'+ JSON.stringify(response) +'</code>');

        var vlSql = "";
        vlSql +=  " insert into alm_FacturasProveedorDet_FacturaElectronia ";
        vlSql +=  " (idFacturaProveedor ,idFacturaProveedordet_fe ,Descripcion ,Unidad ";
        vlSql +=  "   ,ClaveUnidad ,Cantidad ,ClaveProdServ ,Importe ,ValorUnitario ,NoIdentificacion , cVerificado )";
        vlSql +=  "  values ";
        for (var i in response.results) {
          console.log(i);
          if (i >0)  vlSql +=  ",";
          vlSql +=  "('" +response.results[i].IdFacturaProveedor + "',";
          vlSql +=  "'" +response.results[i].IdFacturaProveedordet_fe + "',";
          vlSql +=  "'" +response.results[i].Descripcion + "',";
          vlSql +=  "'" +response.results[i].Unidad + "',";
          vlSql +=  "'" +response.results[i].ClaveUnidad + "',";
          vlSql +=  "'" +response.results[i].Cantidad + "',";
          vlSql +=  "'" +response.results[i].ClaveProdServ + "',";
          vlSql +=  "'" +response.results[i].Importe + "',";
          vlSql +=  "'" +response.results[i].ValorUnitario + "',";
          vlSql +=  "'" +response.results[i].NoIdentificacion + "',";
          vlSql +=  "'" +response.results[i].CVerificado + "'";          
          vlSql +=  ")";                    
        }

        console.log(vlSql);
        try{    
          db.transaction(function (tx) { 
            tx.executeSql(vlSql,[]);                          
          });       
        } catch(e) {
          alert("Error processing SQL: "+ e.message);
          return;
        }
      },
      error: function (xhr) { console.log(xhr.responseText); }
    });


  }); 


 

  $('#butBajarFacturasDETADD').click( function() { 
    console.log ('Bajando DET FE');


    $.ajax({
      headers: getHeaders(),
      url: serviceUrl + "MyService.svc/FacturaDetallesADDENDA",
      type: "GET",
      // tell jQuery we're expecting JSONP
      dataType: "json",
      // work with the response
      success: function( response ) {
        console.log( response );
        $('#results').append('<p>Testing FacturaDetalleADDENDA Service...</p>').append('<code>'+ JSON.stringify(response) +'</code>');

        var vlSql = "";
        vlSql +=  " insert into alm_FacturasProveedorDet_ADDENDA ";
        vlSql +=  " (idFacturasProveedorDet_ADDENDA ,  idFacturaProveedor ,  Lote ,FechaCaducidad ";
        vlSql +=  "         , Cantidad  ,codigo_barras ,precio ,ClaveOficialSSA ,ClavePresentacionSSA  ,cVerificado)";
        vlSql +=  "  values ";
        for (var i in response.results) {
          console.log(i);
          if (i >0)  vlSql +=  ",";
          vlSql +=  "('" +response.results[i].IdFacturasProveedorDet_ADDENDA + "',";
          vlSql +=  "'" +response.results[i].IdFacturaProveedor + "',";
          vlSql +=  "'" +response.results[i].Lote + "',";
          vlSql +=  "'" +response.results[i].FechaCaducidad + "',";
          vlSql +=  "'" +response.results[i].Cantidad + "',";
          vlSql +=  "'" +response.results[i].Codigo_barras + "',";
          vlSql +=  "'" +response.results[i].Precio + "',";
          vlSql +=  "'" +response.results[i].ClaveOficialSSA + "',";
          vlSql +=  "'" +response.results[i].ClavePresentacionSSA + "',";
          vlSql +=  "'" +response.results[i].CVerificado + "'";                    
          vlSql +=  ")";                    
        }

        console.log(vlSql);
        try{    
          db.transaction(function (tx) { 
            tx.executeSql(vlSql,[]);                          
          });       
        } catch(e) {
          alert("Error processing SQL: "+ e.message);
          return;
        }
      },
      error: function (xhr) { console.log(xhr.responseText); }
    });


  }); 



 // $('#butBajarFacturas').click( function() { 

		// var connection = new ActiveXObject("ADODB.Connection") ;

		// var connectionstring="Data Source=EDGAR-PC;Initial Catalog=almacen;User ID=sa;Password=supervizasiec2005;Provider=SQLOLEDB";

		// connection.Open(connectionstring);
		// var rs = new ActiveXObject("ADODB.Recordset");

		// rs.Open("SELECT * FROM alm_FacturasProveedor", connection);
		// rs.MoveFirst
		// while(!rs.eof)
		// {
		//    document.write(rs.fields(1));
		//    rs.movenext;
		// }

		// rs.close;
		// connection.close; 
		// var credentials = "adlogin=" + encodeURIComponent("EDGAR-PC\\administrador") + "&password=" + encodeURIComponent("123");

		// var xmlhttp = new XMLHttpRequest();
  //       xmlhttp.open('POST', 'http://edgar-pc/sql/demo', true ,encodeURIComponent("EDGAR-PC\\administrador"), encodeURIComponent("123"));

  //       var sr =
  //           '<SOAP-ENV:Envelope '+
		// 	  'xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">'+
		// 	   '<SOAP-ENV:Body>'+
		// 	      '<hello_world xmlns="http://tempuri.org/">'+
		// 	          '<msg>Hello World!</msg> '+
		// 	      '</hello_world>'+
		// 	   '</SOAP-ENV:Body>'+
		// 	'</SOAP-ENV:Envelope>';


  //       xmlhttp.onreadystatechange = function () {
  //       	alert(xmlhttp.responseText);
  //           if (xmlhttp.readyState == 4) {
  //               if (xmlhttp.status == 200) {
  //                   alert('done. use firebug/console to see network response');
  //               }
  //           }else
  //           {
  //           	    alert('error en conexion');
  //           }
  //       }
  //       // Send the POST request
  //       //xmlhttp.setRequestHeader('Content-Type', 'text/xml');
  //       xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
  // 		xmlhttp.withCredentials = true;
  //       xmlhttp.send(sr);

 	 //	callSOAPWS('this is a test');

//  }); 



  $('#butBajarProveedores').click( function() { 
    console.log ('Bajando Proveedores facturas');
    $.ajax({
      headers: getHeaders(),
      url: serviceUrl + "MyService.svc/Proveedores",
      type: "GET",
      // tell jQuery we're expecting JSONP
      dataType: "json",
      // work with the response
      success: function( response ) {
        console.log( response );
        $('#results').append('<p>Testing Proveedores Service...</p>').append('<code>'+ JSON.stringify(response) +'</code>');

        var vlSql = "";
        vlSql +=  " insert into ctl_Proveedores ";
        vlSql +=  " (RFC ,Nombre)";
        vlSql +=  "  values ";
        for (var i in response.results) {
          console.log(i);
          if (i >0)  vlSql +=  ",";
          vlSql +=  "('" +response.results[i].RFC + "',";
          vlSql +=  "'" +response.results[i].Nombre + "'";
          vlSql +=  ")";                    
        }

        console.log(vlSql);
        try{    
          db.transaction(function (tx) { 
            tx.executeSql(vlSql,[]);                          
          });       
        } catch(e) {
          alert("Error processing SQL: "+ e.message);
          return;
        }
      },
      error: function (xhr) { console.log(xhr.responseText); }
    });

  }); 