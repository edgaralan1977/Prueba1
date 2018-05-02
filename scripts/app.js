

  var app = {
    isLoading: true,
    spinner: document.querySelector('.loader'),    
    container: document.querySelector('.main'),
    Usuario:"",
    serviceUrl:"http://localhost/testwcf/" 
  };

//serviceUrl:"http://localhost:24706/" 

  var config = {
    apiKey: "AIzaSyADt2_Wv1gkY_3rgALye_asBEy_SYpsy1Y",
    authDomain: "compact-env-179000.firebaseapp.com",
    databaseURL: "https://compact-env-179000.firebaseio.com",    
    projectId: "compact-env-179000",
    storageBucket: "compact-env-179000.appspot.com",
    messagingSenderId: "846827897011"
  };

  var appFB = firebase.initializeApp(config); 

(function() {
  'use strict';



  var vlstr ='';
    vlstr +=' <nav class="navbar navbar-inverse"> ';
    vlstr +='   <div class="container-fluid">  ';
    vlstr +='        <div class="navbar-header"> ';
    vlstr +='            <a class="navbar-brand" href="menu.html"> <span class="glyphicon glyphicon-menu-hamburger"></span> Menu </a>    ';
    vlstr +='            <a class="navbar-brand" href="login.html"><span class="glyphicon glyphicon-user">  ';
    vlstr +='               </span> <label id="lblUsuario"></label></a>  ';
    vlstr +='            <a class="navbar-brand"  href="#" id="butLogOut" > ';
    vlstr +='                <span class="glyphicon glyphicon-log-in"></span> Cerrar Sesion</a>  ';
    vlstr +='            <a class="navbar-brand" href="#" id="butLogIN" >Abrir Sesión  </a>  '; 
    vlstr +='        <div class="collapse navbar-collapse" id="myNavbar"> ';
    vlstr +='   </div> ';
    vlstr +=' </nav> ';

  $(".main").prepend(vlstr);


 
  const btnCerrarSesion = document.getElementById('butLogOut');
  const lblUsuarioActivo = document.getElementById('lblUsuario');
  const btnAbrirSesion = document.getElementById('butLogIN');

  
  appFB.auth().onAuthStateChanged(function(user) {
    if (user) {     
      console.log(user.email);
      // User is signed in.
      lblUsuarioActivo.innerHTML=user.email;
      app.user = user.email;
      btnCerrarSesion.classList.remove("hide");   
      btnAbrirSesion.classList.add("hide");               
      $('#Contenedor').show();  
    } else {
      console.log('Ningun usuario esta logeado');
      // No user is signed in.
      btnCerrarSesion.classList.add("hide");
      btnAbrirSesion.classList.remove("hide");  
      lblUsuarioActivo.innerHTML="";    
      app.user = ""; 
      $('#Contenedor').hide();  
    }
  });

  $('#butLogOut').click( function() { 
  appFB.auth().signOut().then(function() {
    // Sign-out successful.
    btnCerrarSesion.classList.add("hide");
    btnAbrirSesion.classList.remove("hide");      
    location.href ="login.html";
  }).catch(function(error) {
    // An error happened.
    btnCerrarSesion.classList.remove("hide");  
    //btnAbrirSesion.classList.add("hide");     
  });
  }); 

  $('#butLogIN').click( function() {  
   location.href ="login.html";
  }); 

    function Right(str, n){
      if (n <= 0)
         return "";
      else if (n > String(str).length)
         return str;
      else {
         var iLen = String(str).length;
         return String(str).substring(iLen, iLen - n);
      }
  }



  // TODO add service worker code here
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker_waa.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
})();



 function numberFormat(numero){
        // Variable que contendra el resultado final
        var resultado = "";
 
        // Si el numero empieza por el valor "-" (numero negativo)
        if(numero[0]=="-")
        {
            // Cogemos el numero eliminando los posibles puntos que tenga, y sin
            // el signo negativo
            nuevoNumero=numero.replace(/\,/g,'').substring(1);
        }else{
            // Cogemos el numero eliminando los posibles puntos que tenga
            nuevoNumero=numero.replace(/\,/g,'');
        }
 
        // Si tiene decimales, se los quitamos al numero
        if(numero.indexOf(".")>=0)
            nuevoNumero=nuevoNumero.substring(0,nuevoNumero.indexOf("."));
 
        // Ponemos un punto cada 3 caracteres
        for (var j, i = nuevoNumero.length - 1, j = 0; i >= 0; i--, j++)
            resultado = nuevoNumero.charAt(i) + ((j > 0) && (j % 3 == 0)? ",": "") + resultado;
 
        // Si tiene decimales, se lo añadimos al numero una vez forateado con 
        // los separadores de miles
        if(numero.indexOf(".")>=0)
            resultado+=numero.substring(numero.indexOf("."));
 
        if(numero[0]=="-")
        {
            // Devolvemos el valor añadiendo al inicio el signo negativo
            return "-"+resultado;
        }else{
            return resultado;
        }
    }