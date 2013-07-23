define(["zepto", "underscore", "backbone"],
    function ($, _, Backbone) {
        var News = Backbone.Model.extend({
            defaults: {
                id: 0,
                title: undefined,
                message: undefined
            }

        });

        return News;

    });