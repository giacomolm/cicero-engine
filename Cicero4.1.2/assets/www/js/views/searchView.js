define(["zepto", "underscore", "backbone", "handlebars","views/poiListView","views/eventListView","collections/Favourites","text!templates/searchView.html"],
    function ($, _, Backbone, Handlebars, poiListView, eventListView, Favourites, template) {

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
            this.pois = this.options.pois;
            this.favourites = new Favourites();
            this.poilistview = new poiListView({collection: this.pois, favourites : this.favourites});
            //this.events = this.options.events;
            //this.eventlistview = new eventListView({collection: this.events});
            this.render();
        },

        setEvents: function(events){
            this.events = events;
            this.eventlistview = new eventListView({collection: events, favourites : this.favourites});
            $(this.el).append($(this.eventlistview.el));
        },
        
        search : function(){
            var query = document.getElementById('search_field').value;
            this.pois = new Backbone.Collection(this.pois.filter(function(poi) {
                return poi.get('name').toLowerCase().indexOf(query) !== -1 ;
            }));
            this.poilistview.setFilteredCollection(this.pois);
            
            this.events = new Backbone.Collection(this.events.filter(function(event) {
                return event.get('name').toLowerCase().indexOf(query) !== -1 ;
            }));
           
            this.eventlistview.setFilteredCollection(this.events);
            
            this.renderSearchResult();
        },
        
        edit: function(){
            
            if($('#edit').hasClass("ui-button-primary")){
                $('#edit').removeClass("ui-button-primary");
                $('#edit').addClass("ui-button-error");
                $('#edit').html("Exit");
                
                var elements = document.getElementsByClassName("website");
                for(var i=0; i<elements.length; i++) {
                    elements[i].className += " invisible";
                }
                for(var i=0; i<this.pois.length; i++){
                    user_id = 0; //ATTENZIONE - devo prenderlo dalla sessione corrente
                    cid = this.pois.at(i).cid;
                    if(this.favourites.includesCid(user_id,cid)!=0)
                        document.getElementById('red#'+cid).className = "button_red";
                    else
                        document.getElementById('blue#'+cid).className = "button_blue";
                }
                for(var i=0; i<this.events.length; i++){
                    user_id = 0; //ATTENZIONE - devo prenderlo dalla sessione corrente
                    cid = this.events.at(i).cid;
                    if(this.favourites.includesCid(user_id,cid)!=0)
                        document.getElementById('red#'+cid).className = "button_red";
                    else
                        document.getElementById('blue#'+cid).className = "button_blue";
                }
            }
            else{
                $('#edit').removeClass("ui-button-error");
                $('#edit').addClass("ui-button-primary");
                $('#edit').html("Edit");
                var elements = document.getElementsByClassName("website");
                for(var i=0; i<elements.length; i++) {
                    elements[i].className = "website";
                }
                for(var i=0; i<this.pois.length; i++){
                    cid = this.pois.at(i).cid;
                    document.getElementById('blue#'+cid).className = "button_blue invisible";
                    document.getElementById('red#'+cid).className = "button_red invisible";
                }
                for(var i=0; i<this.events.length; i++){
                    cid = this.events.at(i).cid;
                    document.getElementById('blue#'+cid).className = "button_blue invisible";
                    document.getElementById('red#'+cid).className = "button_red invisible";
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
            $(this.el).append($(this.poilistview.el));
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