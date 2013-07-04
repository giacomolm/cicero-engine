define(["zepto","underscore","backbone","handlebars","text!templates/structureView.html"],
    function ($, _, Backbone, Handlebars,template) {
    
    var structureView = Backbone.View.extend({
        events: {
            "touchstart #logout" : "logout",
            "touchend #menu_icon" : "toggleMenu",
            "touchend #back": "back",
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
        },

        toggleMenu: function (eventName) {
            $('#popupMenu').toggleClass('invisible');
        },

        back: function(){
            window.history.back();
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
        
        render: function () {
            $(this.el).empty();
            $(this.el).html(this.template());
            this.setLogout();
            return this;
        },

        setLogout: function(){
            if(typeof cicero_user === 'undefined')
                $('#logout').addClass('invisible');
            else
                $('#logout').removeClass('invisible');
        }
        
      });

    return structureView;

  });