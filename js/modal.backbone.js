var ModalView = Backbone.View.extend({
  initialize : function() {
  },
  tagName : "div",
  className : "modal hide fade",
  events: {
    'click .cancel': 'close',
    'click .confirm': 'confirm'
  },
  render : function() {
    var template = '\
      <div class="modal-header" style="margin-top:50px;">\
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
        <h4>{{title}}</h4>\
      </div>\
      <div class="modal-body">\
        <p>{{message}}</p>\
      </div>\
      <div class="modal-footer">\
        <a href="#" onclick="return false;" class="btn cancel">Cerrar</a>\
        {{#confirm}}<a href="#" onclick="return false;" class="btn btn-danger confirm">Ok</a>{{/confirm}}\
      </div>\
    ';
    var templateValues = {title: this.options.title, message:this.options.message, confirm:this.options.confirm};
    $(this.el).html(Mustache.to_html(template, templateValues));
    $(this.el).modal({backdrop:true});
    return this;
  },
  close: function() {
    this.setOk(false);
    $(this.el).modal('hide');
  },
  confirm: function() {
    this.setOk(true);
    this.options.callback();
  },
  setOk: function(confirm) {
    this.ok = confirm;
  }
});