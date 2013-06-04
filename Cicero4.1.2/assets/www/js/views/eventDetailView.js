define(["zepto", "underscore", "backbone", "handlebars","text!templates/eventDetailView.html"],
    function ($, _, Backbone, Handlebars,template) {

    var eventDetailView = Backbone.View.extend({

        template: Handlebars.compile(template),

        initialize: function () {
        },

        render: function (eventName) {
        }
      });

    return eventDetailView;

  });