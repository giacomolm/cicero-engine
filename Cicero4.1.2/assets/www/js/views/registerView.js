define(["zepto", "underscore", "backbone", "handlebars","firebase","fireauth","text!templates/registerView.html"],
    function ($, _, Backbone, Handlebars,Firebase,Fireauth,template) {

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
            alert("entro register");
            var user_email = $('#email').attr('value');
            var user_password = $('#password').attr('value');
            authClient.createUser(user_email, user_password, function(error, user) {
                if (!error) {
                  alert("entro nel login");
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