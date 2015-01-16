module.exports = function(grunt) {
 grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    filesets: {
      scss:   'src/**/*.scss',
      coffee: 'src/**/*.coffee',
      css:    'src/tmp/**/*.css',
      js:     'src/tmp/**/*.js',
      minjs:  'start/**/*.js'
    },

    coffee: {
      compile: {
        files: [{
          expand: true,
          cwd: 'src',
          src: '**/*.coffee',
          dest: 'src/tmp/',
          ext: '.js'
        }]
      }
    },

    uglify: {
      js: {
        files: [{
          expand: true,
          cwd: 'src/tmp/',
          src: '**/*.js',
          dest: 'start/',
          ext: '.js'
        }]
      }
    },

    sass: {
      compile: {
        files: [{
          expand: true,
          cwd:    'src',
          src:    '**.*.scss',
          dest:   'src/tmp',
          ext:    '.css'
        }]
      }
    },

    concat: {
      css: {
        src: 'src/tmp/**/*.css',
        dest: 'start/public/stylesheets/style.css'
      }
    },

    express: {
      dev: {
        options: {
          script: 'start/app.js'
        }
      },
      prod: {
        options: {
          script: 'start/app.js',
          node_env: 'production'
        }
      },
      test: {
        options: {
          script: 'start/app.js'
        }
      }
    },

    watch: {
      express: {
        files: ['<%= filesets.minjs %>'],
        tasks: ['express:dev'],
        options: { spawn: false, reload: true }
      },
      scss: {
        files: ['<%= filesets.scss %>'],
        tasks: ['sass', 'concat'],
        options: { spawn: false, reload: true }
      },
      coffee: {
        files: ['<%= filesets.coffee %>'],
        tasks: ['coffee', 'uglify'],
        options: { spawn: false, reload: true }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('default', ['coffee', 'uglify', 'sass', 'concat', 'express:dev', 'watch' ]);

};