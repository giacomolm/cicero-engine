define(["zepto", "underscore", "backbone", "handlebars","views/poiListView","views/eventListView","text!templates/favouriteView.html"],
    function ($, _, Backbone, Handlebars,poiListView,eventListView,template) {

    var favouriteView = Backbone.View.extend({

        template: Handlebars.compile(template),

        events : {
            "touchend #poiTab" : "showPoi",
            "touchend #eventTab" : "showEvent"
        },
        
        initialize: function () {
            this.favourites = this.options.favourites;
            this.favourites.firebase.on("value", this.refresh,this);
            //this.listenTo(this.favourites,"change",this.refresh);
            this.user_id = 0;
            this.render();
        },

        setFavouritesPois: function(pois){               
            
            if(pois!=undefined) this.pois = pois;
            if(this.pois instanceof Backbone.Collection){     
                this.favouritesPois = this.getFavourites(this.favourites,this.pois);
                this.poilistview = new poiListView({collection:this.favouritesPois, favourites : this.favourites});
                
            }
            
            this.renderPois();
        },
        
        setFavouritesEvents: function(events){               
            if(events!=undefined) this.events = events
            if(this.events instanceof Backbone.Collection){
                
                this.favouritesEvents = this.getFavourites(this.favourites,this.events);
                this.eventlistview = new eventListView({collection:this.favouritesEvents, favourites : this.favourites});
            }
            
            this.renderEvents();
        },
        
        //Attention: it return a simple Backbone.Collection
        getFavourites: function(favourites,list){
            var collection =  new Backbone.Collection();
            for(i=0; i<favourites.length; i++){
                  collection.add(list.get(favourites.at(i).get("id_ref")));
            }
            return collection;
        },
        
        refresh: function(){
            this.setFavouritesPois();
            this.setFavouritesEvents();
            //this.render();
        },
        
        showPoi: function(){
            if (! $('#poiTab').hasClass('tabActive')){
                $('#poiTab').toggleClass('tabActive');
                $('#eventTab').toggleClass('tabActive');
                $('#poiListView').toggleClass('invisible');
                $('#eventListView').toggleClass('invisible');   
            }
        },
        
        showEvent: function(){
            if ($('#poiTab').hasClass('tabActive')){
                
                $('#poiTab').toggleClass('tabActive');
                $('#eventTab').toggleClass('tabActive');
                $('#poiListView').toggleClass('invisible');
                $('#eventListView').toggleClass('invisible');
            }            
        },
        
        render: function (eventName) {
            var event_tab = $('#eventTab').hasClass('tabActive'); 
            $(this.el).empty();
            $(this.el).html(this.template());
            this.renderPois();
            this.renderEvents();
            return this;
        },
        
        renderPois: function(){
            if(this.poilistview){
                $('#poiListView',  $(this.el)).remove();
                $(this.el).append($(this.poilistview.el));
                if ((! $('#poiTab').hasClass('tabActive'))&&(!$('#poiListView').hasClass('invisible')))  $('#poiListView').toggleClass('invisible');
            }
        },
        renderEvents: function(){
            if(this.eventlistview){               
                $('#eventListView',  $(this.el)).remove();
                $(this.el).append($(this.eventlistview.el));
                
                if ($('#eventTab').hasClass('tabActive'))  document.getElementById('eventListView').className = "";
            }
        }
        
      });

    return favouriteView;

  });