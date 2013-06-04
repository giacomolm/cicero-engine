define(["zepto", "underscore", "backbone", "models/Poi","backfire"],
    function ($,_,Backbone,Poi,Backfire) {

    var Pois = Backbone.Firebase.Collection.extend({
        model: Poi,
        firebase: new Firebase("https://cicero.firebaseio.com"),
      });

    return Pois;

  });