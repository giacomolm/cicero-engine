define(["zepto", "underscore", "backbone", "handlebars","text!templates/eventListView.html"],
    function ($, _, Backbone, Handlebars,template) {

    var eventListView = Backbone.View.extend({

        template: Handlebars.compile(template),

        initialize: function () {
        },

        render: function (eventName) {
        }
      });

    return eventListView;

  });