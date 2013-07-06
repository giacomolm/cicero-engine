define(["zepto", "underscore", "backbone", "handlebars","models/Poi","collections/Pois","views/poiListItemView","text!templates/poiListView.html"],
    function ($, _, Backbone, Handlebars,Poi,Pois,poiListItemView, template) {

    var poiListView = Backbone.View.extend({

        tagName : "ul",
        id : "poiListView",
        
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
                poi = this.collection.at(i);
                $(this.el).append(new poiListItemView({
                    model : poi,
                    favourites : this.options.favourites
                  }).render().el);
            }
            
            return this;
        }
      });

    return poiListView;

  });