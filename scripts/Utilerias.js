$(document).ready(function(){


  $('#butInsertarProveedores').click( function() { 
    fnInsertarProveedores();
  }); 


       // INSERT INTO ctl_Proveedores ( RFC, Nombre)  VALUES
       //   (' FAR030114TM7','FARMACIN, S.A. DE C.V.'),
       //   (' HME871204QAO','HERTZO DE MEXICO, S.A. DE C.V.'),
       //   ('AAA 020903H37','ARAGON AVILA Y ASOCIADOS. S.C.'),
       //   ('AABC491017DR3','CARMEN MARIA ARVALLO BARRAZA'),
       //   ('AABR700427UF3','ARAUJO BLEIZEFFER RAMON GUILLERMO'),
       //   ('AABY700818BDR','ALARCON BORBOA YERIK'),
       //   ('AACA651130FC9','AYALA CASTAÑEDA ALBERTO'),
       //   ('AACA670219C52','ALMADA CRISANTES ALEJANDRO DE JESUS'),
       //   ('AACB770321I4A','CAZAREZ BENITO AMADOR'),
       //   ('AADA450521QS7','AYALA DIAZ MARIA DE LOS ANGELES'),
       //   ('AAE 890907F6A','AGRO AUTOMOTRIZ ELECTRICA S.A. DE C.V.'),
       //   ('AAEF780819P93','FRANCISCO JAVIER ARANA ESPARRAGOZA'),
       //   ('AAEJ700312A59','JESUS ANTONIO ARANA ESPARRAGOZA'),
       //   ('AAG 891012220','ARREIN AGUILA, S.A. DE C.V.'),
       //   ('AAGC700505KB7','CAROLINA AMARILLAS GARCIA'),
       //   ('AAGG570425J56','GUILLERMO ALVARADO GUEMEZ'),
       //   ('AAGJ710723RT7','JOSE ALVAREZ GARCIA'),
       //   ('AAGM8011201TA','ALFARO GASTELUM MIRIAM PAOLA'),
       //   ('AAGV600131E96','ALVAREZ GERMAN VIRGINIA')

  function fnInsertarProveedores(){
    try{
      var vlsql ="";
      vlsql+=" INSERT INTO ctl_Proveedores ( RFC, Nombre)  VALUES";
       vlsql+="  (' FAR030114TM7','FARMACIN, S.A. DE C.V.'),";
       vlsql+="  (' HME871204QAO','HERTZO DE MEXICO, S.A. DE C.V.'),";
       vlsql+="  ('AAA 020903H37','ARAGON AVILA Y ASOCIADOS. S.C.'),";
       vlsql+="  ('AABC491017DR3','CARMEN MARIA ARVALLO BARRAZA'),";
       vlsql+="  ('AABR700427UF3','ARAUJO BLEIZEFFER RAMON GUILLERMO'),";
       vlsql+="  ('AABY700818BDR','ALARCON BORBOA YERIK'),";
       vlsql+="  ('AACA651130FC9','AYALA CASTAÑEDA ALBERTO'),";
       vlsql+="  ('AACA670219C52','ALMADA CRISANTES ALEJANDRO DE JESUS'),";
       vlsql+="  ('AACB770321I4A','CAZAREZ BENITO AMADOR'),";
       vlsql+="  ('AADA450521QS7','AYALA DIAZ MARIA DE LOS ANGELES'),";
       vlsql+="  ('AAE 890907F6A','AGRO AUTOMOTRIZ ELECTRICA S.A. DE C.V.'),";
       vlsql+="  ('AAEF780819P93','FRANCISCO JAVIER ARANA ESPARRAGOZA'),";
       vlsql+="  ('AAEJ700312A59','JESUS ANTONIO ARANA ESPARRAGOZA'),";
       vlsql+="  ('AAG 891012220','ARREIN AGUILA, S.A. DE C.V.'),";
       vlsql+="  ('AAGC700505KB7','CAROLINA AMARILLAS GARCIA'),";
       vlsql+="  ('AAGG570425J56','GUILLERMO ALVARADO GUEMEZ'),";
       vlsql+="  ('AAGJ710723RT7','JOSE ALVAREZ GARCIA'),";
       vlsql+="  ('AAGM8011201TA','ALFARO GASTELUM MIRIAM PAOLA'),";
       vlsql+="  ('AAGV600131E96','ALVAREZ GERMAN VIRGINIA')";
       console.log(vlsql);
       db.transaction(function (tx) {              
       tx.executeSql(vlsql);
      });   
    } catch(e) {
      alert("Error processing SQL: "+ e.message);

    }
  }

  $('#butInsertarPresentaciones').click( function() { 
    fnInsertarPresentaciones();
  }); 




  function fnInsertarPresentaciones(){
    try{
      var vlsql ="";
      vlsql+=" INSERT INTO ctl_Presentaciones ( idPresentacion, Descripcion)  VALUES";
         vlsql+="  ('001','ENVASE CON 30 ML'),";
         vlsql+="  ('002','ENVASE CON 60 ML'),";
         vlsql+="  ('003','ENVASE CON 20 TABLETAS '),";
         vlsql+="  ('004','ENVASE CON 20 GRAGEAS'),";
         vlsql+="  ('005','ENVASE CON 10 COMPRIMIDOS'),";
         vlsql+="  ('006','ENVASE CON 3 AMPOLLETAS DE 2 ML'),";
         vlsql+="  ('007','ENVASE CON 10 TABLETAS'),";
         vlsql+="  ('008','ENVASE CON 3 SUPOSITORIOS'),";
         vlsql+="  ('009','ENVASE CON 6 SUPOSITORIOS'),";
         vlsql+="  ('010','ENVASE CON 10 SUPOSITORIOS'),";
         vlsql+="  ('011','ENVASE CON 15 ML, GOTERO CALIBRADO A 0.5 Y 1 ML, INTEGRADO AL ENVASE QUE SIRVE DE TAPA'),";
         vlsql+="  ('012','ENVASE CON 1 FRASCO CON AMPULA Y DILUYENTE'),";
         vlsql+="  ('013','ENVASE CON 6 AMPOLLETAS DE 1 ML'),";
         vlsql+="  ('014','ENVASE CON 1 FRASCO AMPULA DE 1 ML'),";
         vlsql+="  ('015','ENVASE CON 40 G'),";
         vlsql+="  ('016','ENVASE CON 5 AMPOLLETAS DE 2 ML (50 MG/ML)'),";
         vlsql+="  ('017','ENVASE CON 20 CAPSULAS '),";
         vlsql+="  ('018','ENVASE CON 20 COMPRIMIDOS'),";
         vlsql+="  ('019','ENVASE CON 5 PARCHES'),";
         vlsql+="  ('020','ENVASE CON 14 TABLETAS')";
       console.log(vlsql);
       db.transaction(function (tx) {              
       tx.executeSql(vlsql);
      });   
    } catch(e) {
      alert("Error processing SQL: "+ e.message);
    }
  }

  $('#butInsertarProductos').click( function() { 
    fnInsertarProductos();
  }); 


  function fnInsertarProductos(){
    try{
       var vlsql ="";
       vlsql+=" INSERT INTO ctl_Productos ( idClaveOficial , Descripcion  ,  TipoMI  ,idPartida ,ManejaLotes, IVAP)  VALUES";
       vlsql+="  ('101','ÁCIDO ACETILSALICÍLICO TABLETAS','M','25301','S' ,'0'),";
       vlsql+="  ('103','ACIDO ACETILSALICILICO TABLETA SOLUBLE','M','25301','S' ,'0'),";
       vlsql+="  ('3401','ACIDO ACETILSALICILICO GRAGEA O TABLETA CON CAPA ENTERICA','M','25301','S' ,'0'),";
       vlsql+="  ('108','METAMIZOL SODICO COMPRIMIDO','M','25301','S' ,'0'),";
       vlsql+="  ('109','METAMIZOL SODICO SOLUCION INYECTABLE','M','25301','S' ,'0'),";
       vlsql+="  ('104','PARACETAMOL TABLETA','M','25301','S' ,'0'),";
       vlsql+="  ('105','PARACETAMOL SUPOSITORIO 300MG 3 SUPOSITORIOS','M','25301','S' ,'0'),";
       vlsql+="  ('514','PARACETAMOL SUPOSITORIO','M','25301','S' ,'0'),";
       vlsql+="  ('106','PARACETAMOL SOLUCION ORAL','M','25301','S' ,'0'),";
       vlsql+="  ('4026','BUPRENORFINA SOLUCION INYECTABLE','M','25301','S' ,'0'),";
       vlsql+="  ('2100','BUPRENORFINA TABLETA SUBLINGUAL','M','25301','S' ,'0'),";
       vlsql+="  ('4031','CAPSAICINA CREMA','M','25301','S' ,'0'),";
       vlsql+="  ('4028','CLONIXINATO DE LISINA SOLUCION INYECTABLE','M','25301','S' ,'0'),";
       vlsql+="  ('107','DEXTROPROPOXIFENO CAPSULAS O COMPRIMIDOS','M','25301','S' ,'0'),";
       vlsql+="  ('4027','FENTANILO PARCHE','M','25301','S' ,'0'),";
       vlsql+="  ('2104','MORFINA TABLETA O CAPSULAS DE LIBERACION PROLONGADA','M','25301','S' ,'0'),";
       vlsql+="  ('4029','MORFINA TABLETAS','M','25301','S' ,'0'),";
       vlsql+="  ('2103','MORFINA SOLUCION INYECTABLE','M','25301','S' ,'0'),";
       vlsql+="  ('132','NALBUFINA SOLUCION INYECTABLE','M','25301','S' ,'0')";

       console.log(vlsql);
       db.transaction(function (tx) {              
       tx.executeSql(vlsql);
      });   
    } catch(e) {
      alert("Error processing SQL: "+ e.message);

    }
  }


  $('#butInsertarCodigosdeBarras').click( function() { 
    fnInsertarCodigodeBarras();
  }); 

  function fnInsertarCodigodeBarras(){
    try{
       var vlsql ="";
       vlsql+=" INSERT INTO ctl_CodigosdeBarras ( CodigoBarras ,idClaveOficial ,  idPresentacion  , Descripcion)  VALUES";
       vlsql+="  ('CB1','101','020','ÁCIDO ACETILSALICÍLICO TABLETAS'),";
       vlsql+="  ('CB2','103','020','ACIDO ACETILSALICILICO TABLETA SOLUBLE'),";
       vlsql+="  ('CB3','3401','020','ACIDO ACETILSALICILICO GRAGEA O TABLETA CON CAPA ENTERICA'),";
       vlsql+="  ('CB4','108','020','METAMIZOL SODICO COMPRIMIDO'),";
       vlsql+="  ('CB5','109','020','METAMIZOL SODICO SOLUCION INYECTABLE'),";
       vlsql+="  ('CB6','104','020','PARACETAMOL TABLETA'),";
       vlsql+="  ('CB7','105','020','PARACETAMOL SUPOSITORIO 300MG 3 SUPOSITORIOS'),";
       vlsql+="  ('CB8','514','020','PARACETAMOL SUPOSITORIO'),";
       vlsql+="  ('CB9','106','020','PARACETAMOL SOLUCION ORAL'),";
       vlsql+="  ('CB10','4026','020','BUPRENORFINA SOLUCION INYECTABLE'),";
       vlsql+="  ('CB11','2100','020','BUPRENORFINA TABLETA SUBLINGUAL'),";
       vlsql+="  ('CB12','4031','020','CAPSAICINA CREMA'),";
       vlsql+="  ('CB13','4028','020','CLONIXINATO DE LISINA SOLUCION INYECTABLE'),";
       vlsql+="  ('CB14','107','020','DEXTROPROPOXIFENO CAPSULAS O COMPRIMIDOS'),";
       vlsql+="  ('CB15','4027','020','FENTANILO PARCHE'),";
       vlsql+="  ('CB16','2104','020','MORFINA TABLETA O CAPSULAS DE LIBERACION PROLONGADA'),";
       vlsql+="  ('CB17','4029','020','MORFINA TABLETAS'),";
       vlsql+="  ('CB18','2103','020','MORFINA SOLUCION INYECTABLE'),";
       vlsql+="  ('CB19','132','020','NALBUFINA SOLUCION INYECTABLE')";

       console.log(vlsql);
       db.transaction(function (tx) {              
       tx.executeSql(vlsql);
      });   
    } catch(e) {
      alert("Error processing SQL: "+ e.message);

    }
  }


});

