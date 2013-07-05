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
            EventDispatcher.on("login_fields_error",this.login_fields_error);
            EventDispatcher.on("login_user_error",this.login_user_error);
            EventDispatcher.on("login_unknown_error",this.login_unknown_error);
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

        login_fields_error: function(){
            EventDispatcher.trigger("hide_spinner");
            $('#error').html("invaild user or email.");
            $('#error').removeClass('invisible');
        },

        login_user_error: function(){
            EventDispatcher.trigger("hide_spinner");
            $('#error').html("user does not exist.");
            $('#error').removeClass('invisible');
        },

        login_unknown_error: function(){
            EventDispatcher.trigger("hide_spinner");
            $('#error').html("unknown error, please contact event administrator.");
            $('#error').removeClass('invisible');
        }
        
      });

    return loginView;

  });