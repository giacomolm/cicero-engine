define(["zepto", "underscore", "backbone", "handlebars","text!templates/eventListView.html"],
    function ($, _, Backbone, Handlebars,template) {

    var eventListView = Backbone.View.extend({

        template: Handlebars.compile(template),

        initialize: function () {
            this.render();
        },

        render: function (eventName) {
            $(this.el).empty();
            $(this.el).html(this.template());
            return this;
        }
      });

    return eventListView;

  });