define(["zepto", "underscore", "backbone", "handlebars","text!templates/howToReachUsView.html"],
    function ($, _, Backbone, Handlebars,template) {

    var howToReachUsView = Backbone.View.extend({

        template: Handlebars.compile(template),

        initialize: function () {
        },

        render: function (eventName) {
        }
      });

    return howToReachUsView;

  });