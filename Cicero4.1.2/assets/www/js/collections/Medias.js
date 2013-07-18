define(["zepto", "underscore", "backbone", "models/Media","backfire"],
    function ($,_,Backbone,Media,Backfire) {

    var Medias = Backbone.Firebase.Collection.extend({
        model: Media,
        firebase: new Firebase("https://cicero.firebaseio.com/medias"),
        getMedias: function(id, type){
            medias = new Backbone.Collection(this.filter(function(media) {
                if(media.get("id_ref")==id && media.get("type_ref")==type)
                    return media;
            }));
            return medias;
        }
      });
    
    return Medias;

  });