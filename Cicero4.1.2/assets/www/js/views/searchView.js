define(["zepto", "underscore", "backbone", "handlebars","models/Poi","collections/Pois","text!templates/searchView.html"],
    function ($, _, Backbone, Handlebars,Poi,Pois,template) {

    var searchView = Backbone.View.extend({

        template: Handlebars.compile(template),

        initialize: function () {
            this.pois = new Pois();
            this.pois.firebase.on("value",this.render,this);
            this.render();
        },

        render: function (eventName) {
            $(this.el).empty();
            poiList = [];
            for(i=0;i<this.pois.length;i++){
                poi = this.pois.at(i);
                poiList[i] =  {title : poi.get("name"), description : poi.get("descrizione")};
            }
            context = {poi : poiList};
            $(this.el).html(this.template(context));
            return this;
        },
        
      });

    return searchView;

  });