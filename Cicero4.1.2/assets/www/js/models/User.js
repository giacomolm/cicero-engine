define(["zepto", "underscore", "backbone"],
  function ($, _, Backbone) {
    var User = Backbone.Model.extend({
      defaults: {
    	  id: 0,
    	  name: undefined,
      }

      });

    return User;

  });