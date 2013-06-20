define(["zepto", "underscore", "backbone", "handlebars","views/poiListView","views/eventListView","text!templates/searchView.html"],
    function ($, _, Backbone, Handlebars, poiListView, eventListView, template) {

    var searchView = Backbone.View.extend({

        template: Handlebars.compile(template),
        
        events : {
            "click #poiTab" : "showPoi",
            "click #eventTab" : "showEvent",
            
            "swipeRight" : "showPoi",
            "swipeLeft" : "showEvent"
        },

        initialize: function () {
            this.pois = this.options.pois;
            this.poilistview = new poiListView({collection: this.pois});
            this.render();
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
        
        setEvents: function(events){
            this.events = events;
            this.eventlistview = new eventListView({collection: events});
            $(this.el).append($(this.eventlistview.el));
        }
        
      });

    return searchView;

  });