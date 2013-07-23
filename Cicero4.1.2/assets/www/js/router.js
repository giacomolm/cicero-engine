define(["zepto", "underscore", "backbone","views/semiStructureView","views/structureView","views/loginView","views/mapView", "views/registerView", "views/searchView", "views/favouriteView","views/eventListView","views/poiListView","views/howToReachUsView","views/nearbyPlacesView","views/eventDetailView","views/poiDetailView","views/poiEventView","views/newssListView","collections/Events","collections/Pois","collections/Favourites"],
    function ($, _,Backbone,semiStructureView,StructureView,loginView,mapView,registerView,searchView,favouriteView,eventListView,poiListView, howToReachUsView,nearbyPlacesView,eventDetailView,poiDetailView,poiEventView,newssListView,Events,Pois,Favourites) {

    var AppRouter = Backbone.Router.extend({

      routes: {
        "": "login",
        "login": "login",
        "map": "map",
        "map/:floor": "mapfloor",
        "map/:floor/:lat/:lng": "mapcenter",
        "register": "register",
        "search": "search",
        "favourite": "favourite",
        "eventList": "eventList",
        "poiList": "poiList",
        "howToReachUs": "howToReachUs",
        "nearbyPlaces": "nearbyPlaces",
        "newssList": "newssList",
        "eventDetail/:id": "eventDetail",
        "poiDetail/:id": "poiDetail",
        "poiEvent/:id": "poiEvent"
      },

      initialize: function () {
        this.currentView = undefined;
        this.externalView = new StructureView();
        $('body').append($(this.externalView.el));
        this.pois = new Pois();
        this.events = new Events();
        this.events.comparator = function(event) {
            return event.get("date");
          };
        this.favourites = new Favourites();
      },
      
      login: function(){
          this.externalView.setLogout();
          $('footer').first().addClass('invisible');
          var login = new loginView();
          this.changePage(login);
      },
      
      map: function(){
          this.externalView.setLogout();
          $('footer').first().removeClass('invisible');
    	  var map = new mapView({collection : this.pois});
    	  this.changePage(map);
      },

      mapfloor: function(floor){
          var map = new mapView({collection: this.pois,floor: floor});
          this.changePage(map);
      },

      mapcenter:function(floor,lat,lng){
          var map = new mapView({collection: this.pois,floor: floor, centerLat: lat, centerLng: lng});
          this.changePage(map);
      },

      register: function(){
          this.externalView.setLogout();
          $('footer').first().addClass('invisible');
          var register = new registerView();
          this.changePage(register);
      },
      
      search: function(){
          var search = new searchView({favourites : this.favourites});
          search.setPois(this.pois);
          search.setEvents(this.events);
          this.changePage(search);
      },
      
      favourite: function(){
          var favourite = new favouriteView({favourites : this.favourites});
          favourite.setFavouritesPois(this.pois);
          favourite.setFavouritesEvents(this.events);
          this.changePage(favourite);
      },
      
      eventList: function(){
          var eventList = new eventListView({collection: this.events});
          this.changePage(eventList);
      },
      
      poiList: function(){
          var poitList = new poiListView({collection: this.pois});
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

      newssList: function(){
          var newssList = new newssListView();
          this.changePage(newssList);
      },
      
      eventDetail: function(id){
          var event_model = this.events.get(id);
          var eventDetail = new eventDetailView({model:event_model});
          this.changePage(eventDetail); 
      },
      
      poiDetail: function(id){
          var poi = this.pois.get(id);
          var poiDetail = new poiDetailView({model : poi});
          this.changePage(poiDetail);
      },
      
      poiEvent: function(id){
          var poi = this.pois.get(id);
          var poiEvent = new poiEventView({model : poi});
          this.changePage(poiEvent);
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