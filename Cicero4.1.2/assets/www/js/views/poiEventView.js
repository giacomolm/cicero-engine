define(["zepto", "underscore", "backbone", "handlebars","eventDispatcher","views/eventListView","collections/Events","collections/Favourites","text!templates/poiEventView.html"],
    function ($, _, Backbone, Handlebars,EventDispatcher,eventListView,Events,Favourites,template) {

    var poiEventView = Backbone.View.extend({

        template: Handlebars.compile(template),

        initialize: function () {            
            EventDispatcher.trigger("changeTitle",this.model.get("name")+" Events");
            this.render();
            this.user = cicero_user;
            this.favourites = new Favourites();
            this.events = new Events();
                //this.model contiene il Poi dal quale abbiamo chiamato la view
            this.events.firebase.on("value", this.setPoiEvent, this);
        },

        setPoiEvent: function(){               
                    
            this.poiEvents = this.getPoiEvents(this.model.get("id"));
            this.eventlistview = new eventListView({collection:this.poiEvents, favourites : this.favourites});
            this.render();
            
        },
        
        //Attention: it return a simple Backbone.Collection
        getPoiEvents: function(poi_id){
            var collection =  new Backbone.Collection();
            for(i=0; i<this.events.length; i++){
                    if(this.events.at(i).get("poi")==poi_id){
                      collection.add(this.events.at(i));
                    }
            }
            return collection;
        },
        
        render: function (eventName) {

            $(this.el).empty();
            $(this.el).html(this.template());            
            if(this.eventlistview){               
                $(this.el).append($(this.eventlistview.el));                
            }

            return this;
        },       
        
      });

    return poiEventView;

  });