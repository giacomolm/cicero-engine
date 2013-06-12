define(["zepto", "underscore", "backbone"],
  function ($, _, Backbone) {
    var Comment = Backbone.Model.extend({
      defaults: {
    	  id: 0,
    	  id_ref: 0,
    	  type: undefined, /* o event o poi*/ 
    	  text: undefined,
    	  date: undefined,
    	  hour: undefined,
    	  user: 0 /*riferimento utente*/
      }

      });

    return Comment;

  });