module.exports = function(grunt) {
    var fs = require('fs');

    var source = JSON.parse(fs.readFileSync('utils/build/includes/source.json', 'utf8'));

    source = source.map(function(entry) {
        return "src/" + entry;
    });

    grunt.initConfig({
        clean: {
            start: ['build/dist/']
        },
        concat: {
            options: {
                separator: '\n',
            },
            javascript: {
                src: source,
                dest: 'build/dist/js/main.js',
            },
            javascript_final_header: {
                src: ["utils/build/header.txt", "build/dist/js/main.js"],
                dest: "build/dist/js/main.js"
            }
        },
        'closure-compiler': {
            compile_source: {
                closurePath: 'utils/build/compiler',
                js: 'build/dist/js/main.js',
                jsOutputFile: 'build/dist/js/main.min.js',
                maxBuffer: 500,
                options: {
                    compilation_level: 'SIMPLE_OPTIMIZATIONS',
                    language_in: 'ECMASCRIPT5_STRICT'
                }
            }
        },
        'filter_lines': {
            dev: {
                regex: [{
                    re: /\/\*global.*\*\//g,
                    place: ""
                }, {
                    re: /\/\*jslint.*\*\//g,
                    place: ""
                }, {
                    re: /\/\*jshint.*\*\//g,
                    place: ""
                }, {
                    re: /'use strict';/g,
                    place: ""
                }, {
                    re: /"use strict";/g,
                    place: ""
                }]
            }
        },
        'copy': {
            final_build_files: {
                files: [{
                    src: ['build/dist/main.js'],
                    dest: 'build/dist/flory.js',
                }, {
                    src: ['build/dist/main.min.js'],
                    dest: 'build/dist/flory.min.js',
                }, ],

            }

        }
    });


    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-closure-compiler');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerMultiTask('filter_lines',
        "This filters the JavaScript files for any global or jslint headers or 'use strict's ",
        function(arg1, arg2) {
            var res = fs.readFileSync('build/dist/js/main.js', 'utf8');
            var regexes = this.data.regex;
            regexes.map(function(val) {
                res = res.replace(val.re, val.place);
            })
            fs.writeFileSync("build/dist/js/main.js", res);
        });
    grunt.registerTask('default', [
        'clean:start',
        'concat:javascript',
        'filter_lines:dev',
        'closure-compiler:compile_source',
        "concat:javascript_final_header",
        "copy:final_build_files"
    ]);

    grunt.registerTask('demos',[
      

    ])


};