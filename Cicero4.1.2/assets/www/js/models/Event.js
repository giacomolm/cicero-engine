define(["zepto", "underscore", "backbone"],
  function ($, _, Backbone) {
    var Event = Backbone.Model.extend({
      defaults: {
    	//id: 0,
    	//poi: 0,
    	name: undefined,
      	title: undefined,
      	description: undefined,
      	//logo: undefined,
      	date: undefined
      }

      });

    return Event;

  });