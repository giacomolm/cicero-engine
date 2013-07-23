define(["zepto","underscore","backbone","handlebars","eventDispatcher","text!templates/loginView.html"],
    function ($, _, Backbone, Handlebars,EventDispatcher,template) {

    var loginView = Backbone.View.extend({
        
        className : "center",
        
        events: {
            "touchstart #login" : "login",
            "touchstart #register" : "showRegistration",
            "touchstart #guest" : "showMap",
            "touchstart #facebook" : "loginFacebook",
            "touchstart #twitter" : "loginTwitter"
          },
          
        template: Handlebars.compile(template),

        initialize: function () {
            EventDispatcher.trigger("changeTitle","Login");
            EventDispatcher.on("login_error",this.login_error);
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
            EventDispatcher.trigger("show_spinner");
            $('#error').addClass('invisible');
            var user_email = $('#email').val();
            var user_password = $('#password').val();
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
        },

        login_error: function(message){
            EventDispatcher.trigger("hide_spinner");
            $('#error').html(message);
            $('#error').removeClass('invisible');
        }
      });

    return loginView;

  });