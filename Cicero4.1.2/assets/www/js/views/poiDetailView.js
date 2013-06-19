define(["zepto", "underscore", "backbone", "handlebars","text!templates/poiDetailView.html"],
    function ($, _, Backbone, Handlebars,template) {

    var poiDetailView = Backbone.View.extend({

        template: Handlebars.compile(template),

        initialize: function (poi) {
            this.poi = poi;
            this.render();
        },

        render: function (eventName) {
            $(this.el).html(this.template(this.poi.toJSON()));
            return this;
        }
      });

    return poiDetailView;

  });