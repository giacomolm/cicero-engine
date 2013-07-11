define(["zepto", "underscore", "backbone"],
  function ($, _, Backbone) {
    var User = Backbone.Model.extend({
        defaults: {
            id: 0,
            type: undefined, /*password twitter facebook*/
            name: undefined
        }
      });

    return User;

  });