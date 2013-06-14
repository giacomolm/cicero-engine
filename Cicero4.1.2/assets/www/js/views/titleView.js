define(["zepto", "underscore", "backbone", "handlebars","text!templates/titleView.html"],
    function ($, _, Backbone, Handlebars,template) {

    var titleView = Backbone.View.extend({
        
        tagName: "h1",
        id: "viewTitle",
        
        template: Handlebars.compile(template),

        initialize: function () {
        },

        render: function (eventName) {
            $(this.el).empty();
            $(this.el).html(this.template());
            return this;
        }
      });

    return titleView;

  });