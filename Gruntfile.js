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


// module.exports = function(grunt) {
//     var fs = require('fs');

//     var production_header = fs.readFileSync('src/html/production_header.html', "utf8");
//     var test_header = fs.readFileSync('src/html/test_header.html', "utf8");
//     var production_footer = fs.readFileSync('src/html/production_footer.html', "utf8");
//     var test_footer = fs.readFileSync('src/html/test_footer.html', "utf8");
//     var body_header = fs.readFileSync('src/html/body_header.html', "utf8");
//     var resume_html = fs.readFileSync('src/html/resume.html', "utf8");
//     var body_footer = fs.readFileSync('src/html/body_footer.html', "utf8");

//     var javascript_files_to_use = [
//         "src/js/jquery.js",
//         "src/js/typed.js",
//         "src/js/main.js",
//         "src/js/highlight.pack.js",
//         "src/js/flory.js",
//         "src/js/events.js",
//         "src/js/modernizr.js"
//     ]
//     var javascript_test_files_to_use = [

//     ]

//     var to_use_for_includes = javascript_files_to_use.concat(javascript_test_files_to_use)
//     javascript_includes_for_test_footer = to_use_for_includes.map(function(entry) {
//         return "<script src='" + entry.replace("src/", "") + "'></script>"
//     }).join("\n")
//     fs.writeFile("src/html/test_footer.html", javascript_includes_for_test_footer, function() {})

//     // Project configuration.
//     grunt.initConfig({
//         pkg: grunt.file.readJSON('package.json'),
//         uncss: {
//             dist: {
//                 files: {
//                     'build/temp/css/prestyle.css': ['src/index.html']
//                 },
//                 options: {
//                     stylesheets: [
//                         "css/fonts.css",
//                         "css/resume.css",
//                         "css/font-awesome.css"
//                     ]
//                 }

//             }
//         },
//         concat: {
//             options: {
//                 separator: '\n',
//             },
//             css: {
//                 src: [
//                     "src/css/main.css",
//                     "src/css/monokai-sublime.css",
//                     "build/temp/css/prestyle.css"
//                 ],
//                 dest: "build/dist/css/main.css"
//             },
//             javascript: {
//                 src: javascript_files_to_use,
//                 dest: 'build/dist/js/main.js',
//             },
//         },
//         uglify: {
//             my_target: {
//                 files: {
//                     'build/dist/js/main.min.js': [
//                         "build/dist/js/main.js"
//                     ]
//                 },
//             }
//         },
//         cssmin: {
//             target: {
//                 files: [{
//                     expand: true,
//                     cwd: 'build/dist/css',
//                     src: ['*.css', '!*.min.css'],
//                     dest: 'build/dist/css',
//                     ext: '.min.css'
//                 }]
//             }
//         },
//         copy: {
//             production: {
//                 files: [
//                     // includes files within path
//                     {
//                         cwd: "src/",
//                         expand: true,
//                         src: ['img/*'],
//                         dest: 'build/dist/',
//                     }, {
//                         cwd: "src/",
//                         expand: true,
//                         src: ['css/font/*'],
//                         dest: 'build/dist/',
//                     }, {
//                         cwd: "src/",
//                         expand: true,
//                         src: ['fonts/*'],
//                         dest: 'build/dist/'
//                     }, {
//                         src: ['src/favicon.ico'],
//                         dest: 'build/dist/favicon.ico',
//                     }, {
//                         src: ['src/google8fb703da56b22ec5.html'],
//                         dest: 'build/dist/google8fb703da56b22ec5.html',
//                     }, {
//                         src: ['src/resume.pdf'],
//                         dest: 'build/dist/resume.pdf',
//                     }, {
//                         src: ['src/robots.txt'],
//                         dest: 'build/dist/robots.txt',
//                     }, {
//                         src: ['src/shopicruit.py'],
//                         dest: "build/dist/shopicruit.py",
//                     }, {
//                         src: ['src/codereview.js'],
//                         dest: "build/dist/codereview.js"
//                     }, {
//                         src: ['src/login.txt'],
//                         dest: "build/dist/login.txt"
//                     }
//                 ],
//             },
//             test: {
//                 files: [{
//                     cwd: "src/",
//                     expand: true,
//                     src: ['**'],
//                     dest: 'build/test/',
//                 }]
//             }
//         },
//         'template': {
//             'dev': {
//                 'options': {
//                     'data': {
//                         "header": test_header,
//                         "body_header": body_header,
//                         "resume": resume_html,
//                         "body_footer": body_footer,
//                         "footer": test_footer
//                     }
//                 },
//                 'files': {
//                     "build/test/index.html": ["src/templates/test.html.tpl"]
//                 }
//             },
//             'production': {
//                 'options': {
//                     'data': {
//                         "header": production_header,
//                         "body_header": body_header,
//                         "resume": resume_html,
//                         "body_footer": body_footer,
//                         "footer": production_footer
//                     }
//                 },
//                 'files': {
//                     "src/index.html": ["src/templates/production.html.tpl"],
//                     "build/dist/index.html": ["src/templates/production.html.tpl"]
//                 }
//             }
//         },
//         "clean": {
//             start: ["build/"],
//             end: ["src/index.html", "src/index_test.html", "build/temp"]
//         },
//         less: {
//             production: {
//                 files: {
//                     "src/css/resume.css": "jsonresume-theme-samy-abidib/less/index.less"
//                 }
//             }
//         }

//     });

//     grunt.loadNpmTasks('grunt-contrib-clean');
//     grunt.loadNpmTasks('grunt-template');
//     grunt.loadNpmTasks('grunt-contrib-less');
//     grunt.loadNpmTasks('grunt-contrib-concat');
//     grunt.loadNpmTasks('grunt-uncss');
//     grunt.loadNpmTasks('grunt-contrib-uglify');
//     grunt.loadNpmTasks('grunt-contrib-cssmin');
//     grunt.loadNpmTasks('grunt-contrib-copy');

//     // Default task(s).
//     grunt.registerTask('default', ["clean:start", "less", 'copy:production', 'template:production', 'concat:javascript', 'uncss', "concat:css", 'uglify', 'cssmin', 'clean:end', "template:dev", "copy:test"]);
//     grunt.registerTask('doCopy', ['copy']);
//     grunt.registerTask('generate_test', ['template:dev', "copy:test"]);


// };
