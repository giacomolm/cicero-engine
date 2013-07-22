define(["zepto", "underscore", "backbone", "handlebars","eventDispatcher","text!templates/howToReachUsView.html","async!https://maps.googleapis.com/maps/api/js?key=AIzaSyA0VJtE1wqPiwTV6Up4gPSAVu884ew_yMA&sensor=false"],
    function ($, _, Backbone, Handlebars,EventDispatcher,template) {

    var howToReachUsView = Backbone.View.extend({
    	
    	
        template: Handlebars.compile(template),
        
        /*coordinates of the event*/
       	xPos: 42.358175, 
       	yPos: 13.364621,

        initialize: function () {
        	EventDispatcher.trigger("show_spinner");
        	navigator.geolocation.getCurrentPosition(_.bind(this.setCoord,this), _.bind(this.coordNotSetted,this)); 
        },
        
        /*geolocalizzation handles*/
        setCoord:function (Position){
        	this.xPos= Position.coords.latitude;
        	this.yPos= Position.coords.longitude;
        	this.gMap();  
        },
        coordNotSetted:function (Position){
        	this.gMap();  
        },

        
        /*after geolocalizzating the device we can ask route to google*/
        gMap: function(){        	
        	var directionsService = new google.maps.DirectionsService();
        	var arr = new google.maps.LatLng(42.358175, 13.364621);
        	var par = new google.maps.LatLng(this.xPos, this.yPos);
        	var request = {
        		      origin:par,
        		      destination: arr,
        		      travelMode: google.maps.DirectionsTravelMode.DRIVING
        		  };
        	directionsService.route(request, _.bind(this.gReq,this));
        	
        },
        
        gReq: function(response, status){
        	this.render();
        	if (status == google.maps.DirectionsStatus.OK) {
        		directionsDisplay = new google.maps.DirectionsRenderer();
        		var mapOptions = {
        			    zoom:7,
        			    mapTypeId: google.maps.MapTypeId.ROADMAP,
        			    center: response.routes[0].leg[0].start_location
        			  };
        		map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        		directionsDisplay.setMap(map);
        		directionsDisplay.setPanel(document.getElementById("directionsPanel"));
        		
      	    }
        	
        	
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