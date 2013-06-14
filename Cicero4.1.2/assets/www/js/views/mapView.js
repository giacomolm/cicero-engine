define(["zepto", "underscore", "backbone","handlebars","models/Poi","collections/Pois", "leaflet","barcodescanner","text!templates/mapView.html","text!templates/templateMarkers.html" ],
    function ($, _, Backbone, Handlebars,Poi,Pois,L,Barcodescanner,template,templateMarkers) {

    var mapView = Backbone.View.extend({

        tagName: "div",
        id: "map",
        
        events: {
            "touchend #findme" : "findme"
        },
        
        template: Handlebars.compile(template),
        templateMarkers: Handlebars.compile(templateMarkers),

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
            
            this.sw = new L.LatLng(-85.11142,-180, true);
            this.ne = new L.LatLng(11.0059,-44.64844, true);
            this.bounds = new L.LatLngBounds(this.sw, this.ne);
            this.myMarker = new L.marker();
            
            this.map = L.map('map',{
                maxBounds: this.bounds,
                worldCopyJump: true
            }).setView([-53.64464,-112.32422], 1, true);
            L.tileLayer('img/map/{z}/{x}/{y}.png', {
               minZoom: 0,
               maxZoom: 6,
            continuousWorld: true,
               tms: true
            }).addTo(this.map);
            
            return this;
        },
        
        findme: function(){
            window.plugins.barcodeScanner.scan( function(result) {
                alert("test");
                this.myMarker.setLatLng([-53.64464,-112.32422]);
                this.myMarker.addTo(this.map);
            }, 
            function(error) {
                console.log("Scanning failed: " + error);
            }
            );   
        },
        
        addPois: function(){
            for(i=0;i<this.pois.length;i++){
                var poi = this.pois.at(i);
                var marker = new L.marker();
                marker.setLatLng(new L.LatLng(poi.get("coord")[0],poi.get("coord")[1]));
                marker.setIcon(new L.icon({iconUrl:'img/markers/marker-icon.png'}));
                var poiJson = poi.toJSON();
                poiJson.cid = poi.cid;
                marker.bindPopup(this.templateMarkers(poiJson), {closeButton: false});
                marker.addTo(this.map);
            }
        }
        
      });

    return mapView;

  });