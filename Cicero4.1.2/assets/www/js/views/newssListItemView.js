define(["zepto", "underscore", "backbone", "handlebars","models/News","text!templates/newssListItemView.html"],
    function ($, _, Backbone, Handlebars,News,template) {

        var newssListItemView = Backbone.View.extend({

            template: Handlebars.compile(template),

            initialize: function () {
                this.model.bind("change",this.render,this);
                this.model.bind("destroy", this.close, this);
                this.render();
            },

            render: function () {
                $(this.el).empty();
                $(this.el).html(this.template(this.model.toJSON()));
                return this;
            }
        });

        return newssListItemView;

    });