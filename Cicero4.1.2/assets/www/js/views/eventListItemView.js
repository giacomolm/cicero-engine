define(["zepto", "underscore", "backbone", "handlebars","models/Event","collections/Events","text!templates/eventListItemView.html"],
    function ($, _, Backbone, Handlebars,Event,Events,template) {

    var eventListItemView = Backbone.View.extend({
        
        template: Handlebars.compile(template),
        
        events: {
            "click #itemView": "goToDetails",
            "touchend #add_button": "addToFav",
            "touchend #remove_button": "removeToFav",
          },

        initialize: function () {
            this.model.bind("change", this.render, this);
            this.favourites = this.options.favourites;
            this.listenTo(this.favourites, 'add', this.added);
            this.listenTo(this.favourites, 'remove', this.removed);
        },
        addToFav: function(){
            user_id = 0;
            if(this.favourites.includesCid(user_id, this.model.cid)==0)
                this.favourites.add({user : user_id, id_ref : this.model.cid, type : 'event'});
        },
        removeToFav: function(){
            user_id = 0;
            result = this.favourites.includesCid(user_id, this.model.cid);
            if(result !=0 )
                this.favourites.remove(this.favourites.get(result));
        },
        added: function(){
            if(document.getElementById('edit')){
                if( $('#edit').hasClass("ui-button-error")&& this.favourites.includesCid(0, this.model.cid)!=0){
                    document.getElementById('red#'+this.model.cid).className = "button_red";
                    document.getElementById('blue#'+this.model.cid).className = "button_blue invisible";
                }
            }
        },
        removed: function(){
            if(document.getElementById('edit')){
                if( $('#edit').hasClass("ui-button-error")&& this.favourites.includesCid(0, this.model.cid)==0){
                    document.getElementById('red#'+this.model.cid).className = "button_red invisible";
                    document.getElementById('blue#'+this.model.cid).className = "button_blue";
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
                if(! $('#edit').hasClass("ui-button-error"))
                    Backbone.history.navigate("eventDetail/" + this.model.cid, {trigger: true});
            }
            else Backbone.history.navigate("eventDetail/" + this.model.cid, {trigger: true});
          }
        
      });

    return eventListItemView;

  });