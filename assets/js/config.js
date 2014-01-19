//Set the require.js configuration for your application.
(function() {

  require.config({
    baseUrl: '/js',
    deps: ['common/global', 'main'],

    /*
    * Core Libraries
    * -------------- */
    paths: {
      jquery: 'libs/jquery',
      backbone: 'libs/backbone',
      underscore: 'libs/lodash',

      templates: 'templates',
      views: 'views',
      models: 'models'
    },
    shim: {
      //Backbone
      backbone: {
        //Depends on underscore/lodash and jQuery
        deps: ['underscore', 'jquery'],
        //Exports the global window.Backbone object
        exports: 'Backbone'
      },
      // Making underscore/lodash AMD compatible
      underscore: {
        exports: '_'
      }
    }
  });

}).call(this);
