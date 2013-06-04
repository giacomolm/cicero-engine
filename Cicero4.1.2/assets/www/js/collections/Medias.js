define(["zepto", "underscore", "backbone", "models/Media","backfire"],
    function ($,_,Backbone,Media,Backfire) {

    var Medias = Backbone.Firebase.Collection.extend({
        model: Media,
        firebase: new Firebase("https://cicero.firebaseio.com"),
      });

    return Medias;

  });