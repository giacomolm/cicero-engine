define(["zepto", "underscore", "backbone", "handlebars","models/Poi","collections/Pois","text!templates/poiListItemView.html"],
    function ($, _, Backbone, Handlebars,Poi,Pois,template) {

    var poiListItemView = Backbone.View.extend({
        
        template: Handlebars.compile(template),
        
        events: {
            "click #itemView": "goToDetails"
          },

        initialize: function () {
            this.model.bind("change", this.render, this);
        },

        render: function (eventName) {
            var poi = this.model.toJSON();
            poi.cid = this.model.cid;
            $(this.el).html(this.template(poi));
            return this;
        },
        
        goToDetails: function () {
            Backbone.history.navigate("poiDetail/" + this.model.cid, {trigger: true});
          }
        
      });

    return poiListItemView;

  });