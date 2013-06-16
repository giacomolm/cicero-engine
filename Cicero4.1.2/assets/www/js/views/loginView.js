define(["zepto", "underscore", "backbone", "handlebars","firebase","fireauth","text!templates/loginView.html"],
    function ($, _, Backbone, Handlebars,Firebase,Fireauth,template) {

    var loginView = Backbone.View.extend({
        
        events: {
            "touchend #register" : "showRegistration",
            "touchend #guest" : "showMap",
            "touchend #facebook" : "loginFacebook",
            "touchend #twitter" : "loginTwitter"
          },
          
        template: Handlebars.compile(template),

        initialize: function () {
            this.firebaseRef = new Firebase('https://cicero.firebaseio.com');
            this.authClient = new FirebaseAuthClient(this.firebaseRef, function(error, user) {
                if (error) {
                  
                  var message = 'An error occurred.';
                  navigator.notification.alert(message, function(){}, 'Failure!', 'Close');

                } else if (user) {
                  
                  var message = 'User ID: ' + user.id + ', Provider: ' + user.provider;
                  navigator.notification.alert(message, function(){}, 'Success!', 'Close');
                  Backbone.history.navigate("map", {trigger: true});
                  
                }
              });
            this.render();
        },
              
        render: function (eventName) {
            $(this.el).empty();
            $(this.el).html(this.template());
            return this;
        },
        
        showRegistration: function () {
            Backbone.history.navigate("register", {trigger: true});
        },
        
        showMap: function () {
            Backbone.history.navigate("map", {trigger: true});
        },
        
        loginFacebook: function(){
            this.authClient.login("facebook");
        },
        
        loginTwitter: function(){
            this.authClient.login("twitter");
        }
        
      });

    return loginView;

  });