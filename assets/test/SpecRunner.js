require.config({
  // baseUrl: "js/libs",
  urlArgs: 'cb=' + Math.random(),
  paths: {
    jquery: '../js/libs/jquery',
    underscore: '../js/libs/lodash',
    backbone: '../js/libs/backbone',
    marionette: '../js/libs/backbone.marionette',
    'backbone.wreqr' : '../js/libs/backbone.wreqr',
    'backbone.babysitter' : '../js/libs/backbone.babysitter',
    jasmine: '../test/jasmine-1.3.1/jasmine',
    'jasmine-html': '../test/jasmine-1.3.1/jasmine-html',
    spec: '../test/spec'
  },
  shim: {
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
      underscore: {
        exports: '_'
    },
    jasmine: {
      exports: 'jasmine'
    },
    'jasmine-html': {
      deps: ['jasmine'],
      exports: 'jasmine'
    }
  }
});

require(['underscore', 'jquery', 'jasmine-html'], function(_, $, jasmine){
  console.log('I made it!');
  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;

  var htmlReporter = new jasmine.HtmlReporter();

  jasmineEnv.addReporter(htmlReporter);

  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };

  var currentWindowOnload = window.onload;

  window.onload = function() {
    if (currentWindowOnload) {
      currentWindowOnload();
    }
    execJasmine();
  };

  function execJasmine() {
    jasmineEnv.execute();
  }
});
