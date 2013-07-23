define(["zepto", "underscore", "backbone", "handlebars","eventDispatcher","models/News","collections/Newss","views/newssListItemView","text!templates/newssListView.html"],
    function ($, _, Backbone, Handlebars,EventDispatcher,News,Newss,NewssListItemView,template) {

        var newssListView = Backbone.View.extend({

            tagName : "ul",
            id : "newsListView",

            template: Handlebars.compile(template),

            initialize: function () {
                EventDispatcher.trigger("changeTitle","News");
                this.newss = new Newss();
                this.render();
                EventDispatcher.trigger("show_spinner");
                this.newss.firebase.once("value",this.addNewss,this);
            },

            addNewss: function(){
                 for(i=0;i<this.newss.length;i++){
                     var news = this.newss.at(i);
                     $(this.el).append(new NewssListItemView({
                         model: news
                     }).el);
                     EventDispatcher.trigger("hide_spinner");
                 }
            },

            render: function () {
                $(this.el).empty();
                $(this.el).html(this.template());
                return this;
            }
        });

        return newssListView;

    });