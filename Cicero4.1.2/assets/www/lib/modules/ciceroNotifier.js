define(['backbone','models/User','collections/Users','models/Event','collections/Events','models/Favourite','collections/Favourites','statusbarnotification'],
    function (Backbone,User,Users,Event,Events,Favourite,Favourites,Statusbarnotification) {

    var notify = function(){
        var MyEvents = new Events();
        MyEvents.firebase.once("value",_.bind(function(){
            //window.plugins.statusBarNotification.notify("notifiche", "notifiche attive");
            for(i=0; i<MyEvents.length; i++){
                var MyEvent = MyEvents.at(i);
                MyEvent.on("change",function(MyEvent){
                    //window.plugins.statusBarNotification.notify(MyEvent.get("name"), MyEvent.get("description"));
                })
            }
        },this));
        //window.plugins.statusBarNotification.notify("test", "messaggio di test");

    }

    return{
        notify : notify
    }
});
