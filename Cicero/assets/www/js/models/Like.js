define(["zepto", "underscore", "backbone"],
  function ($, _, Backbone) {
    var Like = Backbone.Model.extend({
      defaults: {
    	  id: 0,
    	  id_ref: 0,
    	  type: undefined, /* o event o poi*/ 
    	  user: 0 /*riferimento utente*/
      }

      });

    return Like;

  });