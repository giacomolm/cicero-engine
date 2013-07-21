define(["zepto", "underscore", "backbone", "handlebars","text!templates/commentView.html"],
    function ($, _, Backbone, Handlebars,template) {

    var commentView = Backbone.View.extend({

        template: Handlebars.compile(template),

        initialize: function () {
            
        },

        
        render: function (eventName) {
            $(this.el).empty();
            $(this.el).html(this.template(this.model.toJSON()));
            
            return this;
        }
      });

    return commentView;

  });