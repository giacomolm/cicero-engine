define(["zepto", "underscore", "backbone", "handlebars","text!templates/structureView.html"],
    function ($, _, Backbone, Handlebars,template) {

    var structureView = Backbone.View.extend({
        events: {
            "touchstart #menu_icon" : "toggleMenu",
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

        toggleMenu: function (eventName) {
            menuBut = document.getElementById('popupMenu');
            if(menuBut.style.display == 'none')
               menuBut.style.display = 'block';
            else menuBut.style.display = 'none';
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
            $(this.el).html(this.template());
            return this;
        }
      });

    return structureView;

  });