module.exports = grunt => {
  grunt.initConfig({
    localBuildPath: "public/",
    aws_s3: {
      options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
        bucket: process.env.AWS_S3_BUCKET
      },
      dist: {
        files: [
          // Upload gatsby bundle to remote server root path
          {
            action: "upload",
            expand: true,
            cwd: "<%= localBuildPath %>",
            src: ["**/*"],
            dest: "/"
          },
          // Delete any old files that may have been in the bucket
          {
            action: "delete",
            expand: true,
            cwd: "<%= localBuildPath %>",
            src: ["**/*"],
            dest: "/"
          }
        ]
      }
    }
  });

  grunt.registerTask("deploy", ["aws_s3"]);

  grunt.loadNpmTasks("grunt-aws-s3");
};
