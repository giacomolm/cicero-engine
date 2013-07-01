define(["zepto", "underscore", "backbone", "handlebars","firebase","fireauth","text!templates/structureView.html"],
    function ($, _, Backbone, Handlebars,Firebase,Fireauth,template) {
    
    var structureView = Backbone.View.extend({
        events: {
            "touchstart #logout" : "logout",
            "touchend #menu_icon" : "toggleMenu",
            "touchstart #map_icon" : "showMap",
            "touchstart #search_icon" : "showSearch",
            "touchstart #favourite_icon" : "showFavourite",
            "touchstart #navigation_icon" : "showReachUs",
            "touchstart #nearby_icon" : "showNearby"
          },
          
        template: Handlebars.compile(template),

        initialize: function () {
            this.render();
        },
        
        logout: function(){
            authClient.logout();
            Backbone.history.navigate("login", {trigger: true});
        },

        toggleMenu: function (eventName) {
            $('#popupMenu').toggleClass('invisible');
        },
        
        showMap: function () {
            Backbone.history.navigate("map", {trigger: true});
        },
        
        showSearch: function () {
            Backbone.history.navigate("search", {trigger: true});
        },
        
        showFavourite: function () {
            Backbone.history.navigate("favourite", {trigger: true});
        },
        
        showNearby: function () {
            Backbone.history.navigate("nearbyPlaces", {trigger: true});
        },
        
        showReachUs: function () {
            Backbone.history.navigate("howToReachUs", {trigger: true});
        },
        
        showPoiList: function () {
            Backbone.history.navigate("poiList", {trigger: true});
        },
        
        showEventList: function () {
            Backbone.history.navigate("eventList", {trigger: true});
        },
        
        render: function (eventName) {
            $(this.el).empty();
            var logged;
            if(typeof auth === 'undefined')
                logged = false;
            else
                logged = true;
            $(this.el).html(this.template({logged: logged}));
            return this;
        },
        
      });

    return structureView;

  });