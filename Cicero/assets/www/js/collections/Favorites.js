define(["zepto", "underscore", "backbone", "models/Favorite","backfire"],
    function ($, _,Backbone,Favorite,Backfire) {

    var Favorites = Backbone.Firebase.Collection.extend({
        model: Favorite,
        firebase: new Firebase("https://cicero.firebaseio.com"),
      });

    return Favorites;

  });