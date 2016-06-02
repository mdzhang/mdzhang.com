var _ = require('lodash');

module.exports = function(grunt) {

  var bowerjs = [
    'jquery/dist/jquery.js',
  ];

  var bowercss = [
    'font-awesome/css/font-awesome.min.css'
  ];

  var rewrite = function(b) {
    return 'bower_components/' + b;
  };

  bowerjs = _.map(bowerjs, rewrite);
  bowercss = _.map(bowercss, rewrite);

  var alljs = bowerjs.concat('public/build/js/scripts.js');
  // our style sheet has @imports, which must be at the top of the file
  // for cssmin to handle properly
  var allcss = ['public/build/css/styles.css'].concat(bowercss);

  // Project configuration.
  grunt.initConfig({
    // copy assets into build folder
    copy: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'public/',
            src: [
              'files/**',
              'fonts/**',
              'img/**',
              'google9c723a7692fdf206.html',
              'mywot116d689c1efc0de389b9.html',
              'robots.txt',
              'sitemap.xml'
            ],
            dest: 'public/build'
          }
        ]
      }
    },
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
          'public/build/css/styles.css': ['sass/main.scss'],
        }
      }
    },
    // process css
    postcss: {
      options: {
        processors: [
          // add vendor prefixes
          require('autoprefixer')({
            browsers: 'last 2 versions'
          })
        ]
      },
      dist: {
        src: 'public/build/css/styles.css'
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
    // join all bower css/js components into a single css and a single js file
    concat: {
      options: {
        separator: '\n',
      },
      js: {
        files: {
          'public/build/js/scripts.js': alljs
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
          'public/build/css/tidy.css': ['public/build/index.html', 'public/build/error.html']
        }
      }
    },
    // minify css files
    cssmin: {
      target: {
        files: {
          'public/build/css/tidy.min.css': 'public/build/css/tidy.css'
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
          'public/build/js/scripts.min.js': 'public/build/js/scripts.js'
        }
      }
    },
    // compress images
    imagemin: {
      target: {
        files: {
          'public/img/avatar.jpg': 'assets/avatar.jpg'
        }
      }
    },
    // convert resources to gzip files
    compress: {
      options: {
        mode: 'gzip'
      },
      'target': {
        files: [
          {
            src: 'public/build/js/scripts.min.js',
            dest: 'public/build/js/scripts.min.js.gz'
          },
          {
            src: 'public/build/css/tidy.min.css',
            dest: 'public/build/css/tidy.min.css.gz'
          },
          {
            src: 'public/build/index.html',
            dest: 'public/build/index.html.gz'
          },
          {
            src: 'public/build/error.html',
            dest: 'public/build/error.html.gz'
          }
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
        tasks: ['buildhtmlcss', 'clean']
      },
      html: {
        files: ['jade/**/*.jade'],
        tasks: ['buildhtmlcss', 'clean']
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
  grunt.loadNpmTasks('grunt-contrib-compress');

  // Build tasks
  grunt.registerTask('buildimg', ['newer:imagemin']);
  grunt.registerTask('buildhtmlcss',
    ['jade', 'sass', 'postcss', 'concat:css', 'uncss', 'cssmin', 'processhtml', 'htmlmin']);
  grunt.registerTask('buildjs', ['coffee', 'jshint', 'jscs', 'concat:js', 'uglify']);
  grunt.registerTask('build', ['newer:copy', 'buildhtmlcss', 'buildjs', 'buildimg']);
  grunt.registerTask('default', ['build', 'watch']);

  // Only run before prod deploy
  grunt.registerTask('prodbuild', ['build', 'compress']);
};