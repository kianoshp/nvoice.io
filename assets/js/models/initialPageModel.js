(function() {

  define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
    "use strict";

    var InitialPageModel;
    return InitialPageModel = Backbone.Model.extend({
		url: '/initialPage'
    });
  });
}).call(this);

