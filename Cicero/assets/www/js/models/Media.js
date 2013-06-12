define(["zepto", "underscore", "backbone"],
  function ($, _, Backbone) {
    var Media = Backbone.Model.extend({
      defaults: {
    	  id: 0,
    	  id_ref: 0,
    	  type_ref: undefined, /* event or poi*/
    	  type: undefined, /* video or img*/
    	  url: undefined
      }

      });

    return Media;

  });