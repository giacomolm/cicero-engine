define(["zepto", "underscore", "backbone", "models/Like","backfire"],
    function ($,_,Backbone,Like,Backfire) {

    var Likes = Backbone.Firebase.Collection.extend({
        model: Like,
        firebase: new Firebase("https://cicero.firebaseio.com"),
      });

    return Likes;

  });