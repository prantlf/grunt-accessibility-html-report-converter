# grunt-accessibility-html-report-converter

[![NPM version](https://badge.fury.io/js/grunt-accessibility-html-report-converter.png)](http://badge.fury.io/js/grunt-accessibility-html-report-converter) [![Build Status](https://travis-ci.org/prantlf/grunt-accessibility-html-report-converter.svg?branch=master)](https://travis-ci.org/prantlf/grunt-accessibility-html-report-converter) [![Dependency Status](https://david-dm.org/prantlf/grunt-accessibility-html-report-converter.svg)](https://david-dm.org/prantlf/grunt-accessibility-html-report-converter) [![devDependency Status](https://david-dm.org/prantlf/grunt-accessibility-html-report-converter/dev-status.svg)](https://david-dm.org/prantlf/grunt-accessibility-html-report-converter#info=devDependencies) [![Greenkeeper badge](https://badges.greenkeeper.io/prantlf/grunt-accessibility-html-report-converter.svg)](https://greenkeeper.io/) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[![NPM Downloads](https://nodei.co/npm/grunt-accessibility-html-report-converter.png?downloads=true&stars=true)](https://www.npmjs.com/package/grunt-accessibility-html-report-converter)

This module provides a grunt multi-task for converts the JSON report generated by the [grunt-accessibility] task to the HTML format. It uses [grunt-accessibility-html-reporter] to format the accessibility check results.

## Installation

You need [node >= 4][node], [npm] and [grunt >= 0.4.5][Grunt] installed
and your project build managed by a [Gruntfile] with the necessary modules
listed in [package.json]; including [grunt-accessibility]. If you haven't
used Grunt before, be sure to check out the [Getting Started] guide, as it
explains how to create a Gruntfile as well as install and use Grunt plugins.
Once you're familiar with that process, you may install this plugin with this
command:

```shell
$ npm install grunt-accessibility-html-report-converter --save-dev
```

## Configuration

Add the `accessibility-html-report-converter` entry with the task configuration to the options of the `grunt.initConfig` method:

```js
grunt.initConfig({
  'accessibility-html-report-converter': {
    all: {
      src: 'accessibility/report.json',
      dest: 'accessibility/report.html'
    }
  }
});
```

Default options support the most usual usage scenario:

```js
'accessibility-html-report-converter': {
  options: {
    targetExtension: '.html',
    ignoreMissing: false,
    force: false
  },
  all: {
    src: 'accessibility/report.json',
    dest: 'accessibility/report.html'
  }
}
```

### Task Options

#### force
Type: `Boolean`
Default value: false

If set to `true`, it suppresses failures, which happened during the report conversion. Instead of making the Grunt fail, the errors will be written only to the console.

#### ignoreMissing
Type: `Boolean`
Default: `false`

If the `src` property does not point to any files, or if it is missing,
the task will make the Grunt run fail.  If you set the `ignoreMissing`
option to `true`, Grunt will continue executing other tasks.

#### targetExtension
Type: `String`
Default: ".html:

If the `dest` property specified only the target directory, the converted report file will be stored there with the file extension replaced to ".html" or to the extesion specified by this property.

### Task Data

The configuration consists of `src` and `dest` property pairs.  The `src`
property has to point to an existing source path.  The `dest` property has
to point to the path, where the converted report should be written.

If you do not end the `dest` path by the path separator (slash, for example), the `dest` path will be considered as if it includes the converted report file name too.

If you end the `dest` path by a path separator (slash, for example), the
converted report will be created using the source report name with the HTML expension.

If you specify more source files or directories, or use wildcards, the target path should be a directory - ended by the path separator (slash, for example).

#### src
Type: `String` or `Array`

Path to the file with the JSON report generated by the `accessibility` task, or a path pattern identifying these file, or an array of these.

#### dest
Type: `String`

Path to the file, which will be the HTML report written to. Or only the path to the directory, where it should be written, if the source report name with the HTML expension shoudl be used.

### Loading

Load the plugin in `Gruntfile.js`:

```javascript
grunt.loadNpmTasks('grunt-accessibility-html-report-converter');
```

## Build

Call the `accessibility-html-report-converter` task:

```shell
$ grunt accessibility-html-report-converter
```

or integrate it to your build sequence in `Gruntfile.js`:

```js
grunt.registerTask('default', ['accessibility-html-report-converter', ...]);
```

## Notes

This task will be usually executed right after the `accessibility` task. For example:

```js
grunt.initConfig({
  accessibility: {
    all: {
      src: ['snapshots/*.html']
    }
  },

  'accessibility-html-report-converter': {
    all: {
      src: 'accessibility/report.json',
      dest: 'accessibility/'
    }
  }
});

grunt.loadNpmTasks('grunt-accessibility');
grunt.loadNpmTasks('grunt-accessibility-html-report-converter');

grunt.registerTask('default', [
  'accessibility', 'accessibility-html-report-converter']);
```

The installation of the necessary Grunt tasks:

```bash
npm install grunt-accessibility grunt-accessibility-html-report-converter --save-dev
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding
style. Add unit tests for any new or changed functionality. Lint and test
your code using Grunt.

## Release History

 * 2018-02-19   v2.0.0   Upgrade to the reporter v2.0.0
 * 2018-02-19   v1.0.0   Upgrade to the reporter v1.0.0
 * 2017-11-25   v0.0.5   Fix appending the HTML extension to the target report file
 * 2017-11-25   v0.0.4   Upgrade the reporter dependency to support Node.js < 7
 * 2017-11-25   v0.0.1   Initial release

## License

Copyright (c) 2017-2018 Ferdinand Prantl

Licensed under the MIT license.

[node]: https://nodejs.org
[npm]: https://npmjs.org
[package.json]: https://docs.npmjs.com/files/package.json
[Grunt]: https://gruntjs.com
[Gruntfile]: https://gruntjs.com/sample-gruntfile
[Getting Gtarted]: https://github.com/gruntjs/grunt/wiki/Getting-started
[grunt-accessibility]: https://github.com/yargalot/grunt-accessibility
[grunt-accessibility-html-reporter]: https://github.com/prantlf/grunt-accessibility-html-reporter
