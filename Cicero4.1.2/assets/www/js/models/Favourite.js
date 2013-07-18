define(["zepto", "underscore", "backbone"],
  function ($, _, Backbone) {
    var Favourite = Backbone.Model.extend({
      defaults: {
    	  id: 0,
    	  user: 0, /*riferimento*/
    	  id_ref: 0,
    	  type: undefined, /* poi or event*/
          notified: 'no'
      }

      });

    return Favourite;

  });