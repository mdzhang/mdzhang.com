/**
 * Add a task to write version info to a version/index.html file to the build.
 */
module.exports = function (grunt) {
  function getVersionString() {
    return grunt.config.get('gitinfo').local.branch.current.SHA + '-' + new Date().toISOString();
  }

  grunt.config.merge({
    'file-creator': {
      target: {
        'public/build/version/index.html': function(fs, fd, done) {
          fs.writeSync(fd, getVersionString());
          done();
        }
      }
    }
  });

  grunt.registerTask('version', [
    'gitinfo',
    'file-creator'
  ]);
};