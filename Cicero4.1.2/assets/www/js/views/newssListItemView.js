define(["zepto", "underscore", "backbone", "handlebars","models/News","text!templates/newssListItemView.html"],
    function ($, _, Backbone, Handlebars,News,template) {

        var newssListItemView = Backbone.View.extend({

            events:{
              "click" : "toggleEllipsed"
            },

            template: Handlebars.compile(template),

            initialize: function (options) {
                this.parent = this.options.parent;
                this.model.bind("change",this.render,this);
                this.model.bind("destroy", this.remove, this);

                this.listenTo(this.parent,"parentInTheDom", _.bind(this.addChecked,this));
                this.listenTo(this.parent,"outOfDom", _.bind(this.delView,this));
            },

            addChecked: function(){
                if(localStorage["news"+this.model.id] == 'yes'){
                    $('#seen'+this.model.id).removeClass("invisible");
                }
            },

            toggleEllipsed: function(){
                localStorage.setItem("news"+this.model.id,"yes");
                $('#seen'+this.model.id).removeClass("invisible");
                $('#news'+this.model.id).toggleClass('ellipsed');
            },

            render: function () {
                $(this.el).empty();
                $(this.el).html(this.template(this.model.toJSON()));
                return this;
            },

            delView: function(){
                this.remove();
            }
        });

        return newssListItemView;

    });