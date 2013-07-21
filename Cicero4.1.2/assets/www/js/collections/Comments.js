define(["zepto", "underscore", "backbone", "models/Comment","backfire"],
    function ($, _, Backbone, Comment,Backfire) {

    var Comments = Backbone.Firebase.Collection.extend({
        model: Comment,
        firebase: new Firebase("https://cicero.firebaseio.com/comments"),
        getComments: function(id_ref, type){
            comments = new Backbone.Collection(this.filter(function(comment) {
                
                if(comment.get("id_ref")==id_ref && comment.get("type")==type)
                    return comment;
            }));
            return comments;
        }
      });

    return Comments;

  });