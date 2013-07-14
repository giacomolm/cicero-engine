define(['backbone'], function (Backbone) {

    var notify = function(){
        window.plugins.statusBarNotification.notify("test", "messaggio di test");
    }

    return{
        notify : notify
    }
});
