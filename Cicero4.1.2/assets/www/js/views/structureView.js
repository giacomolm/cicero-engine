define(["zepto","underscore","backbone","handlebars","eventDispatcher",'ciceronotifier','ciceroauthentication',"text!templates/structureView.html"],
    function ($, _, Backbone, Handlebars,EventDispatcher,Ciceronotifier,Ciceroauthentication,template) {
    
    var structureView = Backbone.View.extend({
        events: {
            "touchstart #key_icon" : "logout",
            "touchend #menu_icon" : "toggleMenu",
            "touchend #back": "back",
            "touchstart #map_icon" : "showMap",
            "touchstart #search_icon" : "showSearch",
            "touchstart #favourite_icon" : "showFavourite",
            "touchstart #navigation_icon" : "showReachUs",
            "touchstart #nearby_icon" : "showNearby",
            "touchstart #news_icon" : "showNewssList",
            "touchend #turnoff_icon": "exitFromApp",
            "touchend .close": "closeMessage"
          },
          
        template: Handlebars.compile(template),

        initialize: function () {
            EventDispatcher.on("show_spinner",this.show_spinner);
            EventDispatcher.on("hide_spinner",this.hide_spinner);
            EventDispatcher.on("changeTitle",this.changeTitle);
            EventDispatcher.on("showBackButton",this.showBackButton);
            EventDispatcher.on("showMessage",this.showMessage);
            EventDispatcher.on("closeMessage",this.closeMessage);
            EventDispatcher.on("changeMenuBar", this.changeMenuBar)
            this.render();
        },
        
        logout: function(){
        	$('#popupMenu').addClass('invisible');
            if(typeof cicero_user != undefined){
                Ciceronotifier.off();
                Ciceroauthentication.authClient.logout();
                this.setLogout();
            }
            else Backbone.history.navigate("login", {trigger: true});
            $("#back").addClass("invisible");
        },

        setLogout: function(){
            if(typeof cicero_user === 'undefined')
                $('#logout').html('LOGIN');
            else
                $('#logout').html('LOGOUT');
        },

        toggleMenu: function (eventName) {
            $('#popupMenu').toggleClass('invisible');
        },

        back: function(){
            window.history.back();
        },
        
        showMap: function () { 
        	//this.removeFocus();       	
        	//$('#mapMenuCapt').addClass("menuActive");
        	$('#popupMenu').addClass('invisible');
            Backbone.history.navigate("map", {trigger: true});
        },
        
        showSearch: function () {
        	this.removeFocus();
        	$('#searchMenuCapt').addClass("menuActive");
        	$('#popupMenu').addClass('invisible');
            Backbone.history.navigate("search", {trigger: true});
        },
        
        showFavourite: function () {
        	this.removeFocus();
        	$('#favMenuCapt').addClass("menuActive");
        	$('#popupMenu').addClass('invisible');
            Backbone.history.navigate("favourite", {trigger: true});
        },
        
        showNearby: function () {
        	this.removeFocus();
        	$('#popupMenu').addClass('invisible');
            Backbone.history.navigate("nearbyPlaces", {trigger: true});
        },
        
        showReachUs: function () {
        	this.removeFocus();
        	$('#popupMenu').addClass('invisible');
            Backbone.history.navigate("howToReachUs", {trigger: true});
        },
        
        showPoiList: function () {
        	this.removeFocus();
        	$('#popupMenu').addClass('invisible');
            Backbone.history.navigate("poiList", {trigger: true});
        },
        
        showEventList: function () {
        	this.removeFocus();
        	$('#popupMenu').addClass('invisible');
            Backbone.history.navigate("eventList", {trigger: true});
        },

        showNewssList: function () {
        	this.removeFocus();
        	$('#popupMenu').addClass('invisible');
            Backbone.history.navigate("newssList", {trigger: true});
        },


        show_spinner: function(){
            $('#spinner').removeClass("invisible");
        },

        hide_spinner: function(){
            $('#spinner').addClass("invisible");
        },

        changeTitle: function(title){
            $('#viewTitle').html(title);
        },

        showBackButton: function(){
            $("#back").removeClass("invisible");
        },

        showMessage: function(message){
            $('#message').html(message);
            $('#message_div').show();
        },

        closeMessage: function(){
            $('#message_div').hide();
        },
        
        exitFromApp: function(){
           navigator.app.exitApp();
        },
        
        removeFocus: function(){
        	$('#mapMenuCapt').removeClass("menuActive");
        	$('#searchMenuCapt').removeClass("menuActive");
        	$('#favMenuCapt').removeClass("menuActive");
        },
        changeMenuBar: function(){
        	$('#mapMenuCapt').removeClass("menuActive");
        	$('#searchMenuCapt').removeClass("menuActive");
        	$('#favMenuCapt').removeClass("menuActive");
        },
        
        render: function () {
            $(this.el).empty();
            $(this.el).html(this.template());
            this.setLogout();
            return this;
        }
        
      });

    return structureView;

  });