define(["zepto", "underscore", "backbone"],
  function ($, _, Backbone) {
    var User = Backbone.Model.extend({
        defaults: {
            id: 0,
            type: undefined, /*pw tw fb*/
            name: undefined
        }
      });

    return User;

  });