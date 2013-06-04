define(["zepto", "underscore", "backbone", "handlebars","text!templates/poiDetailView.html"],
    function ($, _, Backbone, Handlebars,template) {

    var poiDetailView = Backbone.View.extend({

        template: Handlebars.compile(template),

        initialize: function () {
        },

        render: function (eventName) {
        }
      });

    return poiDetailView;

  });