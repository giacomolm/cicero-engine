define(["zepto", "underscore", "backbone","handlebars","models/Event","collections/Events", "leaflet","barcodescanner","text!templates/mapView.html" ],
    function ($, _, Backbone, Handlebars,Event,Events,L,Barcodescanner,template) {

    var mapView = Backbone.View.extend({

        tagName: "div",
        id: "map",
        
        events: {
            "touchend #findme" : "findme"
        },
        
        template: Handlebars.compile(template),

        initialize: function () {
          this.on("inTheDom", this.addMap);  
          this.sw = new L.LatLng(-85.05113, -179.29687, true);
          this.ne = new L.LatLng(51.83578, 171.5625, true);
          this.bounds = new L.LatLngBounds(this.sw, this.ne);
          this.myMarker = new L.marker();
          this.render();

        },

        render: function (eventName) {
          $(this.el).empty();
          $(this.el).html(this.template());
          
          return this;
        },
        
        addMap: function(){
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
        },
        
        findme: function(){
            window.plugins.barcodeScanner.scan( function(result) {
                alert("We got a barcode\n" +
                          "Result: " + result.text + "\n" +
                          "Format: " + result.format + "\n" +
                          "Cancelled: " + result.cancelled);
            }, function(error) {
                alert("Scanning failed: " + error);
                        }
            );
            this.myMarker.setLatLng([-38.82259, 36.91406]);
            this.myMarker.addTo(this.map);
        }
        
      });

    return mapView;

  });