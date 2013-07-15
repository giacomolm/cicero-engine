define(["zepto", "underscore", "backbone", "handlebars","klass","photoswipe","collections/Favourites","text!templates/poiDetailView.html"],
    function ($, _, Backbone, Handlebars,Klass,Photoswipe,Favourites,template) {

    var poiDetailView = Backbone.View.extend({

        template: Handlebars.compile(template),
        
        events: {
            "click #favourite_logo": "updateFavourite",
            //"load #img_fav": "checkFavourite"
        },

        initialize: function () {
            this.render();
            this.user_id = 0;
            this.favourites = new Favourites();
            if(this.favourites.length==0)
                 this.favourites.on("value", this.updateFavourite, this);
            //else $(document).on("inthe", this.updateFavourite());
            
            //$(document).on('DOMSubtreeModified', this.checkFavourite);
            
            $(document).on('DOMSubtreeModified', this.checkFavourite, this);
        },

        checkFavourite: function(){
            
            if(window.document.querySelectorAll('#Gallery a').length>0){
                myPhotoSwipe = Code.PhotoSwipe.attach( 
                        window.document.querySelectorAll('#Gallery a'), 
                                { enableMouseWheel: false , enableKeyboard: false } );
                $(document).off('DOMSubtreeModified', this.checkFavourite);
            }    
          
            fav_icon = document.getElementById('favourite_logo');
            if(fav_icon!=undefined){
                favourites = new Favourites();
                id = $("#pageHome").attr('name'); // per semplicitÓ ho salvato l'id nel primo tag del template
                result = favourites.includesCid(0, id);
                if(result==-1){
                    $('#favourite_logo').toggleClass("favourite_icon");                    
                }
            }
        },
        
        updateFavourite: function(){
            
            fav_icon = document.getElementById('favourite_logo');
            
            if(fav_icon!=undefined){
                result = this.favourites.includesCid(this.user_id, this.model.id);
                if(result==-1){
                    $('#favourite_logo').toggleClass("favourite_icon");
                    this.favourites.add({user : this.user_id, id_ref : this.model.id, type : 'poi'});
                }
                else{
                    $('#favourite_logo').toggleClass("favourite_icon");
                    this.favourites.remove(this.favourites.get(result));
                }
            }
        },
        
        
        render: function (eventName) {
            $(this.el).html(this.template(this.model.toJSON()));
            this.trigger('inTheDom');
            
            return this;
        }
      });

    return poiDetailView;

  });