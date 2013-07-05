/*inizializazzione require*/
require.config({
  paths: {
    domReady: '../lib/require/domReady',
    text: '../lib/require/text-1.0.6',
    async: '../lib/require/async',
    zepto: '../lib/zepto/zepto',
    underscore: '../lib/underscore/underscore-min',
    backbone: '../lib/backbone/backbone',
    eventDispatcher: '../lib/backbone/eventDispatcher',
    handlebars: '../lib/handlebars/handlebars',
    firebase: '../lib/firebase/firebase',
    backfire: '../lib/firebase/backfire',
    fireauth: '../lib/firebase/firebase-auth-client',
    leaflet: '../lib/leaflet/leaflet',
    barcodescanner: '../lib/barcodescanner/barcodescanner',
    templates: '../templates'
  },
  shim: {
    'zepto': {
      exports: '$'
    },
    'underscore': {
    exports: '_'
    },
    'backbone': {
        deps: ['zepto', 'underscore'],
        exports: 'Backbone'
    },
    'handlebars': {
        exports: 'Handlebars'
    },
    'firebase': {
    	exports: 'Firebase'
    },
    'backfire': {
    	deps: ['backbone','firebase'],
    	exports: 'Backfire'
    },
    'fireauth': {
      deps: ['firebase'],
      exports: 'Fireauth'
    },
    'leaflet': {
        exports: 'L'
    },
    'barcodescanner': {
        exports: 'Barcodescanner'
    }
  }
});

/*Main dell'applicazione*/
require(['zepto','domReady','underscore','backbone','firebase','fireauth','eventDispatcher','router'],
    function ($,domReady, _,Backbone,Firebase,Fireauth,EventDispatcher,AppRouter) {

    domReady(function () {
      document.addEventListener("deviceready", run, false);
    });

    function run() {

        firebaseRef = new Firebase('https://cicero.firebaseio.com');
        authClient = new FirebaseAuthClient(firebaseRef, function(error, user) {
            if (error) {
                /*login error*/
                switch(error.code) {
                    case 'INVALID_EMAIL':
                    case 'INVALID_PASSWORD':
                        EventDispatcher.trigger("login_fields_error");
                        break;
                    case 'INVALID_USER':
                        EventDispatcher.trigger("login_user_error");
                        break;
                    case 'UNKNOWN_ERROR':
                        EventDispatcher.trigger("login_unknown_error");
                }
            } else if (user) {
                    /*user si logga*/
                    cicero_user = user;
                    Backbone.history.navigate("map", {trigger: true});

                    } else {
                            /*user si slogga*/
                            cicero_user = undefined;
                            Backbone.history.navigate("login", {trigger: true});
                    }
          });
        
    	new AppRouter();
    	Backbone.history.start();
    }
  });
