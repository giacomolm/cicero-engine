define(["zepto","underscore","backbone","handlebars","text!templates/registerView.html"],
    function ($, _, Backbone, Handlebars,template) {

    var registerView = Backbone.View.extend({

        events: {
            "touchstart #buttonSubmit": "register"
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
            var user_email = $('#email').val();
            var user_password = $('#password').val();
            authClient.createUser(user_email, user_password, function(error, user) {
                if (!error) {
                  authClient.login('password', {
                      email: user_email,
                      password: user_password
                    });
                } else {
                    alert("Problem...");
                }
              });
        }
        
      });

    return registerView;

  });