define(["zepto", "underscore", "backbone", "models/Like","backfire"],
    function ($,_,Backbone,Like,Backfire) {

    var Likes = Backbone.Firebase.Collection.extend({
        model: Like,
        firebase: new Firebase("https://cicero.firebaseio.com/likes"),
        getLikes: function(user, id, type){
                for(i=0; i<this.length; i++){
                    if(this.at(i).get("user") == user && this.at(i).get("id_ref") == id && this.at(i).get("type") == type)
                        return this.at(i).get("id");
                }
                return -1;
        },
        getNumLikes: function(id, type){
            var num = 0;
            for(i=0; i<this.length; i++){
                if(this.at(i).get("id_ref") == id && this.at(i).get("type") == type)
                    num++;
            }
            return num;
        }
      });

    return Likes;

  });