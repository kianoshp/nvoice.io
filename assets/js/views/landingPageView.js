(function() {

  define(['jquery', 
          'underscore', 
          'backbone', 
          'templates/landingPageTmpl',
          'views/landingPageView'], 
          function($, 
            _, 
            Backbone, 
            tmpl,
            LandingPageView) 
          {
            "use strict";

            return LandingPageView = Backbone.View.extend({
              el: '#main-content',
              template: _.template(window.JST['initialPage']),
      
              render: function() {
                return $(this.el).append(this.template(this.model.toJSON()));
              }
          });
  });
}).call(this);
