define(["zepto", "underscore", "backbone", "handlebars","models/Event","collections/Events","text!templates/eventListItemView.html"],
    function ($, _, Backbone, Handlebars,Event,Events,template) {

    var eventListItemView = Backbone.View.extend({
        
        template: Handlebars.compile(template),
        
        events: {
            "click #itemView": "goToDetails"
          },

        initialize: function () {
            this.model.bind("change", this.render, this);
        },

        render: function (eventName) {
            var event = this.model.toJSON();
            $(this.el).html(this.template(event));
            return this;
        },
        
        goToDetails: function () {
            Backbone.history.navigate("eventDetail/" + this.model.cid, {trigger: true});
          }
        
      });

    return eventListItemView;

  });