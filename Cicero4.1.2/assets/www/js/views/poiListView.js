define(["zepto", "underscore", "backbone", "handlebars","text!templates/poiListView.html"],
    function ($, _, Backbone, Handlebars,template) {

    var poiListView = Backbone.View.extend({

        template: Handlebars.compile(template),

        initialize: function () {
        },

        render: function (eventName) {
        }
      });

    return poiListView;

  });