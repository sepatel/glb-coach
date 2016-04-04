module.exports = function(grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  RegExp.quote = function(string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  var fs = require('fs');
  var path = require('path');

  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    // Task configuration.
    clean: {
      dist: ['client/css', 'client/js']
    },

    concat: {
      sliqsolv: {
        src: ['js/addons/**/*.js'],
        dest: 'client/js/<%= pkg.name %>.js'
      },
      app: {
        src: ['js/app/**/*.js'],
        dest: 'client/js/app.js'
      }
    },

    uglify: {
      options: {
        preserveComments: 'some'
      },
      vendor: {
        src: [
          'node_modules/jquery/dist/jquery.js', 'node_modules/angular/angular.js',
          'node_modules/angular-animate/angular-animate.js', 'node_modules/angular-route/angular-route.js',
          'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js', 'node_modules/packery/dist/packery.pkgd.min.js'
        ],
        dest: 'client/js/vendor.min.js'
      }
    },
    less: {
      compileCore: {
        options: {
          strictMath: true
        },
        src: ['less/bootstrap.less', 'less/addons/sliqsolv.less'],
        dest: 'client/css/<%= pkg.name %>.css'
      }
    },

    autoprefixer: {
      core: {
        options: {
          map: false
        },
        src: 'client/css/<%= pkg.name %>.css'
      }
    },

    csslint: {
      options: {
        csslintrc: 'less/.csslintrc'
      },
      dist: 'client/css/<%= pkg.name %>.css'
    },

    cssmin: {
      options: {
        compatibility: 'ie8',
        keepSpecialComments: '*',
        noAdvanced: true
      },
      minifyCore: {
        src: 'client/css/<%= pkg.name %>.css',
        dest: 'client/css/<%= pkg.name %>.min.css'
      }
    },

    csscomb: {
      options: {
        config: 'less/.csscomb.json'
      },
      dist: {
        expand: true,
        cwd: 'client/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'client/css/'
      }
    },

    copy: {
      css: {/* src: 'css/*', dest: 'dist/' */},
      js: {/* src: 'js/*', dest: 'dist/' */},
      html: {/* expand: true, cwd: 'client/', src: '** /*.html', dest: 'dist/' */},
      fonts: {/* src: 'fonts/*', dest: 'dist/' */}
    },

    watch: {
      src: {
        files: 'js/**/*.js',
        tasks: ['concat']
      },
      /* html: { files: 'client/** /*.html', tasks: 'copy:html' }, */
      less: {
        files: 'less/**/*.less',
        tasks: 'less'
      }
    },

    sed: {
      versionNumber: {
        pattern: (function() {
          var old = grunt.option('oldver');
          return old ? RegExp.quote(old) : old;
        })(),
        replacement: grunt.option('newver'),
        recursive: true
      }
    },
    exec: {
      npmUpdate: {
        command: 'npm update'
      }
    }
  });

  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  // JS distribution task.
  grunt.registerTask('dist-js', ['concat', 'uglify']);

  // CSS distribution task.
  grunt.registerTask('less-compile', ['less:compileCore']);
  grunt.registerTask('dist-css', ['less-compile', 'autoprefixer:core', 'csscomb:dist', 'cssmin:minifyCore']);

  // Full distribution task.
  grunt.registerTask('dist', ['clean:dist', 'dist-css', 'dist-js']);

  // Default task.
  grunt.registerTask('default', ['clean:dist', 'dist']);
};
