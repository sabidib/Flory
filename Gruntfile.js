module.exports = function(grunt) {
    var fs = require('fs');
    var argparse = require("argparse");
    var parser = new argparse.ArgumentParser();
    parser.addArgument(['--include'], {
        action: 'store',
        defaultValue: 'utils/build/includes/source.json'
    });
    parser.addArgument(['--externs'], {
        action: 'append',
        defaultValue: ['./externs/common.js']
    });
    parser.addArgument(['--minify'], {
        action: 'storeTrue',
        defaultValue: false
    });
    parser.addArgument(['--output'], {
        defaultValue: 'build/flory.js'
    });
    parser.addArgument(['--sourcemaps'], {
        action: 'storeTrue',
        defaultValue: true
    });
    var args = parser.parseArgs();
    console.log(args);
    var output_file = args.output;
    
    var min_output_file = "";
    if (args.minify == true) {
        min_output_file = args.output
        min_output_file += ".min";
        // min_output_file.splice(min_output_file.length - 1, 0, "min");
        // min_output_file = min_output_file.join(".")
    }


    var defaultTask = []
    if (args.minify == true) {
        defaultTask = [
            'clean:start',
            'concat:javascript',
            'filter_lines:dev',
            'closure-compiler:compile_source',
            "concat:javascript_final_header",
            "copy:final_build_files",
            "copy:final_minified_build_files"
        ]
    } else {
        defaultTask = [
            'clean:start',
            'concat:javascript',
            'filter_lines:dev',
            "concat:javascript_final_header",
            "copy:final_build_files"
        ]
    }


    var source = [];

    [args.include].map(function(file){
        source = source.concat(JSON.parse(fs.readFileSync(file, 'utf8')))
    })
    source = source.map(function(entry) {
        return "src/" + entry;
    });

    grunt.initConfig({
        clean: {
            start: ['build/']
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
                src: ["utils/build/header.txt", "build/dist/js/main.js","utils/build/footer.js"],
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
                    // compilation_level: 'SIMPLE_OPTIMIZATIONS',
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
                src: 'build/dist/js/main.js',
                dest: output_file,
            },
            final_minified_build_files: {
                src: 'build/dist/js/main.min.js',
                dest: min_output_file,
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


    grunt.registerTask('default', defaultTask);




};
