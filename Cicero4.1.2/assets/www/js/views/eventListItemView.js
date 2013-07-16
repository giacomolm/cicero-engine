define(["zepto", "underscore", "backbone", "handlebars","models/Event","collections/Events","text!templates/eventListItemView.html"],
    function ($, _, Backbone, Handlebars,Event,Events,template) {

    var eventListItemView = Backbone.View.extend({
        
        template: Handlebars.compile(template),
        
        events: {
            "click #itemView": "goToDetails",
            "touchend #edit_favourite": "editFav",
            "swipeLeft" : "editFav",
            "swipeRight" : "editFav",
          },

        initialize: function () {
            this.model.bind("change", this.render, this);
            this.favourites = this.options.favourites;
            this.listenTo(this.favourites, 'add', this.added);
            this.listenTo(this.favourites, 'remove', this.removed);
            this.user = cicero_user;
        },
        editFav: function(){
            if(this.user != undefined){
                result = this.favourites.includesCid(this.user.id, this.model.id, "event");
                if(result==-1)
                    this.favourites.add({user : this.user.id, id_ref : this.model.id, type : 'event'});
                else 
                    this.favourites.remove(this.favourites.get(result));
            }
        },
        added: function(){
            if(this.user != undefined){
                if(document.getElementById('edit')){
                    var result = this.favourites.includesCid(this.user.id, this.model.id, "event");
                    
                    if( $('#edit').hasClass("edit_active")&& result != -1 ){
                        document.getElementById('favouriteevent#'+this.model.id).className = "favourite_icon_active";
                    }
                }
            }
        },
        removed: function(){
            if(this.user != undefined){
                if(document.getElementById('edit')){                
                    
                    if( $('#edit').hasClass("edit_active")&& this.favourites.includesCid(cicero_user.id, this.model.id, "event")==-1){
                        document.getElementById('favouriteevent#'+this.model.id).className = "favourite_icon";
                        }
                }
            }
        },

        getDate : function(){
            rawDate = this.model.get("date").split(',');
            return new Date(rawDate[0],rawDate[1]-1,rawDate[2],rawDate[3],rawDate[4],rawDate[5],0);  
        },
        
        render: function (eventName) {
            var event = this.model.toJSON();
            event.id = this.model.id;
            event.date = this.getDate().toString().substring(0,21);
            $(this.el).html(this.template(event));
            return this;
        },
        
        goToDetails: function () {
            
            if(document.getElementById('edit')){
                if(! $('#edit').hasClass("edit_active"))
                    Backbone.history.navigate("eventDetail/" + this.model.id, {trigger: true});
            }
            else Backbone.history.navigate("eventDetail/" + this.model.id, {trigger: true});
          }
        
      });

    return eventListItemView;

  });