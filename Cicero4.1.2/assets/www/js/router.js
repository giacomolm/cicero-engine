define(["zepto", "underscore", "backbone","views/semiStructureView","views/structureView","views/loginView","views/mapView", "views/registerView", "views/searchView", "views/favouriteView","views/eventListView","views/poiListView","views/howToReachUsView","views/nearbyPlacesView","views/eventDetailView","views/poiDetailView","collections/Events","collections/Pois","collections/Favourites"],
    function ($, _,Backbone,semiStructureView,StructureView,loginView,mapView,registerView,searchView,favouriteView,eventListView,poiListView, howToReachUsView,nearbyPlacesView,eventDetailView,poiDetailView,Events,Pois,Favourites) {

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
        this.currentView = undefined;
        this.externalView = new StructureView();
        $('body').append($(this.externalView.el));
        this.pois = new Pois();
        this.events = new Events();
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