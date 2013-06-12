define(["zepto", "underscore", "backbone", "models/Comment","backfire"],
    function ($, _, Backbone, Comment,Backfire) {

    var Comments = Backbone.Firebase.Collection.extend({
        model: Comment,
        firebase: new Firebase("https://cicero.firebaseio.com"),
      });

    return Comments;

  });