define(["zepto", "underscore", "backbone", "models/Favourite","backfire"],
    function ($, _,Backbone,Favourite,Backfire) {

    var Favourites = Backbone.Firebase.Collection.extend({
        model: Favourite,
        firebase: new Firebase("https://cicero.firebaseio.com/favourites"),
        
        includesCid: function(user, id){
            for(i=0; i<this.length; i++){
                if(this.at(i).get("user") == user && this.at(i).get("id_ref") == id)
                    return this.at(i).get("id");
            }
            
            return -1;
        }
      });

    return Favourites;

  });