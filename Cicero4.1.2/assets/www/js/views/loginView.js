define(["zepto","underscore","backbone","handlebars","eventDispatcher",'ciceroauthentication',"text!templates/loginView.html"],
    function ($, _, Backbone, Handlebars,EventDispatcher,Ciceroauthentication,template) {

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
            EventDispatcher.trigger("closeMessage");
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
            Ciceroauthentication.authClient.login("password", {
                    email: user_email,
                    password: user_password
                });
        },
        
        loginFacebook: function(){
            Ciceroauthentication.authClient.login("facebook",{
                rememberMe: false,
                auth_type: 'reauthenticate'
            });
        },
        
        loginTwitter: function(){
            Ciceroauthentication.authClient.login("twitter",{
                rememberMe: false,
                auth_type: 'reauthenticate'
            });
        },

        login_error: function(message){
            EventDispatcher.trigger("hide_spinner");
            $('#error').html(message);
            $('#error').removeClass('invisible');
        }
      });

    return loginView;

  });