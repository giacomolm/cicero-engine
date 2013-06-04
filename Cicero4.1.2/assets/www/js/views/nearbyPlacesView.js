define(["zepto", "underscore", "backbone", "handlebars","text!templates/nearbyPlacesView.html"],
    function ($, _, Backbone, Handlebars,template) {

    var nearbyPlacesView = Backbone.View.extend({

        template: Handlebars.compile(template),

        initialize: function () {
        },

        render: function (eventName) {
        }
      });

    return nearbyPlacesView;

  });