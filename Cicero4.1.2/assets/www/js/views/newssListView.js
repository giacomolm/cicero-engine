define(["zepto", "underscore", "backbone", "handlebars","eventDispatcher","models/News","collections/Newss","views/newssListItemView","text!templates/newssListView.html"],
    function ($, _, Backbone, Handlebars,EventDispatcher,News,Newss,NewssListItemView,template) {

        var newssListView = Backbone.View.extend({

            tagName : "ul",
            id : "newsListView",

            template: Handlebars.compile(template),

            initialize: function () {
                EventDispatcher.trigger("changeTitle","News");
                this.newss = new Newss();
                EventDispatcher.trigger("show_spinner");
                this.on("inTheDom",this.addsubViews);
                this.render();
            },

            render: function () {
                $(this.el).empty();
                $(this.el).html(this.template());

                return this;
            },

            addsubViews: function(){
                this.newss.firebase.on("value",function(){
                    for(i=0;i<this.newss.length;i++){
                        var news = this.newss.at(i);
                        $(this.el).append(new NewssListItemView({
                            model: news,
                            parent: this
                        }).render().el);
                    }
                    this.trigger("parentInTheDom");
                    EventDispatcher.trigger("hide_spinner");
                },this);
            }
        });

        return newssListView;

    });