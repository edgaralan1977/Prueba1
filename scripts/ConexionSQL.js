  $.support.cors = true;

  var myUserName = 'Test';
  var myUserPassword = 'test1234';
  var serviceUrl = 'http://localhost:24706/';     
  var serviceUrl = 'http://10.0.180.21/testwcf/';       
  var vlServidor ='';
  app.serviceUrl =serviceUrl



  function init() {


      try{    
          db.transaction(function (tx) {  
          var vlsql=  "SELECT * FROM ctl_Configuracion WHERE id = 1";
          //tx.executeSql("SELECT * FROM ctl_Presentaciones where idPresentacion = ? ", [vlIDPresentacion], function (tx, results) {
          console.log(vlsql);
          try{            
            tx.executeSql(vlsql, [] , function (tx, results) {
              var len = results.rows.length, i;
              console.log( len);
              if (len >0) {
                console.log("Configuracion encontrada");
                for (i = 0; i < len; i++) {
                  vlServidor = results.rows.item(i).Servidor;
                  console.log (serviceUrl);
                  if (vlServidor !='' ){
                    serviceUrl= vlServidor
                    console.log (serviceUrl);
                  }
                }
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

      return ;
  }



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



  $('#butListarFacturasS').click( function() { 
    console.log ('Listar facturas');
     location.href ="ListadeFacturasS.html";
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


  $('#butBorrarFacturasFB').click( function() { 
    var ListRef = appFB.database().ref('alm_FacturasProveedor' );
    ListRef.once('value').then(function(snapshotList) {
      snapshotList.forEach(function(snapshotItem) {
        var vlRuta = "";
        vlRuta= "/alm_FacturasProveedor/" + snapshotItem.key;    
        console.log(vlRuta);
        var productoRef = appFB.database().ref(vlRuta);
        productoRef.remove();        
      });
    });
  });

  $('#butBorrarEntradasFB').click( function() { 
    var ListRef = appFB.database().ref('Entradas' );
    ListRef.once('value').then(function(snapshotList) {
      snapshotList.forEach(function(snapshotItem) {
        var vlRuta = "";
        vlRuta= "/Entradas/" + snapshotItem.key;    
        console.log(vlRuta);
        var productoRef = appFB.database().ref(vlRuta);
        productoRef.remove();        
      });
    });
  }); 


  $('#butSubirDETFEFB').click( function() { 
    console.log ('Subir detalle de facturas electronica  a FireBase '); 

    try{
      db.transaction(function (tx) {  
        var vlsql=  "SELECT * FROM alm_FacturasProveedorDet_FacturaElectronia  ";
        console.log(vlsql);
        try{
          tx.executeSql(vlsql, [] , function (tx, results) {
            var len = results.rows.length, i;
            if (len >0) {
              for (i = 0; i < len; i++) { 

                var vlObjeto ={
                    'idFacturaProveedor': results.rows.item(i).idFacturaProveedor,
                    'idFacturaProveedordet_fe': results.rows.item(i).idFacturaProveedordet_fe,
                    'Descripcion': results.rows.item(i).Descripcion,
                    'Unidad': results.rows.item(i).Unidad,
                    'ClaveUnidad': results.rows.item(i).ClaveUnidad,
                    'Cantidad': results.rows.item(i).Cantidad,                    
                    'ClaveProdServ': results.rows.item(i).ClaveProdServ,
                    'Importe': results.rows.item(i).Importe,
                    'ValorUnitario': results.rows.item(i).ValorUnitario,
                    'NoIdentificacion': results.rows.item(i).NoIdentificacion,
                    'cVerificado': results.rows.item(i).cVerificado
                };

                var ruta='alm_FacturasProveedor/'+results.rows.item(i).idFacturaProveedor+"/"+ results.rows.item(i).idFacturaProveedordet_fe;
                console.log(ruta);        
                var dfeListRef = appFB.database().ref(ruta);                    
                console.log(vlObjeto);
                //var newDfERef = dfeListRef.push();                              
                //newDfERef.set(vlObjeto);
                dfeListRef.set(vlObjeto);
              }
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
  }); 


  $('#butSubirFacturasFB').click( function() { 
    console.log ('Subir facturas  a FireBase '); 

    try{
      db.transaction(function (tx) {  
        var vlsql=  "SELECT * FROM alm_FacturasProveedor ";
        console.log(vlsql);
        try{
          tx.executeSql(vlsql, [] , function (tx, results) {
            var len = results.rows.length, i;
            console.log( len);
            if (len >0) {
              for (i = 0; i < len; i++) {               
                var vlObjeto ={
                  'idFacturaProveedor': results.rows.item(i).idFacturaProveedor,
                  'Folio': results.rows.item(i).Folio,
                  'IdProveedor': results.rows.item(i).IdProveedor,
                  'fecha': results.rows.item(i).IdProveedor,
                  'observaciones': results.rows.item(i).observaciones,
                  'Estatus': results.rows.item(i).Estatus,
                  'cXMl': results.rows.item(i).cXMl,
                  'UUID': results.rows.item(i).UUID,
                  'RFC': results.rows.item(i).RFC,
                  'serie': results.rows.item(i).serie,
                  'RFCReceptor': results.rows.item(i).RFCReceptor,
                  'Total': results.rows.item(i).Total,
                  'cVerificada': results.rows.item(i).cVerificada
                };                
                console.log(vlObjeto);
                var facListRef = appFB.database().ref('alm_FacturasProveedor/'+results.rows.item(i).idFacturaProveedor);
                //var newDetalleDentradaRef = facListRef.push();                  
                //newDetalleDentradaRef.set(vlObjeto);
                facListRef.set(vlObjeto);
               
              }
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
  }); 


  $('#butBajarFacturasFB').click( function() { 
    console.log ('Bajar Facturas  de FireBase ');    
    var vlSql = "";
    
    var ListRef = appFB.database().ref('alm_FacturasProveedor' );
    ListRef.once('value').then(function(snapshotList) {
      snapshotList.forEach(function(snapshotItem) {
        var childKey = snapshotItem.key;
        var childData = snapshotItem.val();
        if (childData.idFacturaProveedor){

          vlSql =  " insert into alm_FacturasProveedor ";
          vlSql +=  " (idFacturaProveedor ,Folio,IdProveedor ,fecha ,observaciones ";
          vlSql +=  " ,Estatus ,UUID ,RFC ,serie ,RFCReceptor ,Total ,cVerificada )";
          vlSql +=  "  values ";
          vlSql +=  "('" +childData.idFacturaProveedor + "',";
          vlSql +=  "'" +childData.Folio + "',";
          vlSql +=  "'" +childData.IdProveedor+ "',";
          vlSql +=  "'" +childData.fecha + "',";
          vlSql +=  "'" +childData.observaciones + "',";
          vlSql +=  "'" +childData.Estatus + "',";
          vlSql +=  "'" +childData.UUID+ "',";
          vlSql +=  "'" +childData.RFC + "',";
          vlSql +=  "'" +childData.serie  + "',";
          vlSql +=  "'" +childData.RFCReceptor + "',";
          vlSql +=  "'" +childData.Total + "',";
          vlSql +=  "'" +childData.cVerificada + "'";          
          vlSql +=  ")";       
          console.log(vlSql);
          try{    
           db.transaction(function (tx) { 
            tx.executeSql(vlSql,[]);                          
           });       
          } catch(e) {
            alert("Error processing SQL: "+ e.message);
            return;
          }

        }
      });



    });
  }); 


  $('#butBajarDETFEFB').click( function() { 
    console.log ('Bajar det Facturas  a FireBase ');    
    var vlSql = "";
    
    var ListRef = appFB.database().ref('alm_FacturasProveedor' );
    ListRef.once('value').then(function(snapshotList) {
      snapshotList.forEach(function(snapshotItem) {
        var childKey = snapshotItem.key;
        var childData = snapshotItem.val();
        var ListRef1 = appFB.database().ref('alm_FacturasProveedor/'+ childKey  );
        ListRef1.once('value').then(function(snapshotList1) {
          snapshotList1.forEach(function(snapshotItem1) {
            var childKey1 = snapshotItem1.key;
            var childData1 = snapshotItem1.val();
            if (childData1.idFacturaProveedordet_fe){
              console.log(childData1);
              vlSql =  " insert into alm_FacturasProveedorDet_FacturaElectronia ";
              vlSql +=  " (idFacturaProveedor ,idFacturaProveedordet_fe,Descripcion ,Unidad ,ClaveUnidad ";
              vlSql +=  " ,Cantidad ,ClaveProdServ ,Importe  ,ValorUnitario ,NoIdentificacion ,cVerificado )";
              vlSql +=  "  values ";              
              vlSql +=  "('" +childData1.idFacturaProveedor + "',";
              vlSql +=  "'" +childData1.idFacturaProveedordet_fe + "',";
              vlSql +=  "'" +childData1.Descripcion+ "',";
              vlSql +=  "'" +childData1.Unidad + "',";
              vlSql +=  "'" +childData1.ClaveUnidad + "',";
              vlSql +=  "'" +childData1.Cantidad + "',";
              vlSql +=  "'" +childData1.ClaveProdServ + "',";              
              vlSql +=  "'" +childData1.Importe+ "',";
              vlSql +=  "'" +childData1.ValorUnitario + "',";
              vlSql +=  "'" +childData1.NoIdentificacion  + "',";
              vlSql +=  "'" +childData1.cVerificado + "'";
              vlSql +=  ")";   
              vlSql +=  "";
              console.log(vlSql);

              try{    
               db.transaction(function (tx) { 
                tx.executeSql(vlSql,[]);                          
               });       
              } catch(e) {
                alert("Error processing SQL: "+ e.message);
                return;
              }
            }
          });
        });
      });
    });
  });


  $('#butBajarProveedoresFB').click( function() { 
    console.log ('Bajar Proveedores  de FireBase ');    
    
    
    var ListRef = appFB.database().ref('ctl_Proveedores' );
    ListRef.once('value').then(function(snapshotList) {
      snapshotList.forEach(function(snapshotItem) {
        var childKey = snapshotItem.key;
        var childData = snapshotItem.val();
        if (childData.RFC){
          var vlSql = "";
          vlSql =  " insert into ctl_Proveedores ";
          vlSql +=  " (RFC , Nombre , ApellidoPaterno ,ApellidoMaterno,  Correo )";
          vlSql +=  "  values ";
          vlSql +=  "('" +childData.RFC + "',";
          vlSql +=  "'" +childData.Nombre + "',";
          vlSql +=  "'" +childData.ApellidoPaterno+ "',";
          vlSql +=  "'" +childData.ApellidoMaterno + "',";
          vlSql +=  "'" +childData.Correo + "'";
          vlSql +=  ")";       
          console.log(vlSql);
          try{    
           db.transaction(function (tx) { 
            tx.executeSql(vlSql,[]);                          
           });       
          } catch(e) {
            alert("Error processing SQL: "+ e.message);
            return;
          }
        }
      });
    });
  }); 



  $('#butSubirProveedoresFB').click( function() { 
    console.log ('Subir Proveedores a FireBase '); 

    try{
      db.transaction(function (tx) {  
        var vlsql=  "SELECT * FROM ctl_Proveedores ";
        console.log(vlsql);
        try{
          tx.executeSql(vlsql, [] , function (tx, results) {
            var len = results.rows.length, i;
            console.log( len);
            if (len >0) {
              for (i = 0; i < len; i++) {               
                var vlObjeto ={
                  'RFC': results.rows.item(i).RFC,
                  'Nombre': results.rows.item(i).Nombre,
                  'ApellidoPaterno': results.rows.item(i).ApellidoPaterno,
                  'ApellidoMaterno': results.rows.item(i).ApellidoMaterno,
                  'Correo': results.rows.item(i).Correo
                };                
                console.log(vlObjeto);
                var facListRef = appFB.database().ref('ctl_Proveedores/'+results.rows.item(i).RFC);
                //var newDetalleDentradaRef = facListRef.push();                  
                //newDetalleDentradaRef.set(vlObjeto);
                facListRef.set(vlObjeto);
               
              }
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
  }); 



  $('#butBorrarProveedoresFB').click( function() { 
    var ListRef = appFB.database().ref('Proveedores' );
    ListRef.once('value').then(function(snapshotList) {
      snapshotList.forEach(function(snapshotItem) {
        var vlRuta = "";
        vlRuta= "/Proveedores/" + snapshotItem.key;    
        console.log(vlRuta);
        var productoRef = appFB.database().ref(vlRuta);
        productoRef.remove();        
      });
    });
  }); 

  init();

  app.isLoading =true;
    if (app.isLoading) {
      app.spinner.setAttribute('hidden', true);  
      app.container.removeAttribute('hidden');   
      app.isLoading = false;
    }  