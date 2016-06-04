module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    // copy assets into build folder
    copy: {
      target: {
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
    },
    concat: {
      options: {
        separator: '\n'
      }
    },
    // compress images
    imagemin: {
      target: {
        src: 'assets/avatar.jpg',
        dest: 'public/img/avatar.jpg'
      }
    },
    // watch for edits and rebuild accordingly
    watch: {
      options: {
        livereload: true
      },
      config: {
        files: ['.eslint.json', 'Gruntfile.js', 'bower.json'],
        tasks: ['build']
      },
      scripts: {
        files: ['coffee/**/*.coffee'],
        tasks: ['buildjs']
      },
      styles: {
        files: ['sass/**/*.scss'],
        tasks: ['buildhtmlcss']
      },
      html: {
        files: ['pug/**/*.pug'],
        tasks: ['buildhtmlcss']
      }
    }
  });

  /**
   * Load task modules inside `grunt_tasks`.
   */
  grunt.loadTasks('grunt_tasks');

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-file-creator');
  grunt.loadNpmTasks('grunt-gitinfo');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-uncss');

  // Build tasks
  grunt.registerTask('build', [
    'newer:copy',
    'compile-html-css',
    'compile-js',
    'newer:imagemin',
    'version'
  ]);

  grunt.registerTask('default', ['build', 'watch']);
};