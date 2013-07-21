define(["zepto", "underscore", "backbone", "handlebars","eventDispatcher","text!templates/howToReachUsView.html","async!https://maps.googleapis.com/maps/api/js?key=AIzaSyA0VJtE1wqPiwTV6Up4gPSAVu884ew_yMA&sensor=false"],
    function ($, _, Backbone, Handlebars,EventDispatcher,template) {

    var howToReachUsView = Backbone.View.extend({
    	
    	
        template: Handlebars.compile(template),
       	xPos: 42.358175, 
       	yPos: 13.364621,

        initialize: function () {
        	EventDispatcher.trigger("show_spinner");
        	navigator.geolocation.getCurrentPosition(_.bind(this.setCoord,this), _.bind(this.coordNotSetted,this)); 
        	
        },
        /*handles per la geolocalizzazione*/
        setCoord:function (Position){
        	this.xPos= Position.coords.latitude;
        	this.yPos= Position.coords.longitude;
        	this.gMap();  
        },
        coordNotSetted:function (Position){
        	this.gMap();  
        },

        gMap: function(){
        	/*PROVA GOOGLE*/
        	
        	var directionsService = new google.maps.DirectionsService();
        	var arr = new google.maps.LatLng(42.358175, 13.364621);
        	var par = new google.maps.LatLng(xPos, yPos);
        	var request = {
        		      origin:par,
        		      destination: arr,
        		      travelMode: google.maps.DirectionsTravelMode.DRIVING
        		  };
        	directionsService.route(request, _.bind(this.gReq,this));
        	
        },
        gReq: function(response, status){
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
        	
        	this.render();
        },
        
               
        render: function (eventName) {
        	
        	$(this.el).empty();
            $(this.el).html(this.template(this.context));
            EventDispatcher.trigger("hide_spinner");
            return this;
        }
      });

    return howToReachUsView;

  });