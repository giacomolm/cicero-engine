define(["zepto", "underscore", "backbone", "handlebars","klass","photoswipe","collections/Favourites","collections/Comments","collections/Medias","views/commentView","text!templates/poiDetailView.html"],
    function ($, _, Backbone, Handlebars,Klass,Photoswipe,Favourites,Comments,Medias,commentView,template) {

    var poiDetailView = Backbone.View.extend({

        template: Handlebars.compile(template),
        
        ifcond : Handlebars.registerHelper('ifCond', function(v1,  options) {
            if(v1 === "img") {
              return options.fn(this);
            }
            return options.inverse(this);
          }),
        
        events: {
            "click #favourite_logo": "updateFavourite",
            "click #send" : "send",
            "click #commentsHeader": "showComments",
            "click #login": "login"
            //"load #img_fav": "checkFavourite"
        },

        initialize: function () {
            this.render();
            this.favourites = new Favourites();
            if(this.favourites!= undefined && this.favourites.length==0)
                 this.favourites.on("add", this.updateFavourite, this);
            
            if(this.comments==undefined){
                this.comments = new Comments();
                this.comments.comparator = function(comment) {
                    return comment.get("date");
                  };
                this.comments.firebase.on("value",this.renderComments,this);
            }
            
            $(document).on('DOMSubtreeModified', this.checkFavourite, this);
            this.user = cicero_user;
            if(this.medias == undefined) this.medias = new Medias();
                      
            this.medias.firebase.on("value",this.manageMedia,this);
            
            
        },

        checkFavourite: function(medias){
            //nel caso il checkMedia non è chiamato automaticamente dall'evento DOMSubtreeModified, controllo se devo staccare l'evente
            if(medias instanceof Medias){
                if(medias.length==0)
                    $(document).off('DOMSubtreeModified', this.checkFavourite);
            }
            else{
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
                    
                    if(favourites > 0 && id!=null){
                        result = favourites.includesCid(this.user.id, id, 'poi');
                        
                        if(result!=-1){
                            $('#favourite_logo').toggleClass("favourite_icon");                    
                        }
                        $(document).off('DOMSubtreeModified', this.checkFavourite);
                    }
                }
            }
            
        },
        
        manageMedia : function(){            
            this.render();
            //in questo caso sono sicuro che i media sono stati correttamente caricati, quindi devo poter staccare l'evento se il numero di immagini nei media è 0
            this.checkFavourite(this.medias);  
            
        },
        
        updateFavourite: function(){
            if(this.user!=undefined){
                fav_icon = document.getElementById('favourite_logo');
                
                if(fav_icon!=undefined){
                    result = this.favourites.includesCid(this.user.id, this.model.id, 'poi');
                    if(result==-1){
                        $('#favourite_logo').toggleClass("favourite_icon");
                        this.favourites.add({user : this.user.id, id_ref : this.model.id, type : 'poi'});
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
        
        send: function(){
            if(this.user!=undefined && $("#Message").val()!=""){
                this.comments.add({"id_ref" : this.model.id, "type" : "poi", "text" : $("#Message").val(), "user" : this.user.name, "date" : new Date().getTime()});
                $("#Message").val("");
            }
        },
        
        render: function (eventName) {
            jsonModel = this.model.toJSON();
            if(this.medias!=undefined)jsonModel.medias = this.medias.getMedias(this.model.id,'poi').toJSON();
            if(this.comments!=undefined)jsonModel.comments_num = this.comments.getComments(this.model.id, "poi").length;;
            $(this.el).html(this.template(jsonModel));
            
            return this;
        },
        
        renderComments: function(){
            
            if(this.comments != undefined && document.getElementById('Comments')!=null){
                $("#Comments").empty();
                var comments = this.comments.getComments(this.model.id, "poi");
                if(document.getElementById("comment_title")!=null) document.getElementById("comment_title").innerHTML = "Comments ("+comments.length+")";
                for(i=0;i<comments.length;i++){
                    var comment = comments.at(i);
                    el = (new commentView({model : comment})).render().el;
                    document.getElementById('Comments').appendChild(el);
                }
                if(this.user!=undefined){
                    document.getElementById("messageForm").className = "";
                    document.getElementById("loginText").className = "invisible";
                }
                else document.getElementById("loginText").className = "";
            }
        },
        
        showComments: function(){
            if(document.getElementById('Comments')){
                if($('#Comments').hasClass('invisible')){
                    this.renderComments();
                }
                $('#Comments').toggleClass('invisible');
                $('#arrow').toggleClass('arrow_up');
            }
        },
        
        login: function(){
            Backbone.history.navigate("login", {trigger: true});
        }
        
      });       

    return poiDetailView;

  });
