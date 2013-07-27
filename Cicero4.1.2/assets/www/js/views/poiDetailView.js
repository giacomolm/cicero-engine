define(["zepto", "underscore", "backbone", "handlebars","eventDispatcher","klass","photoswipe","collections/Favourites","collections/Comments","collections/Medias","collections/Likes","views/commentView","text!templates/poiDetailView.html"],
    function ($, _, Backbone, Handlebars,EventDispatcher,Klass,Photoswipe,Favourites,Comments,Medias,Likes,commentView,template) {

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
            "click #login": "login",
            "mousedown #like_button": "manageLikes",
            "click #map_button": "map",
            "click #event_logo": "poiEvent" 
        },

        initialize: function () {
            this.render();
            
            this.favourites = new Favourites();
            this.favourites.on("value", this.checkFavourite, this);
            
            if(this.comments==undefined){
                this.comments = new Comments();
                this.comments.comparator = function(comment) {
                    return comment.get("date");
                  };
                this.comments.firebase.on("value",this.renderComments,this);
            }                     
            
            this.user = cicero_user;
            this.medias = new Medias();
            this.medias.firebase.on("value",this.render,this);
            
            this.likes = new Likes();
            this.likes.firebase.on("value",this.checkLikes,this);
            
            this.on('inTheDom', this.checkStatus, this);
            
            EventDispatcher.trigger("changeTitle", this.model.get("name"));
            EventDispatcher.trigger("changeMenuBar");
        },

        //Quando il DOM è effettivamente pronto, allora posso modificare il contenuto
        checkStatus: function(){            

                //this.user = cicero_user;
                //Collegato la libreria di Photoswipe sugli elementi 
                if(window.document.querySelectorAll('#Gallery a').length>0){
                    myPhotoSwipe = Code.PhotoSwipe.attach( 
                            window.document.querySelectorAll('#Gallery a'), 
                                    { enableMouseWheel: false , enableKeyboard: false } );
                    
                }                     
                this.checkFavourite();
                this.checkLikes();
            
        },
        
        checkFavourite: function(){
            if(this.user!=undefined){
                fav_icon = document.getElementById('favourite_logo');
                
                if(fav_icon!=undefined){
                    result = this.favourites.includesCid(this.user.id, this.model.id, 'poi');
                    if(result!=-1){
                        $('#favourite_logo').toggleClass("favourite_icon");                        
                    }
                }
            }
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
        
        checkLikes:function(){
            if(this.user!=undefined){
                if(this.likes!=undefined){
                    //nella variabile result ho l'id se questo esiste, altrimenti -1
                    var result = this.likes.getLikes(this.user.id,this.model.id,"poi");
                    if(result != -1){                                                
                        this.showLike();
                    }
                }
            }
        },
        
        manageLikes:function(){            
            if(this.user!=undefined){
                if(this.likes!=undefined){
                    //nella variabile result ho l'id se questo esiste, altrimenti -1
                    var result = this.likes.getLikes(this.user.id,this.model.id,"poi");
                    if(result == -1){
                        $("#like_logo").addClass("pulse");
                        this.likes.add({"id_ref" : this.model.id, "type" : "poi", "user" : this.user.id});                         
                        this.showLike();
                    }
                    else{
                        $("#like_logo").removeClass("pulse");
                        this.likes.remove(this.likes.get(result));
                        this.removeLike();
                    }
                }
            }
            else{
                $('#message').html("You need to login to like elements");
                $('#message_div').show();
            }
        },
        
        showLike: function(){            
            if(document.getElementById('like_div')){
                var likes = new Likes();
                id = this.model.id;
                var num_likes = likes.getNumLikes(id, "poi");
                $('#like_div').html(num_likes+" Likes");
                
            }
        },
        
        removeLike: function(){
            if(document.getElementById('like_div')){
                $('#like_div').html("Likes It!");                
            }
        },
        
        map:function(){
            Backbone.history.navigate("map/"+this.model.get("coord")[2]+"/"+this.model.get("coord")[0]+"/"+this.model.get("coord")[1], {trigger: true});  
        },
        
        poiEvent: function(){
            Backbone.history.navigate("poiEvent/"+this.model.id, {trigger: true});
        },
        
        render: function (eventName) {
            jsonModel = this.model.toJSON();
            if(this.medias!=undefined)jsonModel.medias = this.medias.getMedias(this.model.id,'poi').toJSON();
            if(this.comments!=undefined)jsonModel.comments_num = this.comments.getComments(this.model.id, "poi").length;;
            $(this.el).html(this.template(jsonModel));
            this.trigger("inTheDom");
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
