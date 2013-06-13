define(["zepto", "underscore", "backbone", "models/Favourite","backfire"],
    function ($, _,Backbone,Favourite,Backfire) {

    var Favourites = Backbone.Firebase.Collection.extend({
        model: Favourite,
        firebase: new Firebase("https://cicero.firebaseio.com/favourites"),
      });

    return Favourites;

  });