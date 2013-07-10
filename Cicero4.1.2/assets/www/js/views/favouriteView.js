define(["zepto", "underscore", "backbone", "handlebars","views/poiListView","collections/Pois","text!templates/favouriteView.html"],
    function ($, _, Backbone, Handlebars,poiListView,Pois,template) {

    var favouriteView = Backbone.View.extend({

        template: Handlebars.compile(template),

        initialize: function () {
            this.favourites = this.options.favourites;
            this.user_id = 0;
            this.render();
        },

        setFavouritesPois: function(pois){               
            
            this.favouritesPois = this.getFavouritesPois(this.favourites,pois);
            this.poilistview = new poiListView({collection:this.favouritesPois, favourites : this.favourites});
            
            $(this.el).append($(this.poilistview.el));
        },
        
        getFavouritesPois: function(favourites,pois){
            var collection =  new Backbone.Collection();
            for(i=0; i<favourites.length; i++){
                  collection.add(pois.get(favourites.at(i).get("id_ref")));
            }
            return collection;
        },
        
        render: function (eventName) {
            $(this.el).empty();
            $(this.el).html(this.template());
            return this;
        }
      });

    return favouriteView;

  });