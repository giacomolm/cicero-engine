define(["zepto", "underscore", "backbone", "handlebars","text!templates/structureView.html"],
    function ($, _, Backbone, Handlebars,template) {

    var structureView = Backbone.View.extend({
        events: {
            "touchstart #menu_icon" : "toggleMenu",
            "touchstart #map_icon" : "showMap",
            "touchstart #search_icon" : "showSearch"
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
        
        render: function (eventName) {
            $(this.el).empty();
            $(this.el).html(this.template());
            return this;
        }
      });

    return structureView;

  });