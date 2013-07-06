define(["zepto","underscore","backbone","handlebars","eventDispatcher","text!templates/registerView.html"],
    function ($, _, Backbone, Handlebars,EventDispatcher,template) {

    var registerView = Backbone.View.extend({

        events: {
            "touchstart #register": "register"
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
        
        register: function(){
            EventDispatcher.trigger("show_spinner");
            $('#error').addClass('invisible');
            var user_email = $('#email').val();
            var user_password = $('#password').val();
            authClient.createUser(user_email, user_password, function(error, user) {
                if (!error) {
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
              });
        }
        
      });

    return registerView;

  });