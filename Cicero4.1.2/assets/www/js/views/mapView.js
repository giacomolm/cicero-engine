define(["zepto", "underscore", "backbone","handlebars","models/Event","collections/Events", "leaflet","text!templates/mapView.html" ],
    function ($, _, Backbone, Handlebars,Event,Events,L,template) {

    var mapView = Backbone.View.extend({

        template: Handlebars.compile(template),

        initialize: function () {

          this.miei_eventi = new Events;
          this.miei_eventi.firebase.on('value',this.render,this);
          
          this.sw = new L.LatLng(-85.05113, -179.29687, true);
          this.ne = new L.LatLng(51.83578, 171.5625, true);
          this.bounds = new L.LatLngBounds(this.sw, this.ne);
          this.render();

        },

        render: function (eventName) {
          $(this.el).empty();
          //this.mio_evento = this.miei_eventi.at(1); 
          $(this.el).html(this.template());
          
          this.map = L.map('map',{
              maxBounds: this.bounds,
              worldCopyJump: true
          }).setView([-38.82259, 36.91406], 1, true);
          L.tileLayer('img/map/{z}/{x}/{y}.png', {
             minZoom: 0,
             maxZoom: 3,
          continuousWorld: true,
             tms: true
          }).addTo(map);
          //map.setMaxBounds(bounds);
          
          
          return this;
        }
      });

    return mapView;

  });