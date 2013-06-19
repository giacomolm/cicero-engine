define(["zepto", "underscore", "backbone", "handlebars","views/poiListView","text!templates/searchView.html"],
    function ($, _, Backbone, Handlebars, poiListView, template) {

    var searchView = Backbone.View.extend({

        
        template: Handlebars.compile(template),

        initialize: function (pois) {
            this.internalView = new poiListView(pois);
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