var _ = require('lodash');

/**
 * Add a task to transpile, prune, and minify styles.
 * NB: All .html files must be compiled before calling the compile-css task.
 */
module.exports = function (grunt) {
  var rewrite = function(b) {
    return 'bower_components/' + b;
  };

  var bowercss = [
    'font-awesome/css/font-awesome.min.css'
  ];

  bowercss = _.map(bowercss, rewrite);
  // our style sheet has @imports, which must be at the top of the file
  // for cssmin to handle properly
  var allcss = ['public/build/css/styles.css'].concat(bowercss);

  grunt.config.merge({
    // build css files from scss files
    sass: {
      options: {
        trace: true,
        cacheLocation: 'sass/.sass-cache',
        sourcemap: 'none'
      },
      target: {
        src: 'sass/main.scss',
        dest: 'public/build/css/styles.css'
      }
    },
    // add vendor prefixes
    postcss: {
      options: {
        processors: [
          require('autoprefixer')({
            browsers: 'last 2 versions'
          })
        ]
      },
      target: {
        src: 'public/build/css/styles.css'
      }
    },
    // join all css components into a single css file
    concat: {
      css: {
        src: allcss,
        dest: 'public/build/css/styles.css'
      }
    },
    // removed unused css selectors
    uncss: {
      target: {
        src: ['public/build/index.html', 'public/build/error.html'],
        dest: 'public/build/css/tidy.css'
      }
    },
    // minify css files
    cssmin: {
      target: {
        src: 'public/build/css/tidy.css',
        dest: 'public/build/css/tidy.min.css'
      }
    }
  });

  grunt.registerTask('compile-css', [
    'sass',
    'postcss',
    'concat:css',
    'uncss',
    'cssmin'
  ]);
};