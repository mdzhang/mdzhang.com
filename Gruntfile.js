var _ = require('lodash');

module.exports = function(grunt) {

  var bowerjs = [
    'lodash/lodash.js',
    'jquery/dist/jquery.js',
    'jquery.xml2json/src/jquery.xml2json.js',
    'jsrender/jsrender.js',
    'bluebird/js/bluebird.js'
  ];

  var bowercss = [
    'font-awesome/css/font-awesome.min.css'
  ];

  var rewrite = function(b) {
    return 'bower_components/' + b;
  };

  bowerjs = _.map(bowerjs, rewrite);
  bowercss = _.map(bowercss, rewrite);

  alljs = bowerjs.concat('public/build/tmp/scripts.js');
  // our style sheet has @imports, which must be at the top of the file
  // for cssmin to handle properly
  allcss = ['public/build/tmp/styles.css'].concat(bowercss);

  // Project configuration.
  grunt.initConfig({
    // build html files from jade templates
    jade: {
      options: {
        // we need to keep the whitespace so that htmlprocess can work properly
        pretty: true
      },
      compile: {
        files: [
          {
            src: 'jade/index.jade',
            dest: 'public/build/index.html'
          },
          {
            src: 'jade/error.jade',
            dest: 'public/build/error.html'
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
    // process css e.g. adding vendor prefixes
    postcss: {
      options: {
        processors: [
          require('autoprefixer-core')({
            browsers: 'last 2 versions'
          }) // add vendor prefixes
        ]
      },
      dist: {
        src: 'public/build/tmp/styles.css'
      }
    },
    // coffeescript files to a single js file
    coffee: {
      options: {
        join: true,
      },
      compile: {
        files: {
          'public/build/tmp/scripts.js': 'coffee/**/*.coffee'
        }
      }
    },
    // check js code correctness
    jshint: {
      options: {
        jshintrc: true
      },
      src: 'public/build/tmp/scripts.js'
    },
    // check js code style
    jscs: {
      options: {
        config: ".jscsrc"
      },
      src: 'public/build/tmp/scripts.js'
    },
    // join all bower css/js components into a single css and a single js file
    concat: {
      options: {
        separator: '\n',
      },
      js: {
        files: {
          'public/build/tmp/scripts.js': alljs
        }
      },
      css: {
        src: allcss,
        dest: 'public/build/css/styles.css'
      }
    },
    // removed unused css selectors
    uncss: {
      dist: {
        files: {
          'public/build/tmp/tidy.css': ['public/build/index.html', 'public/build/error.html']
        }
      }
    },
    // minify css files
    cssmin: {
      target: {
        files: {
          'public/build/css/tidy.min.css': 'public/build/tmp/tidy.css'
        }
      }
    },
    // modify html files to use build resources
    processhtml: {
      dist: {
        files: {
          'public/build/index.html': ['public/build/index.html'],
          'public/build/error.html': ['public/build/error.html']
        }
      },
    },
    // minify html files
    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        processScripts: ['application/ld+json']
      },
      dist: {
        files: {
          'public/build/index.html': ['public/build/index.html'],
          'public/build/error.html': ['public/build/error.html']
        }
      }
    },
    // minify js files
    uglify: {
      target: {
        files: {
          'public/build/js/scripts.min.js': 'public/build/tmp/scripts.js'
        }
      }
    },
    imagemin: {
      target: {
        files: {
          'public/build/img/avatar.jpg': 'assets/avatar.jpg'
        }
      }
    },
    // clean temporary build files
    clean: {
      tmp: 'public/build/tmp'
    },
    // watch for edits and rebuild accordingly
    watch: {
      options: {
        livereload: true
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
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-newer');

  // Default task(s).
  grunt.registerTask('buildimg', ['newer:imagemin']);
  grunt.registerTask('buildhtml', ['jade', 'processhtml', 'htmlmin']);
  grunt.registerTask('buildcss', ['sass', 'postcss', 'concat:css', 'uncss', 'cssmin']);
  grunt.registerTask('buildjs', ['coffee', 'jshint', 'jscs', 'concat:js', 'uglify']);
  grunt.registerTask('build', ['buildhtml', 'buildcss', 'buildjs', 'buildimg', 'clean']);
  grunt.registerTask('default', ['build', 'watch']);
};