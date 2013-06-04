define(["zepto", "underscore", "backbone", "handlebars","text!templates/registerView.html"],
    function ($, _, Backbone, Handlebars,template) {

    var registerView = Backbone.View.extend({

        template: Handlebars.compile(template),

        initialize: function () {
        },

        render: function (eventName) {
        }
      });

    return registerView;

  });