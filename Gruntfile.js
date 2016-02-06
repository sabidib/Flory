module.exports = function(grunt) {
    var fs = require('fs');
    var path = require('path');
    var javascript_source = [
        "src/js/jquery.js",
        "src/js/bootstrap.js",
        "src/js/flory.js",
        "src/js/anchor.js",
        "src/js/main.js",
        "src/js/prettify.js",
    ]

    var css_source = [
        "src/css/bootstrap.css",
        "src/css/font-awesome.css",
        "src/css/main.css"
    ]
    var meta_tags = fs.readFileSync("src/html/meta_tags.html", "utf-8");
    var various_tags = fs.readFileSync("src/html/various_tags.html", "utf-8");
    var link_tags = fs.readFileSync("src/html/link_tags.html", "utf-8");
    var footer = fs.readFileSync("src/html/footer.html", "utf-8");
    var body_header = fs.readFileSync("src/html/body_header.html", "utf-8");


    scripts = javascript_source.map(function(entry) {
        return "<script src='" + entry.replace("src/", "") + "'></script>"
    }).join("\n")

    css_scripts = css_source.map(function(entry) {
        return "<link href='" + entry.replace("src/", "") + "' type='text/css' rel='stylesheet' />";
    }).join("\n")



    grunt.initConfig({
        clean: {
            start: ['dist/'],
        },
        concat: {
            javascript: {
                src: javascript_source,
                dest: 'dist/production/js/main.js',
            },
            javascript_final_header: {
                src: ["header.txt", "dist/production/js/main.js"],
                dest: "dist/production/js/main.js"
            },
            css: {
                src: css_source,
                dest: "dist/production/css/main.css"
            }
        },
        uglify: {
            javascript: {
                files: {
                    'dist/production/js/main.min.js': [
                        "dist/production/js/main.js"
                    ]
                },
            }
        },
        cssmin: {
            css: {
                files: [{
                    expand: true,
                    cwd: 'dist/production/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/production/css',
                    ext: '.min.css'
                }]
            }
        },
        copy: {
            dev: {
                files: [{
                    expand: true,
                    cwd: "src/js/",
                    src: ['*'],
                    dest: "dist/test/js/",
                }, {
                    expand: true,
                    cwd: "src/css/",
                    src: ['*'],
                    dest: "dist/test/css/",
                }, {
                    src: ["src/robots.txt"],
                    dest: "dist/test/robots.txt",
                }, {
                    src: ["src/favicon.ico"],
                    dest: "dist/test/favicon.ico",
                }, {
                    expand : true,
                    cwd: "src/fonts/",
                    src: ['*'],
                    dest: "dist/test/fonts/",
                }]
            },
            release: {
                files:[ {
                    src: ["src/robots.txt"],
                    dest: "dist/production/robots.txt",
                }, {
                    src: ["src/favicon.ico"],
                    dest: "dist/production/favicon.ico",
                }, {
                    expand : true,
                    cwd: "src/fonts/",
                    src: ['*'],
                    dest: "dist/production/fonts/",
                }]
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-template');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');


    function ensureDirectoryExistence(filePath) {
        var dirname = path.dirname(filePath);
        if (fs.existsSync(dirname)) {
            return true;
        }
        ensureDirectoryExistence(dirname);
        fs.mkdirSync(dirname);
    }


    grunt.registerTask("generate_html_production", "Generate production html code", function() {

        var html_list_to_build = fs.readdirSync("src/html/body");

        html_list_to_build.map(function(entry) {
            var production_template = fs.readFileSync("src/template/production.html.tpl", "utf-8")
            var html_entry_file_path = "src/html/body/" + entry;
            var html_entry_production_file_path = "dist/production/" + entry;
            var file_body = fs.readFileSync(html_entry_file_path, "utf-8");
            var obj = {
                meta_tags: meta_tags,
                various_tags: various_tags,
                link_tags: link_tags,
                css_scripts: "<link href='css/main.min.css' type='text/css' rel='stylesheet' />",
                body: file_body,
                footer: footer,
                body_header : body_header,
                scripts: "<script src='js/main.min.js'></script>",
            }
            ensureDirectoryExistence(html_entry_production_file_path);
            var result = grunt.template.process(production_template, {
                data: obj
            })
            fs.writeFileSync(html_entry_production_file_path, result);

        })

    });
    grunt.registerTask("generate_html_dev", "Generate development html code", function() {

        var html_list_to_build = fs.readdirSync("src/html/body");

        html_list_to_build.map(function(entry) {
            var test_template = fs.readFileSync("src/template/test.html.tpl", "utf-8")
            var html_entry_file_path = "src/html/body/" + entry;
            var html_entry_test_file_path = "dist/test/" + entry;
            var file_body = fs.readFileSync(html_entry_file_path, "utf-8");
            var obj = {
                meta_tags: meta_tags,
                various_tags: various_tags,
                link_tags: link_tags,
                css_scripts: css_scripts,
                body: file_body,
                footer: footer,
                body_header : body_header,
                scripts: scripts,
            }
            ensureDirectoryExistence(html_entry_test_file_path);
            var result = grunt.template.process(test_template, {
                data: obj
            })
            fs.writeFileSync(html_entry_test_file_path, result);
        })

    })
    grunt.registerTask('dev', ["generate_html_dev", "copy:dev"]);
    grunt.registerTask('release', ["concat:javascript", "uglify:javascript", "concat:css", "cssmin:css", "generate_html_production", "copy:release"]);
    grunt.registerTask('default', ['clean', 'dev', 'release'])


};
