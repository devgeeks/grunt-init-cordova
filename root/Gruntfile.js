/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({{% if (min_concat) { if (package_json) { %}
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },{% } else { %}
    meta: {
      version: '0.1.0',
      banner: '/*! PROJECT_NAME - v<%= meta.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* http://PROJECT_WEBSITE/\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        'YOUR_NAME; Licensed MIT */'
    },{% } } %}
    lint: {
      files: ['grunt.js', '{%= lib_dir %}/**/*.js']
    },{% if (min_concat) { %}
    concat: {
      dist: {
        src: ['<banner:meta.banner>', '<file_strip_banner:{%= lib_dir %}/{%= file_name %}.js>'],
        dest: 'www/js/{%= file_name %}.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'www/js/{%= file_name %}.min.js'
      }
    },{% } %}
    watch: {
      files: ['<config:lint.files>', 'www/spec/**/*.js'],
      tasks: 'lint {%= test_task %}'
    },
    jasmine: {
      all: ['www/spec.html']
    },
    shell: {
      _options: {
        failOnError: true,
        stdout: true
      },
      debug_ios: {
        command: 'cordova build ios && cordova emulate ios'
      },
      debug_android: {
        command: 'cordova build android && cordova emulate android'
      },
      debug_blackberry: {
        command: 'cordova build blackberry && cordova emulate blackberry'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        devel: true,
        eqnull: true{% if (dom) { %},
        browser: true{% } %}
      },
      globals: {{% if (jquery) { %}
        jQuery: true
      {% } %}}
    }{% if (min_concat) { %},
    uglify: {}{% } %}
  });

  grunt.loadNpmTasks('grunt-jasmine-task');
  grunt.loadNpmTasks('grunt-shell');

  // Default task
  grunt.registerTask('default', 'lint {%= test_task %}{%= min_concat ? " concat min" : "" %}');
  
  // Custom tasks
  grunt.registerTask('test', '{%= test_task %}');
  grunt.registerTask('debug:ios', 'lint {%= test_task %}{%= min_concat ? " concat min" : "" %} shell:debug_ios');
  grunt.registerTask('debug:android', 'lint {%= test_task %}{%= min_concat ? " concat min" : "" %} shell:debug_android');
  grunt.registerTask('debug:blackberry', 'lint {%= test_task %}{%= min_concat ? " concat min" : "" %} shell:debug_blackberry');

};
