var _ = require('lodash');

module.exports = function(grunt) {

  var bowerjs = [
    'lodash/lodash.js',
    'jquery/dist/jquery.js',
    'bluebird/js/browser/bluebird.js'
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
            src: 'jade/index.jade',
            dest: 'public/build/html/index.html'
          }
        ]
      }
    },
    // build css files from scss files
    sass: {
      options: {
        trace: true,
        cacheLocation: 'sass/.sass-cache',
        sourcemap: 'none'
      },
      dist: {
        files: {
          'public/build/tmp/styles.css': ['sass/main.scss'],
        }
      }
    },
    // coffeescript files to a single js file
    coffee: {
      options: {
        join: true,
      },
      compile: {
        files: {
          'public/build/js/scripts.js': 'coffee/**/*.coffee'
        }
      }
    },
    // join all bower css/js components into a single css and a single js file
    concat: {
      options: {
        separator: '\n',
      },
      js: {
        files: {
          'public/build/js/bower.js': bowerjs
          // 'public/build/js/scripts.js': 'js/**/*.js'
        }
      },
      css: {
        src: bowercss,
        dest: 'public/build/tmp/bower.css'
      }
    },
    // minify css files
    cssmin: {
      target: {
        files: {
          'public/build/css/styles.min.css': 'public/build/tmp/styles.css',
          'public/build/css/bower.min.css': 'public/build/tmp/bower.css'
        }
      }
    },
    // check js code correctness
    jshint: {
      options: {
        jshintrc: true
      },
      src: 'public/build/js/scripts.js'
    },
    // check js code style
    jscs: {
      options: {
        config: ".jscsrc"
      },
      src: 'public/build/js/scripts.js'
    },
    // minify js files
    // uglify: {
    //   target: {
    //     files: {
    //       'public/build/tmp/scripts.min.js': ['app/{,*/}*.js'],
    //       'public/build/js/scripts.min.js': ['public/build/tmp/scripts.min.js']
    //     }
    //   }
    // },
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
        files: ['.jscsrc', '.jshintrc', 'Gruntfile.js', 'bower.json'],
        tasks: ['build']
      },
      scripts: {
        files: ['coffee/**/*.coffee'],
        tasks: ['buildjs', 'clean']
      },
      styles: {
        files: ['sass/**/*.scss'],
        tasks: ['buildcss', 'clean']
      },
      html: {
        files: ['jade/**/*.jade'],
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
  grunt.loadNpmTasks('grunt-contrib-coffee');

  // Default task(s).
  grunt.registerTask('buildhtml', ['jade']);
  grunt.registerTask('buildcss', ['sass', 'concat:css', 'cssmin']);
  grunt.registerTask('buildjs', ['coffee', 'jshint', 'jscs', 'concat:js']); // , 'uglify'
  grunt.registerTask('build', ['buildhtml', 'buildcss', 'buildjs', 'copy', 'clean']);
  grunt.registerTask('default', ['build', 'watch']);
};