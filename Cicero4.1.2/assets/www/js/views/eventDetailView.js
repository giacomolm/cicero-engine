define(["zepto", "underscore", "backbone", "handlebars","text!templates/eventDetailView.html"],
    function ($, _, Backbone, Handlebars,template) {

    var eventDetailView = Backbone.View.extend({

        template: Handlebars.compile(template),

        initialize: function () {
            this.render();
        },

        render: function (eventName) {
            $(this.el).empty();
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        }
      });

    return eventDetailView;

  });