define(["zepto", "underscore", "backbone","handlebars","models/Event","collections/Events", "leaflet","text!templates/mapView.html" ],
    function ($, _, Backbone, Handlebars,Event,Events,L,template) {

    var mapView = Backbone.View.extend({

        tagName: "div",
        id: "map",
        
        template: Handlebars.compile(template),

        initialize: function () {
          this.sw = new L.LatLng(-85.05113, -179.29687, true);
          this.ne = new L.LatLng(51.83578, 171.5625, true);
          this.bounds = new L.LatLngBounds(this.sw, this.ne);
          this.render();

        },

        render: function (eventName) {
          $(this.el).empty();
          $(this.el).html(this.template());
          $('#container').append($(this.el)); /* da trovare un modo migliore */
          this.map = L.map('map',{
              maxBounds: this.bounds,
              worldCopyJump: true
          }).setView([-38.82259, 36.91406], 1, true);
          L.tileLayer('img/map/{z}/{x}/{y}.png', {
             minZoom: 0,
             maxZoom: 3,
          continuousWorld: true,
             tms: true
          }).addTo(this.map);
          
          return this;
        }
      });

    return mapView;

  });