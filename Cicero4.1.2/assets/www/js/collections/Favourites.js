define(["zepto", "underscore", "backbone", "models/Favourite","backfire"],
    function ($, _,Backbone,Favourite,Backfire) {

    var Favourites = Backbone.Firebase.Collection.extend({
        model: Favourite,
        firebase: new Firebase("https://cicero.firebaseio.com/favourites"),
        
        includesCid: function(user, cid){
            for(i=0; i<this.length; i++){
                if(this.at(i).get("user") == user && this.at(i).get("id_ref") == cid)
                    return this.at(i).get("id");
            }
            
            return 0;
        }
      });

    return Favourites;

  });