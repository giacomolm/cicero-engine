define(["zepto", "underscore", "backbone"],
  function ($, _, Backbone) {
    var Favorite = Backbone.Model.extend({
      defaults: {
    	  id: 0,
    	  user: 0, /*riferimento*/
    	  id_ref: 0,
    	  type: undefined	
      }

      });

    return Favorite;

  });