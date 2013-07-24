define(["zepto", "underscore", "backbone", "handlebars","views/poiListView","views/eventListView","text!templates/searchView.html"],
    function ($, _, Backbone, Handlebars, poiListView, eventListView, template) {

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
            //assegno l'intera collezione alla ricerca, altrimenti l'operazione di filtro elimina i valori
            //this.searchedPois = this.pois;
            //this.poilistview = new poiListView({collection: this.searchedPois, favourites : this.favourites});
            this.user = cicero_user;
            this.render();
        },

        setPois: function(pois){
            this.pois = pois;
            this.searchedPois = this.pois;
            this.poilistview = new poiListView({collection: this.searchedPois, favourites : this.favourites});
            $(this.el).append($(this.poilistview.el));
        },
        
        setEvents: function(events){
            this.events = events;
            this.searchedEvents = this.events;
            this.eventlistview = new eventListView({collection: events, favourites : this.favourites});
            $(this.el).append($(this.eventlistview.el));
            $(this.eventlistview.el).toggleClass("invisible");
        },
        
        search : function(){
            var query = document.getElementById('search_field').value;
            this.searchedPois = new Backbone.Collection(this.pois.filter(function(poi) {
                return poi.get('name').toLowerCase().indexOf(query) !== -1 ;
            }));
            this.poilistview.setFilteredCollection(this.searchedPois);
            
            this.searchedEvents = new Backbone.Collection(this.events.filter(function(event) {
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
                    for(var i=0; i<this.events.length; i++){
                        user_id = 0; //ATTENZIONE - devo prenderlo dalla sessione corrente
                        id = this.events.at(i).id;
                        
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
                    for(var i=0; i<this.events.length; i++){
                        id = this.events.at(i).id;
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