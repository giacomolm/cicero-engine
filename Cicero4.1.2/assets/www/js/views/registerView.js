define(["zepto","underscore","backbone","handlebars","models/User","collections/Users","eventDispatcher","text!templates/registerView.html"],
    function ($, _, Backbone, Handlebars,User,Users,EventDispatcher,template) {

    var registerView = Backbone.View.extend({

        events: {
            "touchstart #register": "register"
        },
        
        template: Handlebars.compile(template),

        initialize: function () {
            this.users = new Users();
            EventDispatcher.trigger("show_spinner");
            this.users.firebase.on("value",this.render,this);
        },

        render: function () {
            $(this.el).empty();
            $(this.el).html(this.template());
            EventDispatcher.trigger("hide_spinner");
            return this;
        },
        
        register: function(){
            EventDispatcher.trigger("show_spinner");
            $('#error').addClass('invisible');
            var user_email = $('#email').val();
            var username = $('#username').val();
            var user_password = $('#password').val();
            if(username == '' || username.length <5){
                $('#error').removeClass('invisible');
                $('#error').html("Username must be at least 5 characters");
                EventDispatcher.trigger("hide_spinner");
                return;

            }
            if(user_password == '' || user_password.length < 5){
                $('#error').removeClass('invisible');
                $('#error').html("Password must be at least 5 characters");
                EventDispatcher.trigger("hide_spinner");
                return;
            }
            if(this.users.where({name: username}).length > 0){
                $('#error').removeClass('invisible');
                $('#error').html("Username already choosen");
                EventDispatcher.trigger("hide_spinner");
                return;
            }
            authClient.createUser(user_email, user_password, _.bind(function(error, user) {
                if (!error) {
                  var nuser = new User({id: user.id, name: username, type: "pw"});
                  this.users.add(nuser);
                  authClient.login('password', {
                      email: user_email,
                      password: user_password
                    });
                } else {
                    $('#error').removeClass('invisible');
                    switch(error.code) {
                        case 'EMAIL_TAKEN':
                            $('#error').html("The specified email address is already in use.");
                            break;
                        case 'UNKNOWN_ERROR':
                            $('#error').html("unknown error, please contact event administrator.");
                    }
                }
                EventDispatcher.trigger("hide_spinner");
              },this));
        }
        
      });

    return registerView;

  });