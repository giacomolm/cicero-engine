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
    }
  }
});

/*Main dell'applicazione*/
require(['zepto','domReady','underscore','backbone','router'],
    function ($,domReady, _,Backbone,AppRouter) {

    domReady(function () {
      document.addEventListener("deviceready", run, false);
    });

    function run() {
    	$('#test').append('zepto');
    	document.getElementById("devready").innerHTML = "OnDeviceReady fired.";
    	new AppRouter();
    	Backbone.history.start();
    }
  });
