module.exports = function(grunt) {
 grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    filesets: {
      client: {
        scss:    'src/client/css/**/*.scss',
        css:     'src/tmp/*.css',
        coffee:  'src/client/**/*.coffee',
        js:      'src/tmp/client.js'
      },
      server: {
        coffee:  'src/server/**/*.coffee',
        js:      'src/tmp/server.js'
      }
    },

    coffee: {
      options: { join: true },
      compile: {
        files: {
          'src/tmp/server.js': '<%= filesets.server.coffee %>',
          'src/tmp/client.js': '<%= filesets.client.coffee %>'
        }
      }
    },

    uglify: {
      js: {
        files: {
          'start/app.js': ['<%= filesets.server.js %>']
        }
      }
    },

    sass: {
      compile: {
        options: { style: 'compressed' },
        files: [{
          'src/tmp/style.css': 'src/client/css/style.scss'
        }]
      }
    },

    concat: {
      css: {
        src: '<%= filesets.client.css %>',
        dest: 'start/public/stylesheets/style.css'
      }
    },

    watch: {
      scss: {
        files: ['<%= filesets.client.scss %>'],
        tasks: ['sass', 'concat'],
        options: { spawn: false, reload: true }
      },
      coffee: {
        files: ['<%= filesets.server.coffee %>'],
        tasks: ['coffee', 'uglify'],
        options: { spawn: false, reload: true }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['coffee', 'uglify', 'sass', 'concat', 'watch']);

};