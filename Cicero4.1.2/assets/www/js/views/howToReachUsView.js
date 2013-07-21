define(["zepto", "underscore", "backbone", "handlebars","eventDispatcher","text!templates/howToReachUsView.html","async!https://maps.googleapis.com/maps/api/js?key=AIzaSyA0VJtE1wqPiwTV6Up4gPSAVu884ew_yMA&sensor=false"],
    function ($, _, Backbone, Handlebars,EventDispatcher,template) {

    var howToReachUsView = Backbone.View.extend({
    	
    	
        template: Handlebars.compile(template),
        context: {
        	xPos: 42.35718,
        	yPos: 13.363579,
        	status: "free",
        	test: "bho",
        		jjj: "fanculo"
        },

        initialize: function () {
        	EventDispatcher.trigger("show_spinner");
        	//navigator.geolocation.getCurrentPosition(_.bind(this.setCoord,this), _.bind(this.coordNotSetted,this)); 
        	this.gMap();
        },
        /*handles per la geolocalizzazione*/
        setCoord:function (Position){
        	this.context.xPos= Position.coords.latitude;
        	this.context.yPos= Position.coords.longitude;
        	this.gMap();  
        },
        coordNotSetted:function (Position){
        	this.context.xPos= 42.35718;
        	this.context.yPos= 13.363579;
        	this.gMap();  
        },

        gMap: function(){
        	/*PROVA GOOGLE*/
        	
        	var directionsService = new google.maps.DirectionsService();
        	var request = {
        		      origin:"Roma",
        		      destination:"Milano",
        		      travelMode: google.maps.DirectionsTravelMode.DRIVING
        		  };
        	directionsService.route(request, _.bind(this.tiPregoDio,this));
        	
        },
        tiPregoDio: function(response, status){
        	if (status == google.maps.DirectionsStatus.OK) {
      	      this.context.status=status;
      	      this.context.test=response.routes[0].legs[0].distance;
      	    this.context.jjj=response;
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