define(["zepto", "underscore", "backbone", "models/Event","backfire"],
    function ($, _, Backbone, Event,Backfire) {

    var Events = Backbone.Firebase.Collection.extend({
        model: Event,
        firebase: new Firebase("https://cicero.firebaseio.com"),

      });

    return Events;

  });