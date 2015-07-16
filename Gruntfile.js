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
    // build html files from jade templates
    jade: {
      compile: {
        files: {
          'public/build/index.html': '_jade/pages/index.jade '
        }
      }
    },
    // join all bower css/js components into a single css and a single js file
    concat: {
      options: {
        separator: '\n',
      },
      js: {
        src: bowerjs,
        dest: 'public/build/bower.js'
      },
      css: {
        src: bowercss,
        dest: 'public/build/bower.css'
      }
    },
    // minify css files
    cssmin: {
      target: {
        files: {
          'public/build/styles.min.css': 'public/build/tmp/styles.css',
        }
      }
    },
    // minify js files
    uglify: {
      target: {
        files: {
          'public/build/tmp/scripts.min.js': ['app/{,*/}*.js'],
          'public/build/scripts.min.js': ['public/build/tmp/scripts.min.js', 'public/build/tmp/bower.js']
        }
      }
    },
    // clean temporary build files
    clean: {
      tmp: 'public/build/tmp'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  // grunt.loadNpmTasks('grunt-contrib-csslint'); // TODO
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'jade', 'concat', 'cssmin', 'uglify', 'clean']);
};