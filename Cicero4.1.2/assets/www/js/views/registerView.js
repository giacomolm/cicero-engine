define(["zepto","underscore","backbone","handlebars","models/User","collections/Users","eventDispatcher","text!templates/registerView.html"],
    function ($, _, Backbone, Handlebars,User,Users,EventDispatcher,template) {

    var registerView = Backbone.View.extend({

        events: {
            "touchstart #register": "register"
        },
        
        template: Handlebars.compile(template),

        initialize: function () {
            EventDispatcher.trigger("changeTitle","Register");
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

            var errors = '';
            if(username == '' || username.length <5)
                errors+= 'Username must be at least 5 characters. ';
            if(user_password == '' || user_password.length < 5)
                errors+= "Password must be at least 5 characters. ";
            if(this.users.where({name: username}).length > 0)
                errors+= "Username already chosen. ";

            if(errors){
                $('#error').removeClass('invisible');
                $('#error').html(errors);
                EventDispatcher.trigger("hide_spinner");
                return;
            }

            authClient.createUser(user_email, user_password, _.bind(function(error, user) {
                if (!error) {
                  var nuser = new User({id: user.id, name: username, type: "password"});
                  this.users.add(nuser);
                  Backbone.history.navigate("login", {trigger: true});
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