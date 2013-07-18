define(['backbone','models/User','collections/Users','models/Event','collections/Events','models/Favourite','collections/Favourites','statusbarnotification'],
    function (Backbone,User,Users,Event,Events,Favourite,Favourites,Statusbarnotification) {

    var on = function(){

        
        var favourites = new Favourites();
        var events = new Events();

        /*listening on favourites child_added event in order to insert the notification event. It treats favourites present already in the db during user login also*/
        /*the callback function is called for each favourite already present in the boot phase and each time a new favourite is added*/
        favourites.firebase.on("child_added",function(dataSnapshot){
            var dataSnapShotVal = dataSnapshot.val();
            var myfavourites = new Backbone.Collection(favourites.filter(function(favourite){  /* può essere usato direttamente dataSnapVal*/
                return favourite.id == dataSnapShotVal.id.toString();
            }));
            for(i=0;i<myfavourites.length;i++){ /* può essere rimosso, collback chiamata per ogni elemento*/
                var myfavourite = myfavourites.at(i);
                if(myfavourite.get("user") == cicero_user.id && myfavourite.get("type") == "event" && myfavourite.get("notified") == "no" ){
                    events.firebase.once("value",function(){
                        var event = new Backbone.Collection(events.filter(function(event){
                            return event.id == myfavourite.get("id_ref")
                        }));
                        var fevent = event.at(0);

                        fevent.on("change",function(fevent){
                            if(myfavourite.get("notified") == 'no' && fevent.get("notify") == 'yes'){
                                window.plugins.statusBarNotification.notify("An event is starting!","The event "+fevent.get("name")+"is going to start!");
                                myfavourite.set("notified","yes");
                            }
                        });

                    });
                }
            }
        });

        /* listening on favourites child_removed  event in order to remove the notification event related on it*/
        /* the callback function is called each time a favourite is removed*/
        favourites.firebase.on("child_removed",function(favourite){
           var myfavourite = favourite.val(); /* we don't need to retrive the model because we have all that is needed in the snapShot*/
           if(myfavourite.user == cicero_user.id && myfavourite.type == "event"){
               events.firebase.once("value",function(){
                   var event = new Backbone.Collection(events.filter(function(event){
                       return event.id == myfavourite.id_ref;
                   })).at(0);
                   event.off("change");
               });
           }
        });



        /*
        //initial checking for already present event into favourites, it's no longer useful because managed with child_added event
        events.firebase.once("value",_.bind(function(){
            favourites.firebase.once("value", _.bind(function(){

                //filtering collection favourite
                var myfavourites = new Backbone.Collection(favourites.filter(function(favourite){
                    return (
                        favourite.get("user") == cicero_user.id && //controllare anche tipo utente
                        favourite.get("type") == "event" &&
                        favourite.get("notified") == "no"
                        )
                }));


                //for each favourite we retrive the referenced event and bind a change event on it
                for(i=0; i< myfavourites.length; i++){
                    var myfavourite = favourites.at(i);

                        //filtering collection in order to find the related event
                        var event = new Backbone.Collection(events.filter(function(event){
                            return event.id == myfavourite.get("id_ref")
                        }));
                        var fevent = event.at(0);

                        //binding on change
                        fevent.on("change",function(fevent){
                            if(myfavourite.get("notified") == 'no' && fevent.get("notify") == 'yes'){
                                window.plugins.statusBarNotification.notify("An event is starting!","The event "+fevent.get("name")+"is going to start!");
                                myfavourite.set("notified","yes");
                            }
                        });
                }
            }),this);
        }),this);
        */

    }

    var off = function(){

        var favourites = new Favourites();
        var events = new Events();

        favourites.firebase.on("value",function(){
            events.firebase.on("value",function(){

                /*getting all user favourites*/
                var myfavourites = new Backbone.Collection(favourites.filter(function(favourite){
                    return (
                        favourite.get("user") == cicero_user.id &&
                        favourite.get("type") == 'event'
                        )
                }));

                /* for each myfavourite we retrive the related event and remove callback function attached on it*/
                for(i=0; i<myfavourites.length;i++){
                    var myfavourite = myfavourites.at(i);
                    var myevent = new Backbone.Collection(events.filter(function(event){
                        return event.id == myfavourite.get("id_ref")
                    })).at(0);
                    alert("removing notification for event "+myevent.id);
                    myevent.off("change");
                }
            });
        });
    }

    return{
        on : on,
        off: off
    }
});
