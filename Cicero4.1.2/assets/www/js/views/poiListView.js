define(["zepto", "underscore", "backbone", "handlebars","models/Poi","collections/Pois","views/poiListItemView","text!templates/poiListView.html"],
    function ($, _, Backbone, Handlebars,Poi,Pois,poiListItemView, template) {

    var poiListView = Backbone.View.extend({

        tagName : "ul",
        
        template: Handlebars.compile(template),

        initialize: function () {
            this.pois = new Pois();
            this.pois.firebase.on("value",this.render,this);
        },

        templateLoaded: function (){
            alert(document.getElementById('list_poi'));
        },
        
        render: function (eventName) {
            $(this.el).html(this.template());
            
            for(i=0;i<this.pois.length;i++){
                poi = this.pois.at(i);
                $(this.el).append(new poiListItemView({
                    title : poi.get("name"),
                    description : poi.get("descrizione")
                  }, poi.cid).render().el);
            }
            
            return this;
        }
      });

    return poiListView;

  });