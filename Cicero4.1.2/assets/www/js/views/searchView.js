define(["zepto", "underscore", "backbone", "handlebars","eventDispatcher","views/poiListView","views/eventListView","collections/Pois","collections/Events","text!templates/searchView.html"],
    function ($, _, Backbone, Handlebars, EventDispatcher, poiListView, eventListView, Pois, Events,template) {

    var searchView = Backbone.View.extend({

        template: Handlebars.compile(template),
        
        events : {
            "touchend #poiTab" : "showPoi",
            "touchend #eventTab" : "showEvent",            
            "touchend #search_btn" : "search",
            "keyup #search_field" : "search",
            "touchend #edit" : "edit",
        },

        initialize: function () {
            this.favourites = this.options.favourites;
	    this.user = cicero_user;
	    EventDispatcher.trigger("changeTitle", "Search");
            //assegno l'intera collezione alla ricerca, altrimenti l'operazione di filtro elimina i valori

	   this.render();

	    this.pois = new Pois();
        this.pois.firebase.on("value",this.setPois, this);
	    this.eventi = new Events();
	    this.eventi.firebase.on("value",this.setEvents, this);
	    
	    
        },

        setPois: function(){
            this.searchedPois = this.pois;
            this.poilistview = new poiListView({collection: this.searchedPois, favourites : this.favourites});
            $(this.el).append($(this.poilistview.el));
        },
        
        setEvents: function(){            
            this.searchedEvents = this.eventi;
            this.eventlistview = new eventListView({collection:  this.searchedEvents, favourites : this.favourites});
            $(this.el).append($(this.eventlistview.el));
            $(this.eventlistview.el).toggleClass("invisible");
        },
        
        search : function(){
            var query = document.getElementById('search_field').value;
            this.searchedPois = new Backbone.Collection(this.pois.filter(function(poi) {
                return poi.get('name').toLowerCase().indexOf(query) !== -1 ;
            }));
            this.poilistview.setFilteredCollection(this.searchedPois);
            
            this.searchedEvents = new Backbone.Collection(this.eventi.filter(function(event) {
                return event.get('name').toLowerCase().indexOf(query) !== -1 ;
            }));
           
            this.eventlistview.setFilteredCollection(this.searchedEvents);
            
            this.renderSearchResult();
        },
        
        edit: function(){
            if(this.user!=undefined){
                if(! $('#edit').hasClass("edit_active")){
                    
                    $('#edit').addClass("edit_active");
                    $('#edit').addClass("favourite_icon_active");
                    
                    var elements = document.getElementsByClassName("website");
                    for(var i=0; i<elements.length; i++) {
                        elements[i].className += " invisible";
                    }
                    for(var i=0; i<this.pois.length; i++){
                        user_id = 0; //ATTENZIONE - devo prenderlo dalla sessione corrente
                        id = this.pois.at(i).id;
                        if(this.favourites.includesCid(this.user.id,id, "poi")!=-1){
                            document.getElementById('favouritepoi#'+id).className="favourite_icon favourite_icon_active";                        
                        }
                        else{
                            document.getElementById('favouritepoi#'+id).className="favourite_icon";      
                        }
                    }
                    for(var i=0; i<this.eventi.length; i++){
                        user_id = 0; //ATTENZIONE - devo prenderlo dalla sessione corrente
                        id = this.eventi.at(i).id;
                        
                        if(this.favourites.includesCid(this.user.id,id,"event")!=-1){
                            document.getElementById('favouriteevent#'+id).className="favourite_icon favourite_icon_active";                      
                        }
                        else{
                            document.getElementById('favouriteevent#'+id).className="favourite_icon";                        
                        }
                    }
                }
                else{
                    
                    $('#edit').removeClass("edit_active");
                    $('#edit').removeClass("favourite_icon_active");
                    
                    var elements = document.getElementsByClassName("website");
                    for(var i=0; i<elements.length; i++) {
                        elements[i].className = "website";
                    }
                    for(var i=0; i<this.pois.length; i++){
                        id = this.pois.at(i).id;
                        document.getElementById('favouritepoi#'+id).className+=" invisible";
                    }
                    for(var i=0; i<this.eventi.length; i++){
                        id = this.eventi.at(i).id;
                        document.getElementById('favouriteevent#'+id).className+=" invisible";
                    }
                }
            }
            else{
                $('#message').html("You need to login to store element in favourite");
                $('#message_div').show();
            }
        },
        
        showPoi: function(){
            $('#poiTab').toggleClass('tabActive');
            $('#eventTab').toggleClass('tabActive');
            $('#poiListView').toggleClass('invisible');
            $('#eventListView').toggleClass('invisible');
        },
        
        showEvent: function(){
            $('#poiTab').toggleClass('tabActive');
            $('#eventTab').toggleClass('tabActive');
            $('#poiListView').toggleClass('invisible');
            $('#eventListView').toggleClass('invisible');
        },
        
        render: function (eventName) {
            $(this.el).empty();
            $(this.el).html(this.template());
            //$(this.el).append($(this.poilistview.el));
            //$(this.el).append($(this.eventlistview.el));
            return this;
        },
        
        renderSearchResult: function(){
            $(this.el).append($(this.poilistview.el));
            $(this.el).append($(this.eventlistview.el));
            
            return this;
        }
        
        
      });

    return searchView;

  });