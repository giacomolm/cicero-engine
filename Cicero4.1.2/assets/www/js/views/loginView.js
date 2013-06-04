define(["zepto", "underscore", "backbone", "handlebars","text!templates/loginView.html"],
    function ($, _, Backbone, Handlebars,template) {

    var loginView = Backbone.View.extend({

        template: Handlebars.compile(template),

        initialize: function () {
        },

        render: function (eventName) {
        }
      });

    return loginView;

  });