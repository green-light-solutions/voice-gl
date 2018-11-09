module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  const env = grunt.option('env') || 'dev';

  grunt.initConfig({
    paths: {
      src: {
        js: 'src/js/**/*.js',
        config: 'src/config/config.' + env + '.js',
        scss: 'src/scss/main.scss',
      },
      dest: {
        code: 'dist'
      },
    },
    copy: {
      main: {
        files: [
          { expand: true, cwd: 'src', src: 'assets/**', dest: '<%= paths.dest.code %>', filter: 'isFile' },
          { src: 'src/favicon.ico', dest: '<%= paths.dest.code %>/favicon.ico', filter: 'isFile' },
        ],
      },
    },
    htmlmin: {
      main: {
        options: {
          removeComments: true,
        },
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*.html', '*.html'],
          dest: '<%= paths.dest.code %>'
        }]
      },
    },
    browserify: {
      dist: {
        options: {
          transform: [["babelify", { "stage": 0 }]]
        },
        files: [
          {
            src: ['<%= paths.src.js %>', '<%= paths.src.config %>'],
            dest: '<%= paths.dest.code %>/bundle.js',
          },
        ],
      }
    },
    sass: {
      main: {
        options: {
          outputStyle: 'compressed',
          sourceMap: true,
          sourceMapContents: true,
        },
        files: [
          {
            src: ['<%= paths.src.scss %>'],
            dest: '<%= paths.dest.code %>/bundle.min.css',
          },
        ],
      },
    },
    watch: {
      options: {
        livereload: true,
      },
      html: {
        files: ['src/*.html'],
        tasks: ['htmlmin'],
        options: {
          spawn: false,
        },
      },
      js: {
        files: ['<%= paths.src.js %>', '<%= paths.src.config %>'],
        tasks: ['browserify'],
        options: {
          spawn: false,
        },
      },
      css: {
        files: ['src/scss/**'],
        tasks: ['sass'],
        options: {
          spawn: false,
        },
      },
      assets: {
        files: ['src/assets/**'],
        tasks: ['copy'],
        options: {
          spawn: false,
        },
      },
    },
    connect: {
      server: {
        options: {
          port: 3001,
          base: ['dist'],
          open: true,
          livereload: true,
        },
      },
    },
    eslint: {
      options: {
        configFile: '.eslintrc.json',
      },
      target: ['<%= paths.src.js %>'],
    },
    sasslint: {
      options: {
        configFile: '.sasslint.yml',
      },
      target: ['<%= paths.src.scss %>'],
    },
    githooks: {
      all: {
        'pre-commit': 'lint',
      }
    }
  });

  grunt.registerTask('lint', ['eslint', 'sasslint']);
  grunt.registerTask('default', ['githooks', 'browserify', 'sass', 'copy', 'htmlmin', 'connect', 'watch']);
  grunt.registerTask('build', ['lint', 'browserify', 'sass', 'copy', 'htmlmin']);
};
