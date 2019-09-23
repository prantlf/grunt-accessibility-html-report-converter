'use strict'

const { readFileSync } = require('fs')
const { join } = require('path')

function compare (test, source, target, directory) {
  test.expect(1)
  const expected = readFileSync(join(__dirname, 'expected',
    source), 'utf-8')
  const actual = readFileSync(join(__dirname,
    directory || 'actual', target), 'utf-8')
  test.equal(expected, actual)
  test.done()
}

exports['htmllint-html-report-converter'] = {
  deprecated: function (test) {
    compare(test, 'common-path.html', 'deprecated.html')
  },

  directory: function (test) {
    compare(test, 'common-path.html', 'report.html')
  },

  extension: function (test) {
    compare(test, 'common-path.html', 'report.htm')
  },

  showFileNameOnly: function (test) {
    compare(test, 'name-only.html', 'report.html', 'extra')
  },

  showCommonPathOnly: function (test) {
    compare(test, 'full-path.html', 'report.html', 'extra2')
  }
}
