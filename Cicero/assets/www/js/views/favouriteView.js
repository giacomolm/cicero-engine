define(["zepto", "underscore", "backbone", "handlebars","text!templates/favouriteView.html"],
    function ($, _, Backbone, Handlebars,template) {

    var favouriteView = Backbone.View.extend({

        template: Handlebars.compile(template),

        initialize: function () {
        },

        render: function (eventName) {
        }
      });

    return favouriteView;

  });