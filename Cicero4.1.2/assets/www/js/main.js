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
    photoswipe: '../lib/photoswipe/photoswipe',
    klass: '../lib/photoswipe/klass',
    statusbarnotification: '../lib/statusbarnotification/statusbarnotification',
    ciceronotifier: '../lib/modules/ciceroNotifier',
    ciceroauthentication: '../lib/modules/ciceroAuthentication',
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
    },
    'statusbarnotification':{
        exports: 'Statusbarnotification'
    },
    'ciceronotifier':{
        exports: 'Ciceronotifier'
    },
    'klass': {
        exports: 'Klass'
    },
    'photoswipe': {
        deps: ['klass'],
        exports: 'Photoswipe'
    }
  }
});

/*Main dell'applicazione*/
require(['zepto','domReady','underscore','backbone','firebase','fireauth','ciceroauthentication','eventDispatcher','router'],
    function ($,domReady, _,Backbone,Firebase,Fireauth,Ciceroauthentication,EventDispatcher,AppRouter) {

    domReady(function () {
      document.addEventListener("deviceready", run, false);
    });

    function run() {

        Ciceroauthentication.init();

    	new AppRouter();
    	Backbone.history.start();
    }
  });
