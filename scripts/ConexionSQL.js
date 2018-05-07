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
    return;
  }




  $('#butBajarTodo_SQL').click( function() { 
    fnBajarFacturas_SQL();
    fnBajarFacturaDetallesFE_SQL();
    fnBajarFacturaDetallesADDENDA_SQL();
    fnBajarProveedores_SQL();
  }); 


  $('#butBajarTodo_FB').click( function() { 
    fnBajar_Facturas_FB();
    fnBajar_detFacturas_FB();
    fnBajar_Proveedores_FB();
  }); 


  $('#butSubir_Todo_FB').click( function() { 
    fnSubir_Facturas_FB();
    fnSubir_DETFactura_FB();
    fnSubir_Proveedores_FB();
  }); 




  function fnBorrarFacturas_WSQL(){
    fnCargando();
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
    fnQuitarCargando();    
  }



  $('#butBorrarFacturas').click( function() { 
    fnBorrarFacturas_WSQL();
  }); 

  function fnBorrarFacturasDETFE_WSQL(){
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
    fnQuitarCargando(); 
  }   

  $('#butBorrarFacturasDETFE').click( function() { 
    fnBorrarFacturasDETFE_WSQL();
  }); 

 function fnBorrarFacturasDETADD_WSQL(){
    fnCargando();
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
    fnQuitarCargando();    
  }

  $('#butBorrarFacturasDETADD').click( function() { 
    fnBorrarFacturasDETADD_WSQL();
  });   


  function fnBorrarProveedores_WSQL(){
    fnCargando();
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
    fnQuitarCargando();
  }

  $('#butBorrarProveedores').click( function() { 
    fnBorrarProveedores_WSQL()
  });




  function fnBajarFacturas_SQL(){
    fnCargando();
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
        
        
        try{    
          db.transaction(function (tx) { 
            for (var i in response.results) {
              console.log(i);          

              var vlSql = "";
              vlSql = "";
              vlSql +=  " insert into alm_FacturasProveedor ";
              vlSql +=  " (idFacturaProveedor ,Folio,IdProveedor ,fecha ,observaciones ";
              vlSql +=  " ,Estatus ,UUID ,RFC ,serie ,RFCReceptor ,Total ,cVerificada )";
              vlSql +=  " SELECT '" +response.results[i].IdFacturaProveedor + "',";
              vlSql +=  " '" +response.results[i].Folio + "',";
              vlSql +=  " '" +response.results[i].IdProveedor + "',";
              vlSql +=  " '" +response.results[i].Fecha + "',";
              vlSql +=  " '" +response.results[i].Observaciones + "',";
              vlSql +=  " '" +response.results[i].Estatus + "',";
              vlSql +=  " '" +response.results[i].UUID + "',";
              vlSql +=  " '" +response.results[i].RFC + "',";
              vlSql +=  " '" +response.results[i].Serie + "',";
              vlSql +=  " '" +response.results[i].RFCReceptor + "',";
              vlSql +=  " '" +response.results[i].Total + "',";
              vlSql +=  " '" +response.results[i].CVerificada + "'";          
              vlSql +=  " WHERE NOT EXISTS ( SELECT 1 FROM alm_FacturasProveedor ";
              vlSql +=  "                    WHERE idFacturaProveedor = '" +response.results[i].IdFacturaProveedor+"')";
              vlSql +=  ";";            
              console.log(vlSql);                    
              tx.executeSql(vlSql,[]);                          
            }
          });          
        } catch(e) {
          alert("Error processing SQL: "+ e.message);
          return;
        }         
      },
      error: function (xhr) { console.log(xhr.responseText); }
    });
    fnQuitarCargando();
  }

  $('#butBajarFacturas_SQL').click( function() {
    fnBajarFacturas_SQL()
  }); 



  $('#butListarFacturasS').click( function() { 
    console.log ('Listar facturas');
     location.href ="ListadeFacturasS.html";
  }); 


  function fnBajarFacturaDetallesFE_SQL(){
    fnCargando();
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

          try{    
            db.transaction(function (tx) { 
            for (var i in response.results) {
              console.log(i);

              var vlSql = "";
              vlSql +=  " insert into alm_FacturasProveedorDet_FacturaElectronia ";
              vlSql +=  " (idFacturaProveedor ,idFacturaProveedordet_fe ,Descripcion ,Unidad ";
              vlSql +=  "  ,ClaveUnidad ,Cantidad ,ClaveProdServ ,Importe ,ValorUnitario ,NoIdentificacion , cVerificado )";
              vlSql +=  "  SELECT  ";
              vlSql +=  " '" +response.results[i].IdFacturaProveedor + "',";
              vlSql +=  " '" +response.results[i].IdFacturaProveedordet_fe + "',";
              vlSql +=  " '" +response.results[i].Descripcion + "',";
              vlSql +=  " '" +response.results[i].Unidad + "',";
              vlSql +=  " '" +response.results[i].ClaveUnidad + "',";
              vlSql +=  " '" +response.results[i].Cantidad + "',";
              vlSql +=  " '" +response.results[i].ClaveProdServ + "',";
              vlSql +=  " '" +response.results[i].Importe + "',";
              vlSql +=  " '" +response.results[i].ValorUnitario + "',";
              vlSql +=  " '" +response.results[i].NoIdentificacion + "',";
              vlSql +=  " '" +response.results[i].CVerificado + "'";          
              vlSql +=  " WHERE NOT EXISTS ( SELECT 1 FROM alm_FacturasProveedorDet_FacturaElectronia ";
              vlSql +=  "                     WHERE idFacturaProveedor = '" + response.results[i].idFacturaProveedor + "'";
              vlSql +=  "                     AND  idFacturaProveedordet_fe = '" + response.results[i].idFacturaProveedordet_fe +"')";
              vlSql +=  ";";             
              console.log(vlSql);
              tx.executeSql(vlSql,[]);                          
            }
          });       
        } catch(e) {
          alert("Error processing SQL: "+ e.message);
          return;
        }
     },
      error: function (xhr) { console.log(xhr.responseText); }
    });
    fnQuitarCargando();
  }


  $('#butBajarFacturasDETFE_SQL').click( function() { 
    fnBajarFacturaDetallesFE_SQL();
  }); 
 

function fnBajarFacturaDetallesADDENDA_SQL(){
    fnCargando();
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

        try{    
          db.transaction(function (tx) { 
            for (var i in response.results) {
              console.log(i);
              vlSql = "";              
              vlSql +=  " insert into alm_FacturasProveedorDet_ADDENDA ";
              vlSql +=  " (idFacturasProveedorDet_ADDENDA ,  idFacturaProveedor ,  Lote ,FechaCaducidad ";
              vlSql +=  "         , Cantidad  ,codigo_barras ,precio ,ClaveOficialSSA ,ClavePresentacionSSA  ,cVerificado)";
              vlSql +=  "  SELECT ";          
              vlSql +=  " '" +response.results[i].IdFacturasProveedorDet_ADDENDA + "',";
              vlSql +=  " '" +response.results[i].IdFacturaProveedor + "',";
              vlSql +=  " '" +response.results[i].Lote + "',";
              vlSql +=  " '" +response.results[i].FechaCaducidad + "',";
              vlSql +=  " '" +response.results[i].Cantidad + "',";
              vlSql +=  " '" +response.results[i].Codigo_barras + "',";
              vlSql +=  " '" +response.results[i].Precio + "',";
              vlSql +=  " '" +response.results[i].ClaveOficialSSA + "',";
              vlSql +=  " '" +response.results[i].ClavePresentacionSSA + "',";
              vlSql +=  " '" +response.results[i].CVerificado + "'";
              vlSql +=  " WHERE NOT EXISTS ( SELECT 1 FROM alm_FacturasProveedorDet_FacturaElectronia ";
              vlSql +=  "                     WHERE idFacturaProveedor = '" + response.results[i].idFacturaProveedor + "'";
              vlSql +=  "                     AND  IdFacturasProveedorDet_ADDENDA = '" + response.results[i].IdFacturasProveedorDet_ADDENDA +"')";
              vlSql +=  ";";                   
              console.log(vlSql);                        
              tx.executeSql(vlSql,[]);
            }              
          });       
        } catch(e) {
          alert("Error processing SQL: "+ e.message);
          return;
        }
      },
      error: function (xhr) { console.log(xhr.responseText); }
    });
    fnQuitarCargando();
  }

  $('#butBajarFacturasDETADD_SQL').click( function() { 
    fnBajarFacturaDetallesADDENDA_SQL();
  }); 


  $('#butBajarProveedores1').click( function() { 

      // try{    
      //   db.transaction(function (tx) { 
      //     var vlSql = "";
      //     vlSql +=  " insert into ctl_Proveedores ";
      //     vlSql +=  " (RFC ,Nombre)";
      //     vlSql +=  "  SELECT  ";          
      //     vlSql +=  " '1',";
      //     vlSql +=  " '1'";
      //     vlSql +=  " WHERE NOT EXISTS ( SELECT 1 FROM ctl_Proveedores WHERE RFC = '1')";          
      //     vlSql +=  " ;";
      //     console.log(vlSql);                  
      //     tx.executeSql(vlSql,[]);                          
      //   });       
      // } catch(e) {
      //   alert("Error processing SQL: "+ e.message);
      //   return;
      // }

      // try{    
      //   db.transaction(function (tx) { 
      //     vlSql = "";
      //     vlSql +=  " insert into ctl_Proveedores ";
      //     vlSql +=  " (RFC ,Nombre)";
      //     vlSql +=  "  SELECT  ";          
      //     vlSql +=  " '2',";
      //     vlSql +=  " '2'";
      //     vlSql +=  " WHERE NOT EXISTS ( SELECT 1 FROM ctl_Proveedores WHERE RFC = '2')";
      //     vlSql +=  " ;"
      //     console.log(vlSql);                  
      //     tx.executeSql(vlSql,[]);                          
      //   });       
      // } catch(e) {
      //   alert("Error processing SQL: "+ e.message);
      //   return;
      // }



      try{    
        db.transaction(function (tx) { 
          var vlSql = "";
          vlSql +=  " insert into ctl_Proveedores ";
          vlSql +=  " (RFC ,Nombre)";
          vlSql +=  "  SELECT  ";          
          vlSql +=  " '1',";
          vlSql +=  " '1'";
          vlSql +=  " WHERE NOT EXISTS ( SELECT 1 FROM ctl_Proveedores WHERE RFC = '1')";          
          vlSql +=  " ;";
          console.log(vlSql);                  
          tx.executeSql(vlSql,[]); 
          vlSql = "";
          vlSql +=  " insert into ctl_Proveedores ";
          vlSql +=  " (RFC ,Nombre)";
          vlSql +=  "  SELECT  ";          
          vlSql +=  " '2',";
          vlSql +=  " '2'";
          vlSql +=  " WHERE NOT EXISTS ( SELECT 1 FROM ctl_Proveedores WHERE RFC = '2')";
          vlSql +=  " ;"
          console.log(vlSql);                  
          tx.executeSql(vlSql,[]); 
        });       
      } catch(e) {
        alert("Error processing SQL: "+ e.message);
        return;
      }

      try{    
        db.transaction(function (tx) { 
          vlSql = "";
          vlSql +=  " insert into ctl_Proveedores ";
          vlSql +=  " (RFC ,Nombre)";
          vlSql +=  "  SELECT  ";          
          vlSql +=  " '2',";
          vlSql +=  " '2'";
          vlSql +=  " WHERE NOT EXISTS ( SELECT 1 FROM ctl_Proveedores WHERE RFC = '2')";
          vlSql +=  " ;"
          console.log(vlSql);                  
          tx.executeSql(vlSql,[]);                          
        });       
      } catch(e) {
        alert("Error processing SQL: "+ e.message);
        return;
      }



      try{
        db.transaction(function (tx) {  
          var vlsql=  "SELECT * FROM ctl_Proveedores";
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



  function fnBajarProveedores_SQL(){
    fnCargando();
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

        
                 
        try{    
          db.transaction(function (tx) { 
            for (var i in response.results) {              
              console.log(i); 
              var vlSql = "";  
              vlSql = "";              
              vlSql +=  " insert into ctl_Proveedores ";
              vlSql +=  " (RFC ,Nombre)";
              vlSql +=  "  SELECT  ";          
              vlSql +=  " '" +response.results[i].RFC + "',";
              vlSql +=  " '" +response.results[i].Nombre + "'";
              vlSql +=  " WHERE NOT EXISTS ( SELECT 1 FROM ctl_Proveedores WHERE RFC = '" + response.results[i].RFC +"')";
              vlSql +=  " ;"
              console.log(vlSql);            
              tx.executeSql(vlSql,[]);                          
            }
          });       
        } catch(e) {
          alert("Error processing SQL: "+ e.message);
          return;
        }
     },
      error: function (xhr) { console.log(xhr.responseText); }
    });
    fnQuitarCargando();    
  }

  $('#butBajarProveedores_SQL').click( function() { 
    fnBajarProveedores_SQL();
  }); 


  function fnBorrar_alm_FacturasProveedor_FB(){
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
  }

  $('#butBorrarFacturasFB').click( function() { 
    fnBorrar_alm_FacturasProveedor_FB();
  });

  function fnBorrar_Entradas_FB(){
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
    fnQuitarCargando();   
  } 

  $('#butBorrarEntradasFB').click( function() { 
    fnBorrar_Entradas_FB();
  }); 

 function fnSubir_DETFactura_FB(){
    fnCargando();
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
    fnQuitarCargando();    
  }

  $('#butSubirDETFEFB').click( function() { 
    fnSubir_DETFactura_FB();
  }); 

  function fnSubir_Facturas_FB(){
    fnCargando();
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
                  'fecha': results.rows.item(i).fecha,
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
    fnQuitarCargando();    
  }

  $('#butSubirFacturasFB').click( function() { 
    fnSubir_Facturas_FB();
  }); 

 function fnBajar_Facturas_FB(){
    fnCargando();    
    console.log ('Bajar Facturas  de FireBase ');    


      var ListRef = appFB.database().ref('alm_FacturasProveedor' );
      ListRef.once('value').then(function(snapshotList) {
        snapshotList.forEach(function(snapshotItem) {
          var childKey = snapshotItem.key;
          var childData = snapshotItem.val();
          if (childData.idFacturaProveedor){            
            try{    
            db.transaction(function (tx) {      

              var vlSql = "";         
              vlSql =  " insert into alm_FacturasProveedor ";
              vlSql +=  " (idFacturaProveedor ,Folio,IdProveedor ,fecha ,observaciones ";
              vlSql +=  " ,Estatus ,UUID ,RFC ,serie ,RFCReceptor ,Total ,cVerificada )";
              vlSql +=  "  SELECT ";
              vlSql +=  " '" +childData.idFacturaProveedor + "',";
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
              vlSql +=  " WHERE NOT EXISTS ( SELECT 1 FROM alm_FacturasProveedor ";
              vlSql +=  "   WHERE idFacturaProveedor = '" + childData.idFacturaProveedor+"' ";
              vlSql +=  "   );";
              console.log(vlSql);
              tx.executeSql(vlSql,[]);                          
             });    
            } catch(e) {
              alert("Error processing SQL: "+ e.message);
              return;
            }                    
        }
      });
    });
    fnQuitarCargando();    
  }

  $('#butBajarFacturasFB').click( function() { 
    fnBajar_Facturas_FB();
  }); 


  function fnBajar_detFacturas_FB(){
    fnCargando();
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
              try{    
               db.transaction(function (tx) { 

                vlSql =  " insert into alm_FacturasProveedorDet_FacturaElectronia ";
                vlSql +=  " (idFacturaProveedor ,idFacturaProveedordet_fe,Descripcion ,Unidad ,ClaveUnidad ";
                vlSql +=  " ,Cantidad ,ClaveProdServ ,Importe  ,ValorUnitario ,NoIdentificacion ,cVerificado )";
                vlSql +=  " SELECT '" + childData1.idFacturaProveedor + "',";
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
                vlSql +=  " WHERE NOT EXISTS ( SELECT 1 FROM alm_FacturasProveedorDet_FacturaElectronia ";
                vlSql +=  "   WHERE idFacturaProveedor = '" + childData1.idFacturaProveedor+"' ";
                vlSql +=  "   AND idFacturaProveedordet_fe = '" + childData1.idFacturaProveedordet_fe+"')";
                console.log(vlSql);
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
    fnQuitarCargando();  
  }


  $('#butBajarDETFEFB').click( function() { 
    fnBajar_detFacturas_FB();
  });


 function fnBajar_Proveedores_FB(){
    fnCargando();
    console.log ('Bajar Proveedores  de FireBase ');            
    var ListRef = appFB.database().ref('ctl_Proveedores' );
    ListRef.once('value').then(function(snapshotList) {
      snapshotList.forEach(function(snapshotItem) {
        var childKey = snapshotItem.key;
        var childData = snapshotItem.val();
        if (childData.RFC){
          try{    
           db.transaction(function (tx) { 
            var vlSql = "";
            vlSql =  " insert into ctl_Proveedores ";
            vlSql +=  " (RFC , Nombre , ApellidoPaterno ,ApellidoMaterno,  Correo )";
            vlSql +=  "  SELECT ";
            vlSql +=  "'" +childData.RFC + "',";
            vlSql +=  "'" +childData.Nombre + "',";
            vlSql +=  "'" +childData.ApellidoPaterno+ "',";
            vlSql +=  "'" +childData.ApellidoMaterno + "',";
            vlSql +=  "'" +childData.Correo + "'";
            vlSql +=  " WHERE NOT EXISTS ( SELECT 1 FROM ctl_Proveedores WHERE RFC = '" + childData.RFC+"')";
            console.log(vlSql);            
            tx.executeSql(vlSql,[]);                          
           });       
          } catch(e) {
            alert("Error processing SQL: "+ e.message);
            return;
          }
        }
      });
    });
    fnQuitarCargando();
  }

  $('#butBajarProveedoresFB').click( function() { 
    fnBajar_Proveedores_FB();
  }); 

  function fnSubir_Proveedores_FB(){
    fnCargando();
    console.log ('Subir Proveedores a FireBase '); 
    try{
      db.transaction(function (tx) {  
        var vlsql=  "SELECT * FROM ctl_Proveedores";
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
    fnQuitarCargando();   
  }

  $('#butSubirProveedoresFB').click( function() { 
    fnSubir_Proveedores_FB();
  });

  function fnBorrar_Proveedores_FB(){
    fnCargando();
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
    fnQuitarCargando();
  }

  $('#butBorrarProveedoresFB').click( function() {
    fnBorrar_Proveedores_FB();
  });


  $('#butCountWebSQL').click( function() { 
    fnCargando();
    var vlStr ="";
    try{
      db.transaction(function (tx) {  
        var vlsql=  "SELECT count(*) Cantidad FROM alm_FacturasProveedor ";
        console.log(vlsql);
        try{
          tx.executeSql(vlsql, [] , function (tx, results) {
            var len = results.rows.length, i;
            console.log( len);
            if (len >0) {
              for (i = 0; i < len; i++) {
                   vlStr ="";
                   vlStr = vlStr.concat("alm_FacturasProveedor: ", results.rows.item(i).Cantidad)                   
                   vlStr = vlStr + String.fromCharCode(10) ;
                   alert (vlStr );
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


    try{
      db.transaction(function (tx) {  
        var vlsql=  "SELECT count(*) Cantidad FROM ctl_Proveedores ";
        console.log(vlsql);
        try{
          tx.executeSql(vlsql, [] , function (tx, results) {
            var len = results.rows.length, i;
            console.log( len);
            if (len >0) {
              for (i = 0; i < len; i++) {               
                vlStr ="";
                vlStr = vlStr.concat("ctl_Proveedores:",results.rows.item(i).Cantidad)                   
                alert (vlStr );
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


    
    try{
      db.transaction(function (tx) {  
        var vlsql=  "SELECT count(*) Cantidad FROM alm_FacturasProveedorDet_FacturaElectronia ";
        console.log(vlsql);
        try{
          tx.executeSql(vlsql, [] , function (tx, results) {
            var len = results.rows.length, i;
            console.log( len);
            if (len >0) {
              for (i = 0; i < len; i++) {               
                   vlStr ="";
                   vlStr = vlStr.concat("alm_FacturasProveedorDet_FacturaElectronia:",results.rows.item(i).Cantidad)                   
                   alert (vlStr );
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

    
    fnQuitarCargando();
  }); 



  init();

  app.isLoading =true;
    if (app.isLoading) {
      app.spinner.setAttribute('hidden', true);  
      app.container.removeAttribute('hidden');   
      app.isLoading = false;
    }