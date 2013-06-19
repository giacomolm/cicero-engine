define(["zepto", "underscore", "backbone", "handlebars","models/Poi","collections/Pois","views/poiListItemView","text!templates/poiListView.html"],
    function ($, _, Backbone, Handlebars,Poi,Pois,poiListItemView, template) {

    var poiListView = Backbone.View.extend({

        tagName : "ul",
        
        template: Handlebars.compile(template),

        initialize: function (pois) {
            this.pois = pois;
            this.pois.firebase.on("value",this.render,this);
        },
        
        render: function (eventName) {
            $(this.el).html(this.template());
            
            for(i=0;i<this.pois.length;i++){
                poi = this.pois.at(i);
                $(this.el).append(new poiListItemView({
                    model : poi
                  }).render().el);
            }
            
            return this;
        }
      });

    return poiListView;

  });