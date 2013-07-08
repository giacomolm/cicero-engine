define(["zepto", "underscore", "backbone", "handlebars","views/poiListView","views/eventListView","text!templates/searchView.html"],
    function ($, _, Backbone, Handlebars, poiListView, eventListView, template) {

    var searchView = Backbone.View.extend({

        template: Handlebars.compile(template),
        
        events : {
            "touchend #poiTab" : "showPoi",
            "touchend #eventTab" : "showEvent",
            "swipeRight" : "showPoi",
            "swipeLeft" : "showEvent",
            "touchend #search_btn" : "search",
            "keyup #search_field" : "search",
            "touchend #edit" : "edit",
        },

        initialize: function () {
            this.favourites = this.options.favourites;
            //assegno l'intera collezione alla ricerca, altrimenti l'operazione di filtro elimina i valori
            //this.searchedPois = this.pois;
            //this.poilistview = new poiListView({collection: this.searchedPois, favourites : this.favourites});
            
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
            
            if(! $('#edit').hasClass("edit_active")){
                
                $('#edit').addClass("edit_active");
                $('#edit').addClass("favourite_icon_active");
                
                var elements = document.getElementsByClassName("website");
                for(var i=0; i<elements.length; i++) {
                    elements[i].className += " invisible";
                }
                for(var i=0; i<this.pois.length; i++){
                    user_id = 0; //ATTENZIONE - devo prenderlo dalla sessione corrente
                    cid = this.pois.at(i).cid;
                    if(this.favourites.includesCid(user_id,cid)!=0){
                        document.getElementById('favourite#'+cid).className="favourite_icon favourite_icon_active";                        
                    }
                    else{
                        document.getElementById('favourite#'+cid).className="favourite_icon";      
                    }
                }
                for(var i=0; i<this.events.length; i++){
                    user_id = 0; //ATTENZIONE - devo prenderlo dalla sessione corrente
                    cid = this.events.at(i).cid;
                    if(this.favourites.includesCid(user_id,cid)!=0){
                        document.getElementById('favourite#'+cid).className="favourite_icon favourite_icon_active";                      
                    }
                    else{
                        document.getElementById('favourite#'+cid).className="favourite_icon";                        
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
                    cid = this.pois.at(i).cid;
                    document.getElementById('favourite#'+cid).className+=" invisible";
                }
                for(var i=0; i<this.events.length; i++){
                    cid = this.events.at(i).cid;
                    document.getElementById('favourite#'+cid).className+=" invisible";
                }
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