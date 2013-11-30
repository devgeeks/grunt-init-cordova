/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },{% if (min_concat) { %}
    concat: {
      dist: {{% if (lib_dir) { %}
        src: ['<banner:meta.banner>', '{%= lib_dir %}/*.js', '{%= lib_dir %}/**/*.js'],
        dest: 'www/js/<%= pkg.name %>.js'
      {% } %}}
    },
    uglify: {
      dist: {{% if (lib_dir) { %}
        src: [
          '<%= concat.dist.dest %>'
        ],
        dest: 'www/js/<%= pkg.name %>.min.js'
      {% } %}}
    },{% } %}
    watch: {
      files: [
        '<%= jshint.files %>'
      ],
      tasks: ['jshint'{% if (min_concat) { %}, 'concat', 'min'{% } %}]
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
      debug_blackberry10: {
        command: 'cordova build blackberry10 && cordova emulate blackberry10'
      }
    },
    jshint: {
      files: ['Gruntfile.js', '{%= lib_dir || "www/js" %}/*.js', '{%= lib_dir || "www/js" %}/**/*.js'],
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
        browser: true{% } %},
        globals: {
          cordova: true{% if (jquery) { %},
          jQuery: true{% } %}
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  {% if (min_concat) { %}
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  {% } %}

  // Custom tasks
  grunt.registerTask('min', ['uglify']); // polyfil for uglify
  grunt.registerTask('debug','Create a debug build', function(platform) {
    grunt.task.run('jshint'{%= min_concat ? ",'concat','min'" : "" %});
    grunt.task.run('shell:debug_' + platform);
  });

  // Default task
  grunt.registerTask('default', ['jshint'{%= min_concat ? ",'concat','min'" : "" %}]);
  

};
