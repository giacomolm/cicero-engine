define(["zepto", "underscore", "backbone", "handlebars","firebase","fireauth","text!templates/loginView.html"],
    function ($, _, Backbone, Handlebars,Firebase,Fireauth,template) {

    var loginView = Backbone.View.extend({
        
        events: {
            "touchstart #login" : "login",
            "touchstart #register" : "showRegistration",
            "touchstart #guest" : "showMap",
            "touchstart #facebook" : "loginFacebook",
            "touchstart #twitter" : "loginTwitter"
          },
          
        template: Handlebars.compile(template),

        initialize: function () {
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
        
        login: function(){
            var user_email = $('#email').attr('value');
            var user_password = $('#password').attr('value');
            authClient.login("password", {
                email: user_email,
                password: user_password
              });
        },
        
        loginFacebook: function(){
            authClient.login("facebook");
        },
        
        loginTwitter: function(){
            authClient.login("twitter");
        }
        
      });

    return loginView;

  });