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
            this.user_id = 0;
        },
        editFav: function(){
            result = this.favourites.includesCid(this.user_id, this.model.cid);
            if(result==0)
                this.favourites.add({user : user_id, id_ref : this.model.cid, type : 'event'});
            else 
                this.favourites.remove(this.favourites.get(result));
        },
        added: function(){
            if(document.getElementById('edit')){
                if( $('#edit').hasClass("edit_active")&& this.favourites.includesCid(0, this.model.cid)!=0){
                    document.getElementById('favourite#'+this.model.cid).className = "favourite_icon_active";
                }
            }
        },
        removed: function(){
            if(document.getElementById('edit')){
                if( $('#edit').hasClass("edit_active")&& this.favourites.includesCid(0, this.model.cid)==0){
                    document.getElementById('favourite#'+this.model.cid).className = "favourite_icon";
                    }
            }
        },

        render: function (eventName) {
            var event = this.model.toJSON();
            event.cid = this.model.cid;
            $(this.el).html(this.template(event));
            return this;
        },
        
        goToDetails: function () {
            if(document.getElementById('edit')){
                if(! $('#edit').hasClass("edit_active"))
                    Backbone.history.navigate("eventDetail/" + this.model.cid, {trigger: true});
            }
            else Backbone.history.navigate("eventDetail/" + this.model.cid, {trigger: true});
          }
        
      });

    return eventListItemView;

  });