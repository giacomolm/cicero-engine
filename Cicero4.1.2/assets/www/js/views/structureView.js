define(["zepto","underscore","backbone","handlebars","eventDispatcher","text!templates/structureView.html"],
    function ($, _, Backbone, Handlebars,EventDispatcher,template) {
    
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
            EventDispatcher.on("show_spinner",this.show_spinner);
            EventDispatcher.on("hide_spinner",this.hide_spinner);
            this.render();
        },
        
        logout: function(){
            authClient.logout();
        },

        setLogout: function(){
            if(typeof cicero_user === 'undefined')
                $('#logout').addClass('invisible');
            else
                $('#logout').removeClass('invisible');
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

        show_spinner: function(){
            $('#spinner').removeClass("invisible");
        },

        hide_spinner: function(){
            $('#spinner').addClass("invisible");
        },
        
        render: function () {
            $(this.el).empty();
            $(this.el).html(this.template());
            this.setLogout();
            return this;
        }
        
      });

    return structureView;

  });