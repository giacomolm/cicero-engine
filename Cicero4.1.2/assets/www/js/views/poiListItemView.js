define(["zepto", "underscore", "backbone", "handlebars","models/Poi","collections/Pois","text!templates/poiListItemView.html"],
    function ($, _, Backbone, Handlebars,Poi,Pois,template) {

    var poiListItemView = Backbone.View.extend({
        
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
            
            result = this.favourites.includesCid(this.user_id, this.model.id);
            if(result==-1)
                this.favourites.add({user : this.user_id, id_ref : this.model.id, type : 'poi'});        
            else{
                this.favourites.remove(this.favourites.get(result));
            }
        },

        added: function(){
            if(document.getElementById('edit')){
                if( $('#edit').hasClass("edit_active")&& this.favourites.includesCid(0, this.model.id)!=-1){
                    document.getElementById('favourite#'+this.model.id).className = "favourite_icon_active";                                      
                }
            }
        },
        removed: function(){
            if(document.getElementById('edit')){
                if( $('#edit').hasClass("edit_active")&& this.favourites.includesCid(0, this.model.id)==-1){
                    document.getElementById('favourite#'+this.model.id).className = "favourite_icon";
                }
            }
        },
        render: function (eventName) {
            var poi = this.model.toJSON();
            poi.id = this.model.id;
            $(this.el).html(this.template(poi));
            return this;
        },
        
        goToDetails: function () {
            //il controllo serve per evitare il click sul bottone di add/remove nella vista favourite si propaghi sul div che lo contiene
            if(document.getElementById('edit')){
              if(! $('#edit').hasClass("edit_active"))
                  Backbone.history.navigate("poiDetail/" + this.model.id, {trigger: true});
            } 
            else Backbone.history.navigate("poiDetail/" + this.model.id, {trigger: true});
          }
        
      });

    return poiListItemView;

  });