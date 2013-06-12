define(["zepto", "underscore", "backbone","views/semiStructureView","views/structureView","views/loginView","views/mapView", "views/registerView", "views/searchView"],
    function ($, _,Backbone,semiStructureView,StructureView,loginView,mapView,registerView, searchView) {

    var AppRouter = Backbone.Router.extend({

      routes: {
        "": "login",
        "login": "login",
        "map": "map",
        "register": "register",
        "search": "search"
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

      register: function(){
          if(this.externalView){
              this.externalView.remove();
          }
          this.externalView = new semiStructureView();
          $('body').append($(this.externalView.el));
          var register = new registerView();
          this.changePage(register);
      },
      
      search: function(){
          var search = new searchView();
          this.changePage(search);
      },
      
      changePage: function (page) {
        if(this.currentView) {
           this.currentView.remove();
      }

        this.currentView = page;
        $('#container').append($(this.currentView.el));
        this.currentView.trigger("inTheDom");
      }

    });

    return AppRouter;

  });