define(["zepto", "underscore", "backbone", "handlebars","views/poiListView","text!templates/searchView.html"],
    function ($, _, Backbone, Handlebars, poiListView, template) {

    var searchView = Backbone.View.extend({

        
        template: Handlebars.compile(template),

        initialize: function () {
            this.internalView = new poiListView();
            this.render();
        },

        render: function (eventName) {
            $(this.el).empty();
            
            $(this.el).html(this.template());
            $(this.el).append($(this.internalView.el));
           
            return this;
        },
        
      });

    return searchView;

  });