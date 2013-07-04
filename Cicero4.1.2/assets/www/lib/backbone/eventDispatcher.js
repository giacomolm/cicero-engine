define(['backbone'], function (Backbone) {
    var eventDispatcher = _.extend({}, Backbone.Events);
    return eventDispatcher;
});