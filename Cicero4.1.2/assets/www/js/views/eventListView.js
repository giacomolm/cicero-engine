define(["zepto", "underscore", "backbone", "handlebars","views/eventListItemView","text!templates/eventListView.html"],
    function ($, _, Backbone, Handlebars, eventListItemView, template) {

    var eventListView = Backbone.View.extend({

        tagName : "ul",
        id : "eventListView",
        className : "invisible",
        
        template: Handlebars.compile(template),

        initialize: function () {
            if (this.collection instanceof Backbone.Firebase)
                this.collection.firebase.on("value",this.render,this);
            else this.render();
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
                    model : event,
                    favourites : this.options.favourites
                  }).render().el);
            }
            return this;
        }
      });

    return eventListView;

  });