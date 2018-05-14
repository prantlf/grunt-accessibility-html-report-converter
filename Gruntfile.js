'use strict'

module.exports = function (grunt) {
  grunt.initConfig({
    standard: {
      all: {
        src: [
          'Gruntfile.js',
          'tasks/*.js',
          'tests/*.js'
        ]
      }
    },

    'accessibility-html-report-converter': {
      missingDeprecated: {
        options: {
          ignoreMissing: true
        },
        input: 'tests/expected/dummy.json',
        output: 'tests/actual/'
      },
      missingCurrent: {
        options: {
          ignoreMissing: true
        },
        src: 'tests/expected/dummy.json',
        dest: 'tests/actual/'
      },
      force: {
        options: {
          force: true
        },
        src: 'tests/expected/dummy.json',
        dest: 'tests/actual/'
      },
      deprecated: {
        input: 'tests/expected/report.json',
        output: 'tests/actual/deprecated.html'
      },
      directory: {
        src: 'tests/expected/report.json',
        dest: 'tests/actual/'
      },
      extension: {
        options: {
          targetExtension: '.htm'
        },
        src: 'tests/expected/report.json',
        dest: 'tests/actual/'
      },
      showFileNameOnly: {
        options: {
          showFileNameOnly: true
        },
        src: 'tests/expected/report.json',
        dest: 'tests/extra/'
      },
      showCommonPathOnly: {
        options: {
          showCommonPathOnly: false
        },
        src: 'tests/expected/report.json',
        dest: 'tests/extra2/'
      }
    },

    nodeunit: {
      tests: ['tests/*.js']
    },

    clean: {
      tests: ['tests/actual/*', 'tests/extra', 'tests/extra2']
    }
  })

  grunt.loadTasks('tasks')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-nodeunit')
  grunt.loadNpmTasks('grunt-standard')

  grunt.registerTask('default', ['standard', 'clean',
    'accessibility-html-report-converter', 'nodeunit'])
}
