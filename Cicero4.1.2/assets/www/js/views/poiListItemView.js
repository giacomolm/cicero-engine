define(["zepto", "underscore", "backbone", "handlebars","models/Poi","collections/Pois","text!templates/poiListItemView.html"],
    function ($, _, Backbone, Handlebars,Poi,Pois,template) {

    var poiListItemView = Backbone.View.extend({
        
        tagName: "li",
        
        template: Handlebars.compile(template),
        
        events: {
            "touchend #itemView": "goToDetails"
          },

        initialize: function (context, cid) {
            this.context = context; 
            this.cid = cid;
            this.render();
        },

        render: function (eventName) {
            $(this.el).empty();
            $(this.el).html(this.template(this.context));
            return this;
        },
        
        goToDetails: function () {
            //Backbone.history.navigate("poiDetail/" + this.cid, {trigger: true});
          }
        
      });

    return poiListItemView;

  });