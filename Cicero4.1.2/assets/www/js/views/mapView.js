define(["zepto", "underscore", "backbone","handlebars","models/Poi","collections/Pois", "leaflet","barcodescanner","text!templates/mapView.html" ],
    function ($, _, Backbone, Handlebars,Poi,Pois,L,Barcodescanner,template) {

    var mapView = Backbone.View.extend({

        tagName: "div",
        id: "map",
        
        events: {
            "touchend #findme" : "findme"
        },
        
        template: Handlebars.compile(template),

        initialize: function () {
          this.on("inTheDom", this.addMap);
          this.pois = new Pois();
          this.pois.firebase.on("value",this.addPois,this);

          this.render();

        },

        render: function (eventName) {
          $(this.el).empty();
          $(this.el).html(this.template());
          
          return this;
        },
        
        addMap: function(){
            //adattiamo la dimensione della mappa alla grandezza dello schermo
            document.getElementById('map').style.height = (screen.height*0.7)+"px"
            
            this.sw = new L.LatLng(-85.05113, -179.29687, true);
            this.ne = new L.LatLng(51.83578, 171.5625, true);
            this.bounds = new L.LatLngBounds(this.sw, this.ne);
            this.myMarker = new L.marker();
            
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
        },
        
        addPois: function(){
            alert("Arrivano Pois!");
            alert(this.pois.length);
            for(i=0;i<this.pois.length;i++){
                this.ev = this.pois.at(i);
                alert(this.pois.at(i).get("name"));
            }
        }
        
      });

    return mapView;

  });