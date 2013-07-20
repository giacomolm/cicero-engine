define(["zepto", "underscore", "backbone", "handlebars","eventDispatcher","async!https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=mapLoaded","text!templates/howToReachUsView.html"],
    function ($, _, Backbone, Handlebars,EventDispatcher,google,template) {

    var howToReachUsView = Backbone.View.extend({
    	
    	cLoad: false,
    	gLoad: false,

        template: Handlebars.compile(template),
        context: {
        	xPos: 42.35718,
        	yPos: 13.363579,
        	status: "free",
        	test: "bho"
        },

        initialize: function () {
        	EventDispatcher.trigger("show_spinner");
        	navigator.geolocation.getCurrentPosition(_.bind(this.setCoord,this), _.bind(this.coordNotSetted,this));            
        },
        /*handles per la geolocalizzazione*/
        setCoord:function (Position){
        	this.context.xPos= Position.coords.latitude;
        	this.context.yPos= Position.coords.longitude;
        	this.cLoad=true;
        	this.allLoaded();  
        },
        coordNotSetted:function (Position){
        	this.context.xPos= 42.35718;
        	this.context.yPos= 13.363579;
        	this.cLoad=true;
        	this.allLoaded();  
        },

        mapLoaded: function(){
        	/*PROVA GOOGLE*/
        	
        	var directionsService = new google.google.maps.DirectionsService();
        	var request = {
        		      origin:"Roma",
        		      destination:"Milano",
        		      travelMode: google.google.maps.DirectionsTravelMode.DRIVING
        		  };
        	directionsService.route(request, function(response, status) {
        	    if (status == google.google.maps.DirectionsStatus.OK) {
        	      this.context.status=status;
        	      test=response.routes[0].legs[0].distance;
        	    }
        	  });
        	this.gLoad=true;
        	/*FINE PROVA GOOGLE*/
        	this.allLoaded();
        },
        
        allLoaded: function(){
        	if(this.cLoad && this.gLoad) this.render();
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