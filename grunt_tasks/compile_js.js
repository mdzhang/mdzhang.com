var _ = require('lodash');

/**
 * Add a task to transpile, prune, and minify scripts.
 */
module.exports = function (grunt) {
  var bowerjs = [
    'jquery/dist/jquery.js'
  ];

  var rewrite = function(b) {
    return 'bower_components/' + b;
  };

  bowerjs = _.map(bowerjs, rewrite);

  var alljs = bowerjs.concat('public/build/js/scripts.tmp.js');


  grunt.config.merge({
    // coffeescript files to a single js file
    coffee: {
      options: {
        join: true
      },
      target: {
        src: 'coffee/**/*.coffee',
        dest: 'public/build/js/scripts.tmp.js'
      }
    },
    // check js code style & correctness
    eslint: {
      options: {
        configFile: '.eslintrc.json'
      },
      target: {
        src: ['public/build/js/scripts.tmp.js', 'Gruntfile.js']
      }
    },
    // join all js components into a single js file
    concat: {
      js: {
        src: alljs,
        dest: 'public/build/js/scripts.js'
      }
    },
    // minify js files
    uglify: {
      target: {
        src: 'public/build/js/scripts.js',
        dest: 'public/build/js/scripts.min.js'
      }
    }
  });

  grunt.registerTask('compile-js', [
    'newer:coffee',
    'newer:eslint',
    'newer:concat:js',
    'newer:uglify'
  ]);
};