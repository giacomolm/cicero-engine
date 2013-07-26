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
                this.ellipsed = true;

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
                if(this.ellipsed){
                    $('#news'+this.model.id).html(this.model.get("message"));
                    this.ellipsed = false;
                }else{
                    $('#news'+this.model.id).html(this.truncated_message);
                    this.ellipsed = true;
                }
            },

            render: function () {
                $(this.el).empty();
                this.truncated_message = this.truncate(this.model.get("message"));
                $(this.el).html(this.template({model: this.model.toJSON(),truncated_message: this.truncated_message}));
                return this;
            },

            truncate: function(string){
                if (string.length > 200)
                    return string.substring(0,200)+'...';
                else
                    return string;
            },

            delView: function(){
                this.remove();
            }
        });

        return newssListItemView;

    });