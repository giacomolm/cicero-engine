define(["zepto", "underscore", "backbone", "handlebars","eventDispatcher","text!templates/nearbyPlacesView.html","async!https://maps.googleapis.com/maps/api/js?key=AIzaSyA0VJtE1wqPiwTV6Up4gPSAVu884ew_yMA&sensor=false&libraries=places"],
    function ($, _, Backbone, Handlebars,EventDispatcher,template) {

    var NearbyPlacesView = Backbone.View.extend({
    	
    	
    	
    	events: {
            "touchstart #shop" : "shop",
            "touchstart #park" : "park",
            "touchstart #hotel" : "hotel",
            "touchstart #restaurant" : "restaurant",
            "touchstart #hospital" : "hospital",
            "touchstart #gsearch" : "gsearch"

          },
    	
        template: Handlebars.compile(template),
        
        /*coordinates of the event*/
       	xPos: 42.357957,
       	yPos: 13.364427,
       	state: 1,

       	markersArray:[],
          
       	clearOverlays: function () {
        	  for (var i = 0; i < this.markersArray.length; i++ ) {
        	    this.markersArray[i].setMap(null);
        	  }
        	  this.markersArray = [];
       	},
       	
        initialize: function () {
        	EventDispatcher.trigger("show_spinner");
        	
        	this.on("inTheDom", this.InitMap);
        	this.render();
        },
        
        

        /*Initializzation with a event-centered map*/
        InitMap: function(){
        	
        	document.getElementById('gmap-cont').style.height = (window.innerHeight-120)+"px";
        	EventDispatcher.trigger("changeTitle","Nearby Places");
        	
        	if(this.state==1){
	        	this.state=2;
	        	var mapOptions = {
	        		    zoom: 8,
	        		    center: new google.maps.LatLng(this.xPos, this.yPos),
	        		    mapTypeId: google.maps.MapTypeId.ROADMAP
	        		  };
	        	this.map = new google.maps.Map(document.getElementById('nearby_map-canvas'),mapOptions);
	        	var marker = new google.maps.Marker({
	        	      position: new google.maps.LatLng(this.xPos, this.yPos),
	        	      map: this.map,
	        	      title:"Parchi d'Italia"
        	  });
	        	this.service = new google.maps.places.PlacesService(this.map);
	        	this.infowindow = new google.maps.InfoWindow();
        	
        	}
        },
        
        shop: function(){
            document.getElementById('input_nearby').value="shops";
            this.gsearch();
        },

        park: function(){
            document.getElementById('input_nearby').value="parks";
            this.gsearch();
        },

        hotel: function(){
            document.getElementById('input_nearby').value="hotels";
            this.gsearch();
        },

        restaurant: function(){
            document.getElementById('input_nearby').value="restaurants";
            this.gsearch();
        },

        hospital: function(){
            document.getElementById('input_nearby').value="hospitals";
            this.gsearch();
        },
        
        gsearch: function(){
        	this.clearOverlays();
        	search=document.getElementById('input_nearby').value;
        	var center = new google.maps.LatLng(this.xPos, this.yPos);
        	var request = {
        		    location: center,
        		    radius: 10000,
        		    types: [search]
        		  };
        	
        	this.service.nearbySearch(request, _.bind(this.rendRes,this));
        },
        
        rendRes: function(results, status){
            EventDispatcher.trigger("closeMessage");
        	if (status == google.maps.places.PlacesServiceStatus.OK) {
        	    for (var i = 0; i < results.length; i++) {
        	      this.createMarker(results[i]);
        	    }
        	  } else {
                EventDispatcher.trigger("showMessage","Nothing found!");
            }
        	
        },
        
        createMarker: function(place) {
        	 
        	  var marker = new google.maps.Marker({
        	    map: this.map,
        	    position: place.geometry.location
        	  });
        	  
        	  google.maps.event.addListener(marker, 'click', _.bind(function(){
        		    this.infowindow.setContent(place.name);
        		    this.infowindow.open(this.map,marker);
        		  },this));

             this.markersArray.push(marker);
        },
        
        render: function (eventName) {
        	
        	$(this.el).empty();
            $(this.el).html(this.template());
            EventDispatcher.trigger("hide_spinner");
            return this;
        }
      });

    return NearbyPlacesView;

  });