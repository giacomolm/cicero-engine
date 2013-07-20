define(["zepto", "underscore", "backbone", "handlebars","eventDispatcher","async!https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false","text!templates/howToReachUsView.html"],
    function ($, _, Backbone, Handlebars,EventDispatcher,google,template) {

    var howToReachUsView = Backbone.View.extend({

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
        	this.gooDir();  
        },
        coordNotSetted:function (Position){
        	this.context.xPos= 42.35718;
        	this.context.yPos= 13.363579;
        	this.gooDir();  
        },

        gooDir: function(){
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
        	
        	/*FINE PROVA GOOGLE*/
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