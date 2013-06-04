define(["zepto", "underscore", "backbone","handlebars","models/Event","collections/Events","text!templates/mapView.html"],
    function ($, _, Backbone, Handlebars,Event,Events,template) {

    var mapView = Backbone.View.extend({

        template: Handlebars.compile(template),

        initialize: function () {
          //this.model.bind("reset", this.render, this);
          /*this.mio_evento = new Event({
        	  name: "Vini3",
        	  title: "vini titolo2",
        	  description: "degustazione vini2"
          });*/

          this.miei_eventi = new Events;
          var self = this;
          this.miei_eventi.firebase.on('value', function(snapshot){
        	    self.render();
        	});
          //this.miei_eventi.add(this.mio_evento);
        },

        render: function (eventName) {
          $(this.el).empty();
          this.mio_evento = this.miei_eventi.at(1); 
          $(this.el).html(this.template(this.mio_evento.toJSON()));
          return this;
        }
      });

    return mapView;

  });