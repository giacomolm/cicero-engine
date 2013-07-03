/*inizializazzione require*/
require.config({
  paths: {
    domReady: '../lib/require/domReady',
    text: '../lib/require/text-1.0.6',
    async: '../lib/require/async',
    zepto: '../lib/zepto/zepto',
    underscore: '../lib/underscore/underscore-min',
    backbone: '../lib/backbone/backbone',
    handlebars: '../lib/handlebars/handlebars',
    firebase: '../lib/firebase/firebase',
    backfire: '../lib/firebase/backfire',
    fireauth: '../lib/firebase/firebase-auth-client',
    leaflet: '../lib/leaflet/leaflet',
    barcodescanner: '../lib/barcodescanner/barcodescanner',
    templates: '../templates',
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
require(['zepto','domReady','underscore','backbone','firebase','fireauth','router'],
    function ($,domReady, _,Backbone,Firebase,Fireauth,AppRouter) {

    domReady(function () {
      document.addEventListener("deviceready", run, false);
    });

    function run() {
        
    	/* Gestione del login attraverso firebase 
    	 * necessario mettere qui in modo che tali
    	 * var siano visibili in tutta l'app
    	 * */
        firebaseRef = new Firebase('https://cicero.firebaseio.com');
        authClient = new FirebaseAuthClient(firebaseRef, function(error, user) {
            if (error) {
                alert("error during user login");
            } else if (user) {
                   /* variabile globale auth accessibile da qualsiasi parte
                    * nell'app racchiude info e nome dell'utente
                    */
                    cicero_user = user;
                    Backbone.history.navigate("map", {trigger: true});
              
                    } else {
                            // user si slogga
                            cicero_user = undefined;
                    }
          });
        
    	new AppRouter();
    	Backbone.history.start();
    }
  });
