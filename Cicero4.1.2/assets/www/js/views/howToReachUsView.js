define(["zepto", "underscore", "backbone", "handlebars","eventDispatcher","text!templates/howToReachUsView.html","async!https://maps.googleapis.com/maps/api/js?key=AIzaSyA0VJtE1wqPiwTV6Up4gPSAVu884ew_yMA&sensor=false&libraries=places"],
    function ($, _, Backbone, Handlebars,EventDispatcher,template) {

    var howToReachUsView = Backbone.View.extend({
    	
    	
    	
    	events: {
            "touchstart #route" : "route",
            "touchstart #find" : "find"
          },
    	
        template: Handlebars.compile(template),
        
        /*coordinates of the event*/
       	xPos: 42.357957,
       	yPos: 13.364427,
       	
       	state:1,

        initialize: function () {
        	EventDispatcher.trigger("show_spinner");
        	this.on("inTheDom", this.InitMap);
        	this.render();
        },
        
        

        /*Initializzation with a event-centered map*/
        InitMap: function(){
        	
        	document.getElementById('gmap-cont').style.height = (window.innerHeight-120)+"px";
            EventDispatcher.trigger("changeTitle","How to reach us");
        	
        	if(this.state==1){
                this.state=2;
                var mapOptions = {
                    zoom: 8,
                    center: new google.maps.LatLng(this.xPos, this.yPos),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                this.map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
                this.marker = new google.maps.Marker({
                    position: new google.maps.LatLng(this.xPos, this.yPos),
                    map: this.map,
                });
                this.directionsService = new google.maps.DirectionsService();
                this.directionsDisplay = new google.maps.DirectionsRenderer();
        	}
        },
        
        
        find:function(){
            EventDispatcher.trigger("show_spinner");
        	navigator.geolocation.getCurrentPosition(_.bind(this.setCoord,this), _.bind(this.coordNotSet,this));
        },

        /*geolocalizzation handles*/
        setCoord:function (Position){
            this.myXPos= Position.coords.latitude;
            this.myYPos= Position.coords.longitude;
            this.gMap();
        },

        coordNotSet:function (Position){
            EventDispatcher.trigger("showMessage","Unable to Geolocalize");
        },
        
        route: function(){
            EventDispatcher.trigger("show_spinner");
        	this.myLoc=document.getElementById('input_partenza').value;
        	this.gMap2();
        },

        /*after geolocalizzating the device we can ask route to google*/
        gMap: function(){
        	arr = new google.maps.LatLng(42.358175, 13.364621);
        	par = new google.maps.LatLng(this.myXPos, this.myYPos);
        	request = {
        		      origin:par,
        		      destination: arr,
        		      travelMode: google.maps.DirectionsTravelMode.DRIVING
        		  };
        	this.directionsService.route(request, _.bind(this.gReq,this));
        	
        },
        
        gMap2: function(){
	        arr = new google.maps.LatLng(42.358175, 13.364621);
	        par = this.myLoc;
	        request = {
	        	      origin:par,
	        	      destination: arr,
	        	      travelMode: google.maps.DirectionsTravelMode.DRIVING
	        };
	        this.directionsService.route(request, _.bind(this.gReq,this));
	        	
	    },
        
        gReq: function(response, status){
        	if (status == google.maps.DirectionsStatus.OK) {
        	    this.marker.setMap(null);
        		this.directionsDisplay.setMap(this.map);
        		this.directionsDisplay.setPanel(document.getElementById("directionsPanel"));
        		this.directionsDisplay.setDirections(response);
      	    }
            EventDispatcher.trigger("hide_spinner");
        },
        
               
        render: function (eventName) {
        	
        	$(this.el).empty();
            $(this.el).html(this.template());
            EventDispatcher.trigger("hide_spinner");
            return this;
        }
      });

    return howToReachUsView;

  });