define(["zepto", "underscore", "backbone","handlebars","models/Poi","collections/Pois", "leaflet","barcodescanner","eventDispatcher","text!templates/mapView.html","text!templates/templateMarkers.html" ],
    function ($, _, Backbone, Handlebars,Poi,Pois,L,Barcodescanner,EventDispatcher,template,templateMarkers) {

    var mapView = Backbone.View.extend({
        
        events: {
            "touchstart #findme" : "findme",
            "touchstart #floor0":  "floor0",
            "touchstart #floor1":  "floor1"
        },
        
        template: Handlebars.compile(template),
        templateMarkers: Handlebars.compile(templateMarkers),

        initialize: function (options) { /* we can pass in the options floor, centerLat and centerLng*/

          /* by default floor is 0, if another one is passed we use it*/
          this.floor = 0;
          if(this.options.floor)
            this.floor = this.options.floor;

          /*we load mapdata*/
          this.loadMapdata();

          /*default latitude value indicates map latitude center, if another one is passed we use it*/
          if(this.options.centerLat)
            this.centerLat = this.options.centerLat;

          /*default longitude value indicates map longitude center, if another one is passed we use it*/
          if(this.options.centerLng)
            this.centerLng = this.options.centerLng;

          /*we define zoom 1 by default, if option centerLat and centerLng
            are defined we put it to 5, in this way we focus on a specific
            marker. When we have to change floor only, we have only to
            specify floor option leaving the others undefined, in that way
            centerLat and centerLng are retrieved  from mapdata file.
          */
          this.zoom = 1;
          if(this.options.centerLat && this.options.centerLng)
            this.zoom = 5;

          this.on("inTheDom", this.addMap);
          this.render();

        },

        loadMapdata: function(){
            /*getting map bound and center by reading mapadata file*/
            var mapdata = $.ajax({type: "GET", url:'img/map/floor'+this.floor+'/mapdata',async: false}).responseText;
            var res = mapdata.split(',');
            this.swLat = res[0];
            this.swLng = res[1];
            this.neLat = res[2];
            this.neLng = res[3];
            this.centerLat = res[4];
            this.centerLng = res[5];
        },

        render: function() {
          $(this.el).empty();
          $(this.el).html(this.template());
          
          return this;
        },
        
        addMap: function(){

            /* filling screen by adapting map height*/
            document.getElementById('map').style.height = (window.innerHeight-(44+58))+"px";

            /*bounds setting*/
            this.sw = new L.LatLng(this.swLat,this.swLng, true);
            this.ne = new L.LatLng(this.neLat,this.neLng, true);
            this.bounds = new L.LatLngBounds(this.sw, this.ne);



            this.map = L.map('map',{
                maxBounds: this.bounds,
                worldCopyJump: true
            }).setView([this.centerLat,this.centerLng], this.zoom, true);
            L.tileLayer('img/map/floor'+this.floor+'/{z}/{x}/{y}.png', {
               minZoom: 0,
               maxZoom: 6,
            continuousWorld: true,
               tms: true
            }).addTo(this.map);
            
            /*once map is loaded we attach addPois event*/
            EventDispatcher.trigger("show_spinner");
            this.collection.firebase.on("value",this.addPois,this);

            
            return this;
        },
        
        findme: function(){
            window.plugins.barcodeScanner.scan(_.bind(function(result) {
                var data = result.text.split(',');
                if(!isNaN(parseFloat(data[0])) && !isNaN(parseFloat(data[1])) && !isNaN(parseInt(data[2]))){

                    this.myMarker = new L.marker();

                    /* if map isn't in the current floor*/
                    if(this.floor != data[2]){
                        this.floor = data[2];
                        this.loadMapdata();
                        this.map.remove(); /* it destroys the current loaded map */
                        this.addMap();
                    }

                    var coords = new L.LatLng(data[0],data[1]);
                    this.myMarker.setLatLng(coords);
                    this.myMarker.setIcon(new L.icon({iconUrl:'img/markers/userMarker.png',iconSize: [22,22]}));
                   
                } else {
                    this.myMarker.setLatLng([this.centerLat,this.centerLng]);
                    this.myMarker.setIcon(new L.icon({iconUrl:'img/markers/questionMarker.png',iconSize: [22,22]}));
                }

                this.myMarker.addTo(this.map);
                //this.map.setView(coords,0,true); /* it causes a leaflet bug... probably it will be fixed in the new version.*/
            },this), 
            function(error) {
                console.log("Scanning problems: " + error);
            }
         );
        },
        
        addPois: function(){
            EventDispatcher.trigger("hide_spinner");
            for(i=0;i<this.collection.length;i++){
                var poi = this.collection.at(i);
                if(poi.get("coord")[2] == this.floor){ /*checking if poi is in the current displayed floor*/
                    var marker = new L.marker();
                    marker.setLatLng(new L.LatLng(poi.get("coord")[0],poi.get("coord")[1]));
                    marker.setIcon(new L.icon({iconUrl:'img/markers/marker-icon.png'}));
                    var poiJson = poi.toJSON();
                    poiJson.cid = poi.cid;
                    marker.bindPopup(this.templateMarkers(poiJson), {closeButton: false});
                    marker.addTo(this.map);
                }
            }
        },

        floor0: function(){
            Backbone.history.navigate("map/0", {trigger: true});
        },

        floor1: function(){
            Backbone.history.navigate("map/1", {trigger: true});
        }
        
      });

    return mapView;

  });