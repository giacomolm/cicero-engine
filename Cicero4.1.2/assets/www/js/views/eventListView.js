define(["zepto", "underscore", "backbone", "handlebars","views/eventListItemView","text!templates/eventListView.html"],
    function ($, _, Backbone, Handlebars, eventListItemView, template) {

    var eventListView = Backbone.View.extend({

        tagName : "ul",
        id : "eventListView",
        className : "invisible",
        
        template: Handlebars.compile(template),

        initialize: function () {
            this.collection.firebase.on("value",this.render,this);
        },
        
        setFilteredCollection: function(filtered){
            this.collection = filtered;
            this.render();
        },
        render: function (eventName) {
            $(this.el).html(this.template());
            
            for(i=0;i<this.collection.length;i++){
                event = this.collection.at(i);
                $(this.el).append(new eventListItemView({
                    model : event
                  }).render().el);
            }
            return this;
        }
      });

    return eventListView;

  });