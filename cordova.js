/*
 * grunt-init-cordova
 * http://devgeeks.org/
 *
 * Copyright (c) 2013 "devgeeks" Tommy-Carlos Williams
 * Licensed under the MIT license.
 * https://github.com/devgeeks/grunt-init-cordova/blob/master/LICENSE-MIT
 */

// Basic template description.
exports.description = 'Create a basic grunt-driven workflow for apache ' +
  'cordova products.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'This template uses the paths from the Cordova CLI tool ' +
  'released with Cordova 2.4.0. It makes some assumptions about paths. ' +
  'You might want to look at the grunt.js file after init to see if the ' +
  'paths match your particular project.\n\n' +
  'After answering the questions, you should now install project ' +
  'dependencies with _npm install_. After that, you may execute project tasks ' +
  'with _grunt_. For more information about installing and configuring grunt, ' +
  'please see the Getting Started guide:' +
  '\n\n' +
  'http://gruntjs.com/getting-started';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = ['grunt.js', 'package.json', 'README.md'];

// The actual init template.
exports.template = function(grunt, init, done) {

  grunt.helper('prompt', {}, [
    // Prompt for these values.
    grunt.helper('prompt_for', 'name'),
    grunt.helper('prompt_for', 'version'),
    // grunt.helper('prompt_for', 'licenses', 'MIT'),
    grunt.helper('prompt_for', 'author_name'),
    // grunt.helper('prompt_for', 'author_email'),
    // grunt.helper('prompt_for', 'author_url'),
    {
      name: 'min_concat',
      message: 'Will files be concatenated or minified?',
      default: 'y/N',
      warning: 'Yes: min + concat tasks. No: nothing to see here.'
    }
  ], function(err, props) {
    props.dom = true;
    console.log(props.min_concat);
    props.min_concat = !/n/i.test(props.min_concat);
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
    var dirs = grunt.file.expandDirs('*')
      .map(function(d) { return d.slice(0, -1); });
    props.lib_dir = prefer(dirs, ['www/js', 'src']);
    props.test_dir = prefer(dirs, ['www/spec', 'test', 'tests', 'unit']);

    // Maybe this should be extended to support more libraries. Patches welcome!
    props.jquery = grunt.file.expandFiles('**/jquery*.js').length > 0;

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // All done!
    done();
  });

};
