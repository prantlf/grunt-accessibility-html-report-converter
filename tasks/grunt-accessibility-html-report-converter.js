'use strict'

const chalk = require('chalk')
const fs = require('fs')
const report = require('grunt-accessibility-html-reporter')
const path = require('path')

module.exports = function (grunt) {
  grunt.registerMultiTask('accessibility-html-report-converter',
      'Converts the JSON report of the grunt-accessibility task to HTML.',
      function () {
        const data = this.data
        var input = data.input
        const output = data.output
        const options = this.options({
          targetExtension: '.html',
          ignoreMissing: false,
          showFileNameOnly: false,
          force: false
        })
        const targetExtension = options.targetExtension
        const ignoreMissing = options.ignoreMissing
        const showFileNameOnly = options.showFileNameOnly
        const force = options.force
        const warn = force ? grunt.log.warn : grunt.fail.warn
        var files = this.files
        var converted = 0
        var failed = 0

        if (input && output) {
          grunt.log.warn('Properties "input" and "output" are deprecated. ' +
              'Use "src" and "dest" with the same content.')
          if (!fs.existsSync(input)) {
            input = null
          }
          files = [
            {
              orig: {
                src: input,
                dest: output
              },
              src: input ? [input] : [],
              dest: output
            }
          ]
        }

        if (files.length) {
          try {
            files.forEach(convertFiles)
            const ok = failed ? force ? grunt.log.warn : grunt.fail.warn
                              : grunt.log.ok
            ok(converted + ' ' + grunt.util.pluralize(converted,
                'file/files') + ' converted, ' + failed + ' failed.')
          } catch (error) {
            grunt.verbose.error(error.stack)
            grunt.log.error(error)
            warn('Converting accessibility reports failed.')
          }
        } else {
          if (!ignoreMissing) {
            warn('No files specified.')
          }
        }

        function convertFiles (file) {
          const src = file.src
          if (src.length) {
            src.forEach(convertFile.bind(null, file))
          } else {
            if (!ignoreMissing) {
              warn('No files found at ' + chalk.cyan(file.orig.src) + '.')
            }
          }
        }

        function convertFile (file, src) {
          var dest = file.dest
          const trailingChar = dest[dest.length - 1]
          var dir
          if ((trailingChar === '/' || trailingChar === path.sep) &&
              !file.orig.expand) {
            dir = dest.substring(0, dest.length - 1)
            const parsed = path.parse(src)
            dest = path.join(dest, parsed.name + targetExtension)
          } else {
            dir = path.dirname(dest)
          }
          grunt.file.mkdir(dir)

          grunt.verbose.writeln('Converting ' + chalk.cyan(src) + ' to ' +
              chalk.cyan(dest) + '.')
          try {
            const results = JSON.parse(fs.readFileSync(src, 'utf-8'))
            const generated = report(results, {
              showFileNameOnly: showFileNameOnly
            })
            fs.writeFileSync(dest, generated, 'utf-8')
            ++converted
          } catch (error) {
            grunt.verbose.error(error.stack)
            grunt.log.error(error)
            grunt.log.warn('Converting "' + src + '" failed.')
            ++failed
          }
        }
      })
}
