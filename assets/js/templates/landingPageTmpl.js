(function() {

  define(['underscore'], function(_) {
    return _.extend(window.JST, {
      initialPage: '\
		<div><%= message %></div>\
		'
    });
  });

}).call(this);