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
  'released with Cordova 3.0.0. It makes some assumptions about paths. ' +
  'You might want to look at the Gruntfile.js file after init to see if the ' +
  'paths match your particular project.\n\n' +
  'After answering the questions, you should now install project ' +
  'dependencies with _npm install_. After that, you may execute project tasks ' +
  'with _grunt_. For more information about installing and configuring grunt, ' +
  'please see the Getting Started guide:' +
  '\n\n' +
  'http://gruntjs.com/getting-started';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = ['Gruntfile.js', 'package.json', 'README.md'];

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({}, [
      { name: "name", message: "Enter a name for the project" },
      { name: "version", message: "Enter the version number of the project", default: "0.0.1" },
      { name: "author_name", message: "Enter the name of the author" },
      { name: "min_concat", message: "Will files be concatenated or minified?", default: "y/N" },
    ], function(err, props) {
      props.dom = true;
      props.min_concat = !/y\/N/i.test(props.min_concat);
      props.package_json = true;
      props.file_name = '<%= pkg.name %>';

      // Find the first `preferred` item existing in `arr`.
      function prefer(arr, preferred) {
        for (var i = 0; i < preferred.length; i++) {
          if (arr.indexOf(preferred[i]) !== -1) {
            return preferred[i];
          }
        }
        return "";
      }

      // Guess at some directories, if they exist.
      var dirs = grunt.file.expand({filter: 'isDirectory'}, '*')
        .map(function(d) { return d; });
      props.lib_dir = prefer(dirs, ['src']);

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
