define(["zepto", "underscore", "backbone","views/semiStructureView","views/structureView","views/loginView","views/mapView", "views/registerView", "views/searchView", "views/favouriteView","views/eventListView","views/poiListView","views/howToReachUsView","views/nearbyPlacesView","views/eventDetailView","views/poiDetailView","collections/Events","collections/Pois"],
    function ($, _,Backbone,semiStructureView,StructureView,loginView,mapView,registerView,searchView,favouriteView,eventListView,poiListView, howToReachUsView,nearbyPlacesView,eventDetailView,poiDetailView,Events,Pois) {

    var AppRouter = Backbone.Router.extend({

      routes: {
        "": "login",
        "login": "login",
        "map": "map",
        "register": "register",
        "search": "search",
        "favourite": "favourite",
        "eventList": "eventList",
        "poiList": "poiList",
        "howToReachUs": "howToReachUs",
        "nearbyPlaces": "nearbyPlaces",
        "eventDetail/:id": "eventDetail",
        "poiDetail/:id": "poiDetail"
      },

      initialize: function () {
        this.externalView = undefined;  
        this.currentView = undefined;
        this.pois = new Pois();
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
    	  var map = new mapView(this.pois);
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
          var search = new searchView(this.pois);
          this.changePage(search);
      },
      
      favourite: function(){
          var favourite = new favouriteView();
          this.changePage(favourite);
      },
      
      eventList: function(){
          var eventList = new eventListView();
          this.changePage(eventList);
      },
      
      poiList: function(){
          var poitList = new poiListView();
          this.changePage(poiList);
      },
      
      howToReachUs: function(){
          var howToReachUs = new howToReachUsView();
          this.changePage(howToReachUs);
      },
      
      nearbyPlaces: function(){
          var nearbyPlaces = new nearbyPlacesView();
          this.changePage(nearbyPlaces);
      },
      
      eventDetail: function(id){
          var events = new Events();
          var event_model = events.getByCid(id);
          var eventDetail = new eventDetailView({model:event_model});
          this.changePage(eventDetail); 
      },
      
      poiDetail: function(id){
          var poi = this.pois.get(id);
          var poiDetail = new poiDetailView(poi);
          this.changePage(poiDetail);
      },
      
      changePage: function (page) {
        if(this.currentView) {
           this.currentView.remove();
        }

        this.currentView = page;
        $('#container').append($(this.currentView.el));
        $('#viewTitle').html(window.location.hash);
        this.currentView.trigger("inTheDom");
      }

    });

    return AppRouter;

  });