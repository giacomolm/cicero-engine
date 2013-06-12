define(["zepto", "underscore", "backbone", "handlebars","text!templates/searchView.html"],
    function ($, _, Backbone, Handlebars,template) {

    var searchView = Backbone.View.extend({

        template: Handlebars.compile(template),

        initialize: function () {
        },

        render: function (eventName) {
        }
      });

    return searchView;

  });