define(["zepto", "underscore", "backbone", "handlebars","models/Poi","collections/Pois","text!templates/poiListItemView.html"],
    function ($, _, Backbone, Handlebars,Poi,Pois,template) {

    var poiListItemView = Backbone.View.extend({
        
        template: Handlebars.compile(template),
        
        events: {
            "click #itemView": "goToDetails",
            "touchend #edit_favourite": "editFav",
          },

        initialize: function () {
            this.model.bind("change", this.render, this);
            this.favourites = this.options.favourites;
            this.listenTo(this.favourites, 'add', this.added);
            this.listenTo(this.favourites, 'remove', this.removed);
        },

        editFav: function(){        
            user_id = 0;
            result = this.favourites.includesCid(user_id, this.model.cid);
            if(result==0)
                this.favourites.add({user : user_id, id_ref : this.model.cid, type : 'poi'});
            else 
                this.favourites.remove(this.favourites.get(result));
        },

        added: function(){
            if(document.getElementById('edit')){
                if( $('#edit').hasClass("edit_active")&& this.favourites.includesCid(0, this.model.cid)!=0){
                    document.getElementById('favourite#'+this.model.cid).className = "favourite_icon_active";
                    //document.getElementById('red#'+this.model.cid).className = "button_red";
                    //document.getElementById('blue#'+this.model.cid).className = "button_blue invisible";
                }
            }
        },
        removed: function(){
            if(document.getElementById('edit')){
                if( $('#edit').hasClass("edit_active")&& this.favourites.includesCid(0, this.model.cid)==0){
                    document.getElementById('favourite#'+this.model.cid).className = "favourite_icon";
                    //document.getElementById('red#'+this.model.cid).className = "button_red invisible";
                    //document.getElementById('blue#'+this.model.cid).className = "button_blue";
                }
            }
        },
        render: function (eventName) {
            var poi = this.model.toJSON();
            poi.cid = this.model.cid;
            $(this.el).html(this.template(poi));
            return this;
        },
        
        goToDetails: function () {
            //il controllo serve per evitare il click sul bottone di add/remove nella vista favourite si propaghi sul div che lo contiene
            if(document.getElementById('edit')){
              if(! $('#edit').hasClass("edit_active"))
                  Backbone.history.navigate("poiDetail/" + this.model.cid, {trigger: true});
            } 
            else Backbone.history.navigate("poiDetail/" + this.model.cid, {trigger: true});
                
          }
        
      });

    return poiListItemView;

  });