define(["zepto", "underscore", "backbone", "handlebars","text!templates/eventDetailView.html"],
    function ($, _, Backbone, Handlebars,template) {

    var eventDetailView = Backbone.View.extend({

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

    return eventDetailView;

  });