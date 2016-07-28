module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      target: {
        options: {
          compress: true
        },
        files: [{
          expand: true,
          src: ['*.less'],
          dest: '',
          ext: '.min.css'
        }]
      }
    },
    watch: {
      css: {
        files: ["**/*.less"],
        tasks: ["less:target"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("default", ["less"]);
};
