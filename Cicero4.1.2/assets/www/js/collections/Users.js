define(["zepto", "underscore", "backbone", "models/User","backfire"],
    function ($, _,Backbone,User,Backfire) {

    var Users = Backbone.Firebase.Collection.extend({
        model: User,
        firebase: new Firebase("https://cicero.firebaseio.com/users"),
      });

    return Users;

  });