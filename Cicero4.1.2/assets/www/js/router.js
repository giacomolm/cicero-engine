define(["zepto", "underscore", "backbone","views/mapView"],
    function ($, _,Backbone,mapView) {

    var AppRouter = Backbone.Router.extend({

      routes: {
        "": "map",
        "map": "map",
      },

      initialize: function () {
        this.currentView = undefined;
      },
      
      map: function(){
    	  var map = new mapView();
    	  this.changePage(map);
      },

      changePage: function (page) {
        if(this.currentView) {
           this.currentView.remove();
      }

        this.currentView = page;
        //page.render();
        $('body').append($(page.el));
      }

    });

    return AppRouter;

  });