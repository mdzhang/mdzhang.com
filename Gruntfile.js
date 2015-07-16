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
    // build html files from jade templates
    jade: {
      compile: {
        files: [
          {
            src: '_jade/app.jade',
            dest: 'public/build/html/app.html'
          },
          {
            cwd: '_jade/pages',
            src: '*.jade',
            dest: "public/build/html",
            expand: true,
            ext: ".html"
          }
        ]
      }
    },
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
    // join all bower css/js components into a single css and a single js file
    concat: {
      options: {
        separator: '\n',
      },
      js: {
        src: bowerjs,
        dest: 'public/build/js/bower.js'
      },
      css: {
        src: bowercss,
        dest: 'public/build/css/bower.css'
      }
    },
    // minify css files
    cssmin: {
      target: {
        files: {
          'public/build/css/styles.min.css': 'public/build/tmp/styles.css',
        }
      }
    },
    // check js code correctness
    jshint: {
      options: {
        jshintrc: true
      },
      src: 'app/**/*.js'
    },
    // check js code style
    jscs: {
      options: {
        config: ".jscsrc"
      },
      src: 'app/**/*.js'
    },
    // minify js files
    uglify: {
      target: {
        files: {
          'public/build/tmp/scripts.min.js': ['app/{,*/}*.js'],
          'public/build/js/scripts.min.js': ['public/build/tmp/scripts.min.js']
        }
      }
    },
    copy: {
      target: {
        files: [
          {
            expand: true,
            cwd: 'public/fonts',
            src: '*',
            dest: 'public/build/fonts',
            filter: 'isFile'
          },
        ]
      }
    },
    // clean temporary build files
    clean: {
      tmp: 'public/build/tmp'
    },
    // watch for edits and rebuild accordingly
    watch: {
      options: {
        livereload: true,
      },
      config: {
        files: ['.jscsrc', '.jshintrc', 'Gruntfile.js'],
        tasks: ['build']
      },
      scripts: {
        files: ['app/**/*.js'],
        tasks: ['buildjs', 'clean']
      },
      styles: {
        files: ['_sass/**/*.scss'],
        tasks: ['buildcss', 'clean']
      },
      html: {
        files: ['_jade/**/*.jade'],
        tasks: ['buildhtml', 'clean']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  // grunt.loadNpmTasks('grunt-contrib-csslint'); // TODO
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks("grunt-jscs");
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('buildhtml', ['jade']);
  grunt.registerTask('buildjs', ['concat:js', 'jshint', 'jscs', 'uglify']);
  grunt.registerTask('buildcss', ['sass', 'concat:css', 'cssmin']);
  grunt.registerTask('build', ['buildhtml', 'buildcss', 'buildjs', 'copy', 'clean']);
  grunt.registerTask('default', ['build', 'watch']);
};