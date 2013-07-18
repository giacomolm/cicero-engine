define(["zepto", "underscore", "backbone", "handlebars","klass","photoswipe","collections/Favourites","collections/Medias","text!templates/eventDetailView.html"],
    function ($, _, Backbone, Handlebars,Klass,Photoswipe,Favourites,Medias,template) {

    var eventDetailView = Backbone.View.extend({

        template: Handlebars.compile(template),
        
        events: {
            "click #favourite_logo": "updateFavourite",
            //"load #img_fav": "checkFavourite"
        },

        initialize: function () {
            this.render();
            this.favourites = new Favourites();
            this.user = cicero_user;
            $(document).on('DOMSubtreeModified', this.checkFavourite, this);

            if(this.medias == undefined) this.medias = new Medias();
            this.medias.firebase.on("value",this.render,this);
        },

        checkFavourite: function(){
            this.user = cicero_user;
            if(window.document.querySelectorAll('#Gallery a').length>0){
                myPhotoSwipe = Code.PhotoSwipe.attach( 
                        window.document.querySelectorAll('#Gallery a'), 
                                { enableMouseWheel: false , enableKeyboard: false } );
                $(document).off('DOMSubtreeModified', this.checkFavourite);
            }    
          
            fav_icon = document.getElementById('favourite_logo');
            if(fav_icon!=undefined && this.user != undefined){
                favourites = new Favourites();
                id = $("#pageHome").attr('name'); // per semplicità ho salvato l'id nel primo tag del template
                result = favourites.includesCid(this.user.id, id,'event');
                if(result!=-1){
                    $('#favourite_logo').toggleClass("favourite_icon");                    
                }
            }
        },
        
        updateFavourite: function(){
            if(this.user!=undefined){
                fav_icon = document.getElementById('favourite_logo');
                
                if(fav_icon!=undefined){
                    result = this.favourites.includesCid(this.user.id, this.model.id, 'event');
                    if(result==-1){
                        $('#favourite_logo').toggleClass("favourite_icon");
                        this.favourites.add({user : this.user.id, id_ref : this.model.id, type : 'event', notified:"no"});
                    }
                    else{
                        $('#favourite_logo').toggleClass("favourite_icon");
                        this.favourites.remove(this.favourites.get(result));
                    }
                }
            }
            else{
                $('#message').html("You need to login to store element in favourite");
                $('#message_div').show();
            }
        },
        
        render: function (eventName) {
            jsonModel = this.model.toJSON();
            if(this.medias!=undefined)jsonModel.medias = this.medias.getMedias(this.model.id,'event').toJSON();
            $(this.el).html(this.template(jsonModel));
            return this;
        }
      });

    return eventDetailView;

  });