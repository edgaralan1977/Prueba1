var db = openDatabase('mydbAlmacen', '1.0', 'DataBase Almacen', 2 * 1024 * 1024);


var Database = function(){
  var mydb=false;
}

Database.prototype.initDB = function() {
     try { 
        if (!window.openDatabase) { 
          alert('not supported'); 
        } else { 
          var shortName = 'mydbAlmacen'; 
          var version = '1.0'; 
          var displayName = 'DataBase Almacen'; 
          var maxSize = 65536; // in bytes 
          this.mydb = openDatabase(shortName, version, displayName, maxSize); 
         }
      } catch(e) {}
}

Database.prototype.createTable = function(vlsql) {
  try {
    this.mydb.transaction(
      function(transaction) {
      //transaction.executeSql('DROP TABLE sample_db', [], this.nullDataHandler, this.errorHandler);
            transaction.executeSql(vlsql, [], this.nullDataHandler, this.errorHandler); 
          });
      } catch(e) {}
}

Database.prototype.errorHandler = function (transaction, error) { 
  // returns true to rollback the transaction
  alert("Error processing SQL: "+ error);
  return true;  
}

// null db data handler
Database.prototype.nullDataHandler = function (transaction, results) {
}

// Then we can easily make a new Database object and call the initDB method.
var database = new Database();
database.initDB();



   console.log('Creando base de datos');

      var db = openDatabase('mydbAlmacen', '1.0', 'DataBase Almacen', 2 * 1024 * 1024);
            //db.transaction(function (tx) {
              //tx.executeSql("CREATE TABLE IF NOT EXISTS ALM_Movimiento (id INTEGER PRIMARY KEY AUTOINCREMENT,  IdUmedica, AEjercicio ,IdMotivo ,FolioMovimiento , TipoES ,Fecha, IdProveedor  ,Observaciones, IdPersonalR  , estatus  , dFechaCaptura TIMESTAMP DEFAULT (datetime('now','localtime')))");
              //tx.executeSql("CREATE TABLE IF NOT EXISTS ALM_MovimientoDet (id INTEGER PRIMARY KEY AUTOINCREMENT, idmovimiento, IdProducto, ClaveOficialProducto, IdPresentacion, codigo_barras, TipoMI,Lote ,FechaCaducidad, Cantidad, idFuente, idClasificador, idPrograma, idComponente, idPartida,  idUbicacionFisica, Costo, IVA, IVAP , Observaciones , dFechaCaptura TIMESTAMP DEFAULT (datetime('now','localtime'))))");
              //tx.executeSql("CREATE TABLE IF NOT EXISTS ctl_Presentaciones (id INTEGER PRIMARY KEY AUTOINCREMENT, idPresentacion unique, Descripcion , dFechaCaptura TIMESTAMP DEFAULT (datetime('now','localtime'))))");
              //tx.executeSql("CREATE TABLE IF NOT EXISTS ctl_Productos (id INTEGER PRIMARY KEY AUTOINCREMENT, idClaveOficial unique, Descripcion  ,  TipoMI  , IVAP )");
              //tx.executeSql("CREATE TABLE IF NOT EXISTS ctl_CodigosdeBarras (id INTEGER PRIMARY KEY AUTOINCREMENT,CodigoBarras unique, idClaveOficial  ,  idPresentacion  , Descripcion , dFechaCaptura TIMESTAMP DEFAULT (datetime('now','localtime'))))");
              //tx.executeSql("CREATE TABLE IF NOT EXISTS ctl_Proveedores (id INTEGER PRIMARY KEY AUTOINCREMENT ,RFC unique, Nombre , ApellodoPaterno ,Apellido Materno,  Correo   , dFechaCaptura TIMESTAMP DEFAULT (datetime('now','localtime'))))");
              //tx.executeSql("CREATE TABLE IF NOT EXISTS ctl_Personal (id INTEGER PRIMARY KEY AUTOINCREMENT  ,RFC unique, Nombre , Correo , dFechaCaptura TIMESTAMP DEFAULT (datetime('now','localtime'))))");
         //});
      

    try{
      db.transaction(function (tx) {              
        tx.executeSql("CREATE TABLE IF NOT EXISTS ALM_Movimiento (id INTEGER PRIMARY KEY AUTOINCREMENT,  IdUmedica, AEjercicio ,IdMotivo ,FolioMovimiento , TipoES ,Fecha DATETIME, RFCProveedor  ,Observaciones, IdPersonalR  , estatus  ,Pedido , dFechaCaptura TIMESTAMP DEFAULT (datetime('now','localtime')))");
      });   
    } catch(e) {
      alert("Error processing SQL: "+ e.message);
    }


    try{
      db.transaction(function (tx) {              
        tx.executeSql("CREATE TABLE IF NOT EXISTS ALM_MovimientoDet (id INTEGER PRIMARY KEY AUTOINCREMENT, idmovimiento INTEGER, IdProducto, ClaveOficialProducto, IdPresentacion, codigo_barras, TipoMI,Lote ,FechaCaducidad, Cantidad, idFuente, idClasificador, idPrograma, idComponente, idPartida,  idUbicacionFisica, Costo, IVA, IVAP , Observaciones , dFechaCaptura TIMESTAMP DEFAULT (datetime('now','localtime')))");
      });   
    } catch(e) {
      alert("Error processing SQL: "+ e.message);

    }

    try{
      db.transaction(function (tx) {              
        tx.executeSql("CREATE TABLE IF NOT EXISTS alm_FacturasProveedorDet_ADDENDA (id INTEGER PRIMARY KEY AUTOINCREMENT, idFacturasProveedorDet_ADDENDA ,  idFacturaProveedor ,  Lote ,FechaCaducidad , Cantidad  ,codigo_barras ,precio ,ClaveOficialSSA ,ClavePresentacionSSA ,cVerificado, dFechaCaptura TIMESTAMP DEFAULT (datetime('now','localtime')))");
      });   
    } catch(e) {
      alert("Error processing SQL: "+ e.message);

    }

    try{
      db.transaction(function (tx) {              
        tx.executeSql("CREATE TABLE IF NOT EXISTS alm_FacturasProveedorDet_FacturaElectronia (id INTEGER PRIMARY KEY AUTOINCREMENT, idFacturaProveedor ,idFacturaProveedordet_fe ,Descripcion ,Unidad ,ClaveUnidad ,Cantidad ,ClaveProdServ ,Importe ,ValorUnitario ,NoIdentificacion  ,cVerificado, dFechaCaptura TIMESTAMP DEFAULT (datetime('now','localtime')))");
      });           
    } catch(e) {
      alert("Error processing SQL: "+ e.message);

    }


    try{
      db.transaction(function (tx) {              
        tx.executeSql("CREATE TABLE IF NOT EXISTS alm_FacturasProveedor (id INTEGER PRIMARY KEY AUTOINCREMENT, idFacturaProveedor ,Folio,IdProveedor ,fecha ,observaciones  ,Estatus ,cXMl ,UUID ,RFC ,serie ,RFCReceptor ,Total ,cVerificada, dFechaCaptura TIMESTAMP DEFAULT (datetime('now','localtime')))");      
      });           
    } catch(e) {
      alert("Error processing SQL: "+ e.message);

    }




    try{
      db.transaction(function (tx) {              
        tx.executeSql("CREATE TABLE IF NOT EXISTS ctl_Presentaciones (id INTEGER PRIMARY KEY AUTOINCREMENT, idPresentacion unique, Descripcion , dFechaCaptura TIMESTAMP DEFAULT (datetime('now','localtime')))");
      });   
    } catch(e) {
      alert("Error processing SQL: "+ e.message);

    }

    try{
      db.transaction(function (tx) {              
        tx.executeSql("CREATE TABLE IF NOT EXISTS ctl_Productos (id INTEGER PRIMARY KEY AUTOINCREMENT, idClaveOficial unique, Descripcion  ,  TipoMI  ,idPartida ,ManejaLotes, IVAP , dFechaCaptura TIMESTAMP DEFAULT (datetime('now','localtime')))");
      });   
    } catch(e) {
      alert("Error processing SQL: "+ e.message);
    }


    try{
      db.transaction(function (tx) {              
        tx.executeSql("CREATE TABLE IF NOT EXISTS ctl_CodigosdeBarras (id INTEGER PRIMARY KEY AUTOINCREMENT,CodigoBarras unique, idClaveOficial  ,  idPresentacion  , Descripcion , dFechaCaptura TIMESTAMP DEFAULT (datetime('now','localtime')))");
      });   
    } catch(e) {
      alert("Error processing SQL: "+ e.message);

    }

    try{
      db.transaction(function (tx) {              
         tx.executeSql("CREATE TABLE IF NOT EXISTS ctl_Proveedores (id INTEGER PRIMARY KEY AUTOINCREMENT ,RFC , Nombre , ApellidoPaterno ,ApellidoMaterno,  Correo   , dFechaCaptura TIMESTAMP DEFAULT (datetime('now','localtime')))");
      });   
    } catch(e) {
      alert("Error processing SQL: "+ e.message);

    }

    try{
      db.transaction(function (tx) {              
           tx.executeSql("CREATE TABLE IF NOT EXISTS ctl_Personal (id INTEGER PRIMARY KEY AUTOINCREMENT  ,RFC , Nombre , Correo , dFechaCaptura TIMESTAMP DEFAULT (datetime('now','localtime')))");
      });   
    } catch(e) {
      alert("Error processing SQL: "+ e.message);

    }

    try{
      db.transaction(function (tx) {              
         tx.executeSql("CREATE TABLE IF NOT EXISTS ctl_Configuracion (id INTEGER PRIMARY KEY AUTOINCREMENT ,Servidor , dFechaCaptura TIMESTAMP DEFAULT (datetime('now','localtime')))");
      });   
    } catch(e) {
      alert("Error processing SQL: "+ e.message);

    }


// CREATE TABLE IF NOT EXISTS ctl_Presentaciones (id INTEGER PRIMARY KEY AUTOINCREMENT, idPresentacion unique, Descripcion , dFechaCaptura TIMESTAMP DEFAULT (datetime('now','localtime')))          
// CREATE TABLE IF NOT EXISTS ctl_Productos (id INTEGER PRIMARY KEY AUTOINCREMENT, idClaveOficial unique, Descripcion  ,  TipoMI  ,idPartida ,ManejaLotes, IVAP , dFechaCaptura TIMESTAMP DEFAULT (datetime('now','localtime')))             
// CREATE TABLE IF NOT EXISTS ctl_CodigosdeBarras (id INTEGER PRIMARY KEY AUTOINCREMENT,CodigoBarras unique, idClaveOficial  ,  idPresentacion  , Descripcion , dFechaCaptura TIMESTAMP DEFAULT (datetime('now','localtime')))           
// CREATE TABLE IF NOT EXISTS ctl_Proveedores (id INTEGER PRIMARY KEY AUTOINCREMENT ,RFC , Nombre , ApellidoPaterno ,ApellidoMaterno,  Correo   , dFechaCaptura TIMESTAMP DEFAULT (datetime('now','localtime')))
// CREATE TABLE IF NOT EXISTS ctl_Personal (id INTEGER PRIMARY KEY AUTOINCREMENT  ,RFC , Nombre , Correo , dFechaCaptura TIMESTAMP DEFAULT (datetime('now','localtime')))



  // database.createTable("CREATE TABLE IF NOT EXISTS ALM_Movimiento (id INTEGER PRIMARY KEY AUTOINCREMENT,  IdUmedica, AEjercicio ,IdMotivo ,FolioMovimiento , TipoES ,Fecha, RFCProveedor  ,Observaciones, IdPersonalR  , estatus  , dFechaCaptura TIMESTAMP DEFAULT (datetime('now','localtime')))");
  // database.createTable("CREATE TABLE IF NOT EXISTS ALM_MovimientoDet (id INTEGER PRIMARY KEY AUTOINCREMENT, idmovimiento, IdProducto, ClaveOficialProducto, IdPresentacion, codigo_barras, TipoMI,Lote ,FechaCaducidad, Cantidad, idFuente, idClasificador, idPrograma, idComponente, idPartida,  idUbicacionFisica, Costo, IVA, IVAP , Observaciones , dFechaCaptura TIMESTAMP DEFAULT (datetime('now','localtime'))))");
  // database.createTable("CREATE TABLE IF NOT EXISTS ctl_Presentaciones (id INTEGER PRIMARY KEY AUTOINCREMENT, idPresentacion unique, Descripcion , dFechaCaptura TIMESTAMP DEFAULT (datetime('now','localtime'))))");
  // database.createTable("CREATE TABLE IF NOT EXISTS ctl_Productos (id INTEGER PRIMARY KEY AUTOINCREMENT, idClaveOficial unique, Descripcion  TEXT NOT NULL DEFAULT "" ,  TipoMI  , IVAP , dFechaCaptura TIMESTAMP DEFAULT (datetime('now','localtime'))))");
  // database.createTable("CREATE TABLE IF NOT EXISTS ctl_CodigosdeBarras (id INTEGER PRIMARY KEY AUTOINCREMENT,CodigoBarras unique, idClaveOficial  ,  idPresentacion  , Descripcion , dFechaCaptura TIMESTAMP DEFAULT (datetime('now','localtime'))))");
  // database.createTable("CREATE TABLE IF NOT EXISTS ctl_Proveedores (id INTEGER PRIMARY KEY AUTOINCREMENT ,RFC unique, Nombre , ApellodoPaterno ,Apellido Materno,  Correo   , dFechaCaptura TIMESTAMP DEFAULT (datetime('now','localtime'))))");
  // database.createTable("CREATE TABLE IF NOT EXISTS ctl_Personal (id INTEGER PRIMARY KEY AUTOINCREMENT  ,RFC unique, Nombre , Correo , dFechaCaptura TIMESTAMP DEFAULT (datetime('now','localtime'))))");


   console.log('Creando base de datos fin');    




  // function fnCargarPresentaciones(){
  //   var vlstr="";
  //   var objPresentaciones2 =localStorage.getItem("objPresentaciones");  
  //   if  (! objPresentaciones2 ){
  //     var objLista;
  //     var ListRef = appFB.database().ref('Presentaciones');     
  //     ListRef.once('value').then(function(snapshotList) {
  //         if (snapshotList ){
  //           vlstr =" [";
  //         snapshotList.forEach(function(snapshotItem ) {
  //             var childKey = snapshotItem.key;
  //             //console.log(childKey);              
  //             var childData = snapshotItem.val();
  //             if (childData){
  //               vlstr = vlstr +' {';
  //               vlstr = vlstr +'  "value":"'+ childData.Descripcion+ ', ' +childData.IDPresentacion + '",';
  //               vlstr = vlstr +'  "IDPresentacion":"'+ childData.IDPresentacion + '" ,';
  //               vlstr = vlstr +'  "KEY":"'+ childKey + '", ';
  //               vlstr = vlstr +'  "Descripcion":"'+ childData.Descripcion + '"';                
  //               vlstr = vlstr +' },';                  
  //             }
  //         });       
  //         vlstr = vlstr.slice(0,-1);    
  //         vlstr = vlstr +']'; 
  //         //console.log(vlstr);
  //         //objLista = JSON.parse(vlstr);                                   
  //         //console.log (objLista);
  //         localStorage.setItem("objPresentaciones", vlstr);
  //       }
  //     });   
  //   }
  // }



  function fnCargarProveedores(){
    var vlstr="";
    var objProveedores2 =localStorage.getItem("objProveedores");  
     if  (! objProveedores2 ){    
      try{    
          db.transaction(function (tx) {  
          var vlsql=  "SELECT * FROM ctl_Proveedores ORDER BY   Nombre  "
          console.log(vlsql);
          try{
            tx.executeSql(vlsql, [] , function (tx, results) {
              var len = results.rows.length, i;
              console.log( len);
              if (len >0) {
                vlstr =" [";

                for (i = 0; i < len; i++) {
                  vlstr = vlstr +' {';
                  vlstr = vlstr +'  "value":"'+ results.rows.item(i).Nombre+ ', ' +results.rows.item(i).RFC + '",';
                  vlstr = vlstr +'  "RFC":"'+  results.rows.item(i).RFC  + '" ,';
                  vlstr = vlstr +'  "KEY":"'+  results.rows.item(i).RFC  + '", ';
                  vlstr = vlstr +'  "Nombre":"'+ results.rows.item(i).Nombre + '"';                
                  vlstr = vlstr +' },';                  
                }
         
                vlstr = vlstr.slice(0,-1);    
                vlstr = vlstr +']'; 
                console.log (vlstr);
                localStorage.setItem("objProveedores", vlstr);
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


  function fnCargarPresentaciones(){
    var vlstr="";
    var objPresentaciones2 =localStorage.getItem("objPresentaciones");  
    if  (! objPresentaciones2 ){    
      try{    
          db.transaction(function (tx) {  
          var vlsql=  "SELECT * FROM ctl_Presentaciones ORDER BY   Descripcion  "
          console.log(vlsql);
          try{
            tx.executeSql(vlsql, [] , function (tx, results) {
              var len = results.rows.length, i;
              console.log( len);
              if (len >0) {
                vlstr =" [";
                console.log("Presentaciones encontrada");
                for (i = 0; i < len; i++) {
                  vlstr = vlstr +' {';
                  vlstr = vlstr +'  "value":"'+ results.rows.item(i).Descripcion+ ', ' +results.rows.item(i).idPresentacion + '",';
                  vlstr = vlstr +'  "IDPresentacion":"'+  results.rows.item(i).idPresentacion  + '" ,';
                  vlstr = vlstr +'  "KEY":"'+  results.rows.item(i).idPresentacion  + '", ';
                  vlstr = vlstr +'  "Descripcion":"'+ results.rows.item(i).Descripcion + '"';                
                  vlstr = vlstr +' },';                  
                }
         
                vlstr = vlstr.slice(0,-1);    
                vlstr = vlstr +']'; 

                localStorage.setItem("objPresentaciones", vlstr);
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


  function fnCargarProductos(){
    var vlstr="";
    var objPresentaciones2 =localStorage.getItem("objProdcutos");  
    if  (! objPresentaciones2 ){    
      try{    
          db.transaction(function (tx) {  
          var vlsql=  "SELECT * FROM ctl_Productos ORDER BY   Descripcion  "
          console.log(vlsql);
          try{
            tx.executeSql(vlsql, [] , function (tx, results) {
              var len = results.rows.length, i;
              console.log( len);
              if (len >0) {
                vlstr =" [";
                for (i = 0; i < len; i++) {
                  vlstr = vlstr +' {';
                  vlstr = vlstr +'  "value":"'+ results.rows.item(i).Descripcion+ ', ' +results.rows.item(i).idClaveOficial + '",';
                  vlstr = vlstr +'  "ClaveOficial":"'+  results.rows.item(i).idClaveOficial  + '" ,';
                  vlstr = vlstr +'  "KEY":"'+  results.rows.item(i).idClaveOficial  + '", ';
                  vlstr = vlstr +'  "Descripcion":"'+ results.rows.item(i).Descripcion + '"';                
                  vlstr = vlstr +' },';                  
                }
         
                vlstr = vlstr.slice(0,-1);    
                vlstr = vlstr +']'; 

                localStorage.setItem("objProductos", vlstr);
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


  function fnCargarCodigosdeBarras(){
    var vlstr="";
    var objPresentaciones2 =localStorage.getItem("objCodigosdeBarras");  
    if  (! objPresentaciones2 ){    
      try{    
          db.transaction(function (tx) {  
          var vlsql=  "SELECT * FROM ctl_CodigosdeBarras ORDER BY   Descripcion  "
          console.log(vlsql);
          try{
            tx.executeSql(vlsql, [] , function (tx, results) {
              var len = results.rows.length, i;
              console.log( len);
              if (len >0) {
                vlstr =" [";
                for (i = 0; i < len; i++) {
                  vlstr = vlstr +' {';
                  vlstr = vlstr +'  "value":"'+ results.rows.item(i).Descripcion+ ', ' +results.rows.item(i).CodigoBarras + '",';
                  vlstr = vlstr +'  "ClaveOficial":"'+  results.rows.item(i).idClaveOficial  + '" ,';
                  vlstr = vlstr +'  "idPresentacion":"'+  results.rows.item(i).idPresentacion  + '" ,';                  
                  vlstr = vlstr +'  "KEY":"'+  results.rows.item(i).CodigoBarras  + '", ';
                  vlstr = vlstr +'  "Descripcion":"'+ results.rows.item(i).Descripcion + '"';                
                  vlstr = vlstr +' },';                  
                }
         
                vlstr = vlstr.slice(0,-1);    
                vlstr = vlstr +']'; 

                localStorage.setItem("objCodigosdeBarras", vlstr);
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