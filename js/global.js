/*Alertas*/
/***
 * Muestra Notificaciones en la esquina superior derecha de la pantalla
 * @param msg mensaje a mostrar
 * @param type tipo de mensaje
 * @param sticky indica si el mensaje que quedara hasta que el usuario lo cierre (true) o se eliminara despues de cierto tiempo (false)
 */
function notice(msg, type, sticky) {
  if (sticky == null) {
    sticky = false;
  }

  var img = '';
  var title = '';
  switch (type) {
    case 'success':
      title = "Operacion exitosa";
      img = '../app/images/success.png';
      msg = msg || "éxito";
      break;
    case 'error':
      title = "Error";
      img = '../app/images/error.png';
      msg = msg || "Error";
      break;

    case 'alert':
      title = "Alerta";
      img = '../app/images/warning.png';
      msg = msg || "Aviso";
      break;

    case 'session':
      title = "Sesion caducada";
      img = '../app/images/session.png';
      break;

    case 'info':
      title = "Aviso";
      img = '../app/images/info.png';
      break;

    case 'permiso':
      title = "Permiso denegado";
      img = '../app/images/warning.png';
      break;
  }

  $.gritter.add({
    title: '' + title,
    text: '' + msg,
    image: '' + img,
    sticky: sticky,
    time: 7000
  });
}

/* Exportar a excel*/
function generateexcel(tableid) {
  var table = document.getElementById(tableid);
  var html = table.outerHTML;

  //add more symbols if needed...
  while (html.indexOf('á') != -1) html = html.replace('á', '&aacute;');
  while (html.indexOf('é') != -1) html = html.replace('é', '&eacute;');
  while (html.indexOf('í') != -1) html = html.replace('í', '&iacute;');
  while (html.indexOf('ó') != -1) html = html.replace('ó', '&oacute;');
  while (html.indexOf('ú') != -1) html = html.replace('ú', '&uacute;');
  while (html.indexOf('º') != -1) html = html.replace('º', '&ordm;');

  window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));
}
/**
 * Reemplaza el texto especificado dentro de una cadena por otro
 * @param txt texto donde se buscara los caracteres a reemplazar
 * @param replace texto a remplazar
 * @param with_this con que texto se a a reemplazar
 * @returns {XML|string|*|void}
 */
function replaceAll(txt, replace, with_this) {
  return txt.replace(new RegExp(replace, 'g'), with_this);
}

String.prototype.replaceAll = function (replace, with_this) {
  return replaceAll(this, replace, with_this);
};
/**
 * Formatea un texto a formato moneda
 * @param number numero a formatear
 * @param dp digitos decimales
 * @param ts separador de miles
 * @returns {boolean}
 */
function formatCurrency(number, dp, ts) {
  ts = ts || ','; //thousands separator
  if (typeof(number) == 'String') {
    number = number.replaceAll(ts, '');
  }
  dp = isNaN(dp) ? 2 : parseInt(dp, 10); //default 2 decimal point

  var num = parseFloat(number); //convert to float
  var pw; //for IE

  return num != number ? false : //return false for NaN
    ( ( 0.9 ).toFixed(0) == '1' ? //for cater IE toFixed bug
      num.toFixed(dp) : //format to fix n decimal point with round up
      ( Math.round(num * ( pw = Math.pow(10, dp) || 1 )) / pw ).toFixed(dp) //for fix ie toFixed bug on round up value like 0.9 in toFixed
    ).replace(/^(-?\d{1,3})((\d{3})*)(\.\d+)?$/, function (all, first, subsequence, dmp, dec) { //separate string into different parts
        return ( first || '' ) + subsequence.replace(/(\d{3})/g, ts + '$1') + ( dec || '' ); //add thousands seperator and re-join all parts
      });
}
/**
 * Identifica si la variable especificada esta declarada y definida
 * @param variable
 * @returns {boolean}
 */
isDefined = function (variable) {
  return typeof window[variable] == "undefined" ? !1 : !0
};
/**
 * Valida si un caracter es alfanumerico
 * @param n
 * @returns {boolean}
 */
isAlpha = function (n) {
  var t = document.all ? n.keyCode : n.which, i;
  return t == 0 || t == 8 ? !0 : (t = String.fromCharCode(t), i = /^[Ã±Ã‘A-Za-z0-9@_\-.\s]*$/, i.test(t))
};
/**
 * Valida si un caracter es alfabetico
 * @param n
 */
isAlphabetic = function (n) {
  var t, i;
  return t = document.all ? n.keyCode : n.which, i = String.fromCharCode(t), !/[^Ã±Ã‘a-zA-Z]/.test(i)
};
/**
 * valida si un caracter es numerico
 * @param n
 * @returns {boolean}
 */
isInteger = function (n) {
  var t = document.all ? n.keyCode : n.which, i, r;
  return t == 8 || t == 0 ? !0 : (i = /\d/, r = String.fromCharCode(t), i.test(r))
};
/**
 * Valida si un campo es decimal
 * @param n evento que indica el caracter a validar
 * @param t objeto dom que obtiene el texto a validar si corresponde a un decimal
 * @returns {boolean}
 */
isDecimal = function (n, t) {
  var i = document.all ? n.keyCode : n.which, u = t.value, r = u.indexOf("."), f, e;
  return i == 0 || i == 8 ? !0 : i == 46 && r != -1 ? !1 : r != -1 && (f = r + 2, f == u.length - 1) ? !1 : (i = String.fromCharCode(i), e = /^[0-9.]*$/, e.test(i) ? !0 : !1)
};
/**
 * Valida si el caracter es valido para introducir en un correo
 * @param n objeto del evento keypress
 * @returns {boolean}
 */
isEmail = function (n) {
  var t = document.all ? n.keyCode : n.which, i;
  return t == 0 || t == 8 ? !0 : (t = String.fromCharCode(t), i = /^[A-Za-z0-9@_\-.]*$/, i.test(t) ? !0 : !1)
};
/**
 * valida si un texto tiene el formato correcto para un Email
 * @param n objeto DOM que contiene el texto a validar
 */
hasEmailFormat = function (n) {
  var t = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/.test(n.value);
  return t || (n.value = ""), t
};
/***
 * Valida la captura de controles segun la clase que se le aplique
 * .alpha valida caracteres alfanumericos (A-Z a-z 0-9)
 * .alphabetic valida caracteres alfabetioos (A-Z a-z)
 * .integer valida caracteres numericos (0-9)
 * .decimal valida caracteres decimales (solo numeros y 1 punto decimal)
 * .email valida que solo se puede introducir caracteres validos para un email (a-z A-Z 0-9 _-.@)
 * Ademas agrega una validacion a todos los campos textarea para que funcione correctamente el atributo maxlength
 */
validarCapturaCampos = function () {

  $(document).on("keypress", ".alpha", function (n) {
    return isAlpha(n)
  });
  $(document).on("keypress", ".alphabetic", function (n) {
    return isAlphabetic(n)
  });
  $(document).on("keypress", ".integer", function (n) {
    return isInteger(n)
  });
  $(document).on("change", ".integer", function () {
    isNaN($(this).val()) && $(this).val("")
  });
  $(document).on("keypress", ".decimal", function (n) {
    return isDecimal(n, this)
  });
  $(document).on("change", ".decimal", function () {
    isNaN($(this).val()) && $(this).val("")
  });
  $(document).on("keypress", ".email", function (n) {
    return isEmail(n)
  });

  $(document).off("keyup blur", "textarea[maxlength]").on("keyup blur", "textarea[maxlength]", function () {
    var n = $(this).attr("maxlength"), t = $(this).val();
    t.length > n && $(this).val(t.slice(0, n))
  })
};

/**
 * Indica si el elemento Jquery esta visible
 * @returns {*|jQuery|boolean}
 */
$.fn.isVisible = function () {
  return ($(this).is(':visible') && $(this).parents(':hidden').length == 0);
};

/**
 * Habilita o deshabilita un control kendo o un control jquery
 * @param habilita
 * @returns {*|jQuery|HTMLElement}
 */
$.fn.habilitar = function (habilita) {
  if (habilita === undefined) {
    habilita = true;
  }
  if ($(this).is('a')) {
    if (habilita) {
      $(this).removeClass('disabled');
      $(this).removeAttr('disabled');
    } else {
      $(this).addClass('disabled');
      $(this).attr('disabled','disabled');
    }
  } else {
    var kendoControls = ['kendoDropDownList', 'kendoComboBox', 'kendoNumericTextBox', 'kendoDatePicker', 'kendoMultiSelect'];
    var isKendo = false;
    for (var i = 0; i < kendoControls.length && !isKendo; i++) {
      var ctrl = kendoControls[i];
      if ($(this).data(ctrl)) {
        $(this).data(ctrl).enable(habilita);
        isKendo = true;
      }
    }
    if ($(this).data('typeahead')){
      $(this).parent().find('.typeahead-clean').habilitar(habilita);
    }

    if (!isKendo) {
      $(this).each(function () {
        if (habilita) {
          $(this).removeAttr('disabled');
        } else {
          $(this).attr('disabled', 'disabled');
        }
      });
    }
    //if ($(this).data('kendoDropDownList')) {
    //    $(this).data('kendoDropDownList').enable(habilita);
    //} else if ($(this).data('kendoComboBox')) {
    //    $(this).data('kendoComboBox').enable(habilita);
    //} else if ($(this).data('kendoNumericTextBox')) {
    //    $(this).data('kendoNumericTextBox').enable(habilita);
    //} else if ($(this).data('kendoDatePicker')) {
    //    $(this).data('kendoDatePicker').enable(habilita);
    //} else if ($(this).data('kendoMultiSelect')) {
    //    $(this).data('kendoMultiSelect').enable(habilita);
  }

  return $(this);
};

/**
 * Permite reemplazar los valores de una cadena por los k estan en {}
 * ejemplo:
 *        "Juan {0} {1}".format(["Perez","Garcia"]) //regresa "Juan Perez Garcia"
 * @param values cadena o arreglo de parametros
 * @returns {String}
 */
String.prototype.format = function (values) {
  var pattern = this;
  if (values.push == undefined) {
    values = [values];
  }

  for (var i = 0; i < values.length; i++) {
    var reg = new RegExp("\\{" + i + "\\}", "g");
    pattern = pattern.replace(reg, values[i]);
  }

  return pattern;
};

String.prototype.toLocaleDateString = function () {
  return new Date(this).toLocaleDate().toLocaleDateString();
};

Date.prototype.toLocaleDate = function () {
  var corrida = new Date(this.getTime() + (1000 * 60 * this.getTimezoneOffset()));
  return new Date(corrida.toISOString());
};