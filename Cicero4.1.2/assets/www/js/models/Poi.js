define(["zepto", "underscore", "backbone"],
  function ($, _, Backbone) {
    var Poi = Backbone.Model.extend({
      defaults: {
    	  id: 0,
    	  name: undefined,
    	  descr: undefined,
    	  coord: [-1,-1,-1] /* piano, x e y*/
      }

      });

    return Poi;

  });