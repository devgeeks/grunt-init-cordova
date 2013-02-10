/*
 * grunt-init-cordova
 * https://gruntjs.com/
 *
 * Copyright (c) 2012 "devgeeks" Tommy-Carlos Williams
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Create a basic Grunt-driven Apache Cordova project.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'NOTE: This init template uses grunt 0.3 even though ' +
  'grunt-init is really intended for grunt 0.4. When 0.4 is officially ' +
  'released, I will update it.' +
  '\n\nThis template uses the paths from the Cordova CLI tool ' +
  'released with Cordova 2.4.0. It makes some assumptions about paths. ' +
  'You might want to look at the Gruntfile.js after init to see if the ' +
  'paths match your particular project.';

exports.after = 'You should now install project dependencies with _npm ' +
  'install_. After that, you may execute project tasks with _grunt_. For ' +
  'more information about installing and configuring grunt, please see ' +
  'the Getting Started guide:' +
  '\n\n' +
  'http://gruntjs.com/getting-started';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = ['grunt.js', 'package.json'];

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({}, [
    // Prompt for these values.
    init.prompt('name'),
    {
      name: 'min_concat',
      message: 'Will files be concatenated or minified?',
      default: 'Y/n',
      warning: 'Yes: min + concat tasks. No: nothing to see here.'
    }
  ], function(err, props) {
    props.min_concat = /y/i.test(props.min_concat);
    props.dom = true;
    props.package_json = true;
    props.test_task = 'jasmine';
    props.file_name = '<%= pkg.name %>';

    // Find the first `preferred` item existing in `arr`.
    function prefer(arr, preferred) {
      for (var i = 0; i < preferred.length; i++) {
        if (arr.indexOf(preferred[i]) !== -1) {
          return preferred[i];
        }
      }
      return preferred[0];
    }

    // Guess at some directories, if they exist.
    var dirs = grunt.file.expand({filter: 'isDirectory'}, '*')
      .map(function(d) { return d.slice(0, -1); });
    props.lib_dir = prefer(dirs, ['www/js', 'src']);
    props.test_dir = prefer(dirs, ['www/spec', 'test', 'tests', 'unit']);

    // Maybe this should be extended to support more libraries. Patches welcome!
    props.jquery = grunt.file.expand({filter: 'isFile'}, '**/jquery*.js').length > 0;

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // All done!
    done();
  });

};
