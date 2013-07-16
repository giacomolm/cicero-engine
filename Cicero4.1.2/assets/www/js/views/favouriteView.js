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
            
            //this.listenTo(this.favourites,"change",this.refresh);
            this.user = cicero_user;
            
            if (this.user!=undefined) {
                this.favourites.firebase.on("value", this.refresh,this);
                this.user_id = cicero_user.id;
            }
            this.render();
        },

        setFavouritesPois: function(pois){               
           if(this.user!=undefined){ 
                if(pois!=undefined) this.pois = pois;
                if(this.pois instanceof Backbone.Collection){     
                    this.favouritesPois = this.getFavourites(this.favourites,this.pois,"poi");
                    this.poilistview = new poiListView({collection:this.favouritesPois, favourites : this.favourites});
                    
                }
                this.renderPois();
           }
        },
        
        setFavouritesEvents: function(events){ 
            if(this.user!=undefined){
                if(events!=undefined) this.events = events
                if(this.events instanceof Backbone.Collection){
                    
                    this.favouritesEvents = this.getFavourites(this.favourites,this.events, "event");
                    this.eventlistview = new eventListView({collection:this.favouritesEvents, favourites : this.favourites});
                }
                this.renderEvents();
            }
            
        },
        
        //Attention: it return a simple Backbone.Collection
        getFavourites: function(favourites,list,type){
            var collection =  new Backbone.Collection();
            for(i=0; i<favourites.length; i++){
                    if(favourites.at(i).get("user")==this.user.id && favourites.at(i).get("type")==type)
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
            if(cicero_user != undefined){
                this.renderPois();
                this.renderEvents();
            }
            else{
                $('#message').html("You need to login to store element in favourite");
                $('#message_div').show();
            }
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