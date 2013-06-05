define(["zepto", "underscore", "backbone","views/semiStructureView","views/structureView","views/loginView","views/mapView"],
    function ($, _,Backbone,semiStructureView,StructureView,loginView,mapView) {

    var AppRouter = Backbone.Router.extend({

      routes: {
        "": "login",
        "login": "login",
        "map": "map"
      },

      initialize: function () {
        this.externalView = undefined;  
        this.currentView = undefined;
      },
      
      login: function(){
          if(this.externalView){
              this.externalView.remove();
          }
          this.externalView = new semiStructureView();
          $('body').append($(this.externalView.el));
          var login = new loginView();
          this.changePage(login);
      },
      
      map: function(){
          if(this.externalView){
              this.externalView.remove();
          }
          this.externalView = new StructureView();
          $('body').append($(this.externalView.el));
    	  var map = new mapView();
    	  this.changePage(map);
      },

      changePage: function (page) {
        if(this.currentView) {
           this.currentView.remove();
      }

        this.currentView = page;
        $('#container').append($(this.currentView.el));
      }

    });

    return AppRouter;

  });