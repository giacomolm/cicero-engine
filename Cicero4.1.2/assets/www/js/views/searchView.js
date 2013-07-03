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
            "keyup #search_field" : "search"
        },

        initialize: function () {
            this.pois = this.options.pois;
            this.poilistview = new poiListView({collection: this.pois});
            this.render();
        },

        setEvents: function(events){
            this.events = events;
            this.eventlistview = new eventListView({collection: events});
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
           
            return this;
        },
        
        renderSearchResult: function(){
            $(this.el).append($(this.poilistview.el));
            $(this.el).append($(this.eventlistview.el));
        }
        
        
      });

    return searchView;

  });