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

  // Project configuration.
  grunt.initConfig({
    // build html files from jade templates
    jade: {
      compile: {
        files: [
          {
            src: 'jade/index.jade',
            dest: 'public/build/index.html'
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
          'public/build/tmp/scripts.js': 'coffee/**/*.coffee'
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
          'public/build/tmp/bower.js': bowerjs
        }
      },
      css: {
        src: bowercss,
        dest: 'public/build/tmp/bower.css'
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
    // minify css files
    // cssmin: {
    //   target: {
    //     files: {
    //       'public/build/css/styles.min.css': 'public/build/tmp/styles.css',
    //       'public/build/css/bower.min.css': 'public/build/tmp/bower.css'
    //     }
    //   }
    // },
    copy: {
      target: {
        src: 'public/build/tmp/styles.css',
        dest: 'public/build/css/styles.min.css'
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
    // minify js files
    uglify: {
      target: {
        files: {
          'public/build/js/bower.min.js': 'public/build/tmp/bower.js',
          'public/build/js/scripts.min.js': 'public/build/tmp/scripts.js'
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
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');

  // Default task(s).
  grunt.registerTask('buildhtml', ['jade']);
  // TODO: css issue seems to be causing Safari/iOS issues
  grunt.registerTask('buildcss', ['sass', 'concat:css', 'postcss', 'copy']);
  grunt.registerTask('buildjs', ['coffee', 'jshint', 'jscs', 'concat:js', 'uglify']);
  grunt.registerTask('build', ['buildhtml', 'buildcss', 'buildjs', 'clean']);
  grunt.registerTask('default', ['build', 'watch']);
};