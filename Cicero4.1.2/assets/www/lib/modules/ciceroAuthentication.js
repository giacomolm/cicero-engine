define(['backbone','firebase','fireauth','models/User','collections/Users','ciceronotifier','eventDispatcher'],
    function (Backbone,Firebase,Fireauth,User,Users,Ciceronotifier,EventDispatcher) {


        this.authClient = undefined;

        var init = function(){
            var firebaseRef = new Firebase('https://cicero.firebaseio.com');
            this.authClient = new FirebaseAuthClient(firebaseRef, function(error, user) {
                if (error) {
                    /*login error*/
                    switch(error.code) {
                        case 'INVALID_EMAIL':
                        case 'INVALID_PASSWORD':
                            EventDispatcher.trigger("login_error","invaild user or email");
                            break;
                        case 'INVALID_USER':
                            EventDispatcher.trigger("login_error","user does not exist.");
                            break;
                        case 'UNKNOWN_ERROR':
                            EventDispatcher.trigger("login_error","unknown error, please contact event administrator.");
                    }
                } else if (user) {
                    /*user login*/
                    cicero_user = user;  /*user global variable*/
                    if(typeof cicero_user != 'undefined'){  /*prevents to call these actions during user registration*/
                    var users = new Users();
                    users.firebase.on('value',function(){
                        if(cicero_user.provider == 'password'){
                            var user = users.findWhere({id: cicero_user.id, type:'password'});
                            cicero_user.displayName = user.get('name');
                        } else {
                            var social_user = users.findWhere({id: cicero_user.id,type: cicero_user.provider});
                            if(social_user == undefined){
                                var new_social_user = new User({id: cicero_user.id, name: cicero_user.displayName, type: cicero_user.provider});
                                users.add(new_social_user);
                            }
                        }
                        Ciceronotifier.on();
                        EventDispatcher.trigger("hide_spinner");
                        Backbone.history.navigate("map", {trigger: true});
                    },this);
                    }
                } else {
                    /*user logout*/
                    cicero_user = undefined;
                    Backbone.history.navigate("login", {trigger: true});
                }
            });
        }

        return{
            init: init,
            authClient: this.authClient
        }
    });
