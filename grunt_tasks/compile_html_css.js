/**
 * Add a task to write version info to a version/index.html file to the build.
 */
module.exports = function (grunt) {
  grunt.config.merge({
    // build html files from pug templates
    pug: {
      options: {
        // we need to keep the whitespace so that htmlprocess can work properly
        pretty: true
      },
      target: {
        files: [
          {
            src: 'pug/index.pug',
            dest: 'public/build/index.html'
          },
          {
            src: 'pug/error.pug',
            dest: 'public/build/error.html'
          }
        ]
      }
    },
    // modify html files to use build resources
    processhtml: {
      target: {
        files: [
          {
            src: 'public/build/index.html',
            dest: 'public/build/index.html'
          },
          {
            src: 'public/build/error.html',
            dest: 'public/build/error.html'
          }
        ]
      }
    },
    // minify html files
    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        processScripts: ['application/ld+json']
      },
      target: {
        files: [
          {
            src: 'public/build/index.html',
            dest: 'public/build/index.html'
          },
          {
            src: 'public/build/error.html',
            dest: 'public/build/error.html'
          }
        ]
      }
    },
    // convert resources to gzip files
    compress: {
      html: {
        files: [
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
    }
  });

  grunt.registerTask('compile-html-css', [
    'pug',
    'compile-css',
    'processhtml',
    'htmlmin',
    'compress:css',
    'compress:html'
  ]);
};