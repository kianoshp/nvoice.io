/*global module:false*/
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    project: {
      js: 'static/js',
      css: 'static/css',
      images: 'static/images',
      test: 'static/test',
      randomNumber: '<%= Math.random() * 1000 %>'
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['<%= project.js %>/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    jshint: {
      files: ['<%= project.js %>/common/*.js', 
              '<%= project.js %>/data/*.js', 
              '<%= project.js %>/models/*.js', 
              '<%= project.js %>/templates/*.js', 
              '<%= project.js %>/views/*.js', 
              '<%= project.js %>/config.js', 
              '<%= project.js %>/global.js', 
              '<%= project.js %>/main.js', 
              '<%= project.test %>/spec/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        multistr: true,
        globals: {
          jQuery: true,
          require: true,
          define: true,
          describe: true,
          it: true,
          expect: true,
          runs: true,
          waitsFor: true,
          $: true,
          console: true,
          exports: true,
          _: true
        }
      }
    },
    uglify: {
      options: {
        banner: '/* Date: <%= grunt.template.today("dd-mm-yyyy") %> Uglifying <%= pkg.name %> */\n'
      },
      dist: {
        src: ['<%= concat.dist.dest %>'],
        dest: 'dist/<%= project.randomNumber %>.js'
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  //Register tasks
  require('load-grunt-tasks')(grunt);

  // Default task
  grunt.registerTask('default', ['jshint', 'concat']);
  grunt.registerTask('build', ['jshint', 'concat', 'uglify']);

};
