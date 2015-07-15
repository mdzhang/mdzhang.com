var _ = require('lodash');

module.exports = function(grunt) {

  var bowerjs = [
    'angular/angular.min.js',
    'angular-route/angular-route.min.js',
    'angular-ui-bootstrap-bower/ui-bootstrap-tpls.min.js',
    'async/lib/async.js',
    'bluebird/js/browser/bluebird.min.js',
    'lodash/dist/lodash.min.js',
  ];

  var bowercss = [
    'font-awesome/css/font-awesome.min.css'
  ];

  var rewrite = function(b) {
    return 'bower_components/' + b;
  };

  bowerjs = _.map(bowerjs, rewrite);
  bowercss = _.map(bowercss, rewrite);

  // Project configuration.
  grunt.initConfig({
    // build css files from scss files
    sass: {
      options: {
        trace: true,
        cacheLocation: '_sass/.sass-cache',
        sourcemap: 'none'
      },
      dist: {
        files: {
          'public/build/tmp/styles.css': ['_sass/main.scss'],
        }
      }
    },
    // minify css files
    cssmin: {
      target: {
        files: {
          'public/build/styles.min.css': 'public/build/tmp/styles.css'
        }
      }
    },
    // build html files
    jade: {
      compile: {
        files: {
          'public/build/index.html': '_jade/pages/index.jade '
        }
      }
    },
    // clean temporary build files
    clean: {
      tmp: 'public/build/tmp'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  // TODO
  // grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'cssmin', 'jade', 'clean']);
};