define(["zepto", "underscore", "backbone", "handlebars","text!templates/loginView.html"],
    function ($, _, Backbone, Handlebars,template) {

    var loginView = Backbone.View.extend({
        
        events: {
            "touchend #register" : "showRegistration",
            "touchend #guest" : "showMap"
          },
          
        template: Handlebars.compile(template),

        initialize: function () {
            this.render();
        },

        showRegistration: function () {
            Backbone.history.navigate("register", {trigger: true});
        },
        showMap: function () {
            Backbone.history.navigate("map", {trigger: true});
        },  
        render: function (eventName) {
            $(this.el).empty();
            $(this.el).html(this.template());
            return this;
        }
      });

    return loginView;

  });