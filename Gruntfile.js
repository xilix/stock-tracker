module.exports = function(grunt) {
  "use strict";
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mocha: {
      test: {
        src: ['tests/unit/**/*.js'],
        options: {
          reporter: 'Nyan',
        },
      },
    },
    jshint: {
      all: ['Gruntfile.js', 'lib/**/*.js' ],
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js',
      },
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'uglify'], function() {
    grunt.log.write('Building dev...').ok();
  });
};
