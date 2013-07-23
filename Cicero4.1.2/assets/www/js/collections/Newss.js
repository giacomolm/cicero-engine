define(["zepto", "underscore", "backbone", "models/News","backfire"],
    function ($,_,Backbone,News,Backfire) {

        var Newss = Backbone.Firebase.Collection.extend({
            model: News,
            firebase: new Firebase("https://cicero.firebaseio.com/newss"),
        });

        return Newss;

    });