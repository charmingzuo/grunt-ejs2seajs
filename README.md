通过grunt任务将ejs模板编译为seajs模块
==================================
Compile ejs files to seajs module with grunt
==================================
----------------------------------
为了足够简单，目前只支持 _<%= %>_， _<%- %>_ 和 _<% %>_ 标签

For simple and thin, only support tags _<%= %>_ , _<%- %>_ or _<% %>_

----------------------------------

Gruntfile.js
----------------------------------
    'use strict';
    module.exports = function (grunt) {

        grunt.initConfig({
            ejs2seajs: {
                template: {
                    src: [
                        'src/js/**/tpls' // target to the "tpls" directories
                    ],
                    expand: true
                }
            },
            watch: {
                template: {
                    files: ['src/js/**/tpls/*.ejs'],
                    tasks: ['ejs2seajs']
                }
            }
        });

        grunt.loadNpmTasks('grunt-ejs2seajs');
        grunt.loadNpmTasks('grunt-contrib-watch');

        grunt.registerTask('default', ['ejs2seajs', 'watch']);
    };


tpls目录的结构：
----------------------------------
Files example:
----------------------------------
    ..
    |_ tpls/
    | |_ a.ejs
    | |_ b.ejs
    |_ tpls.js <- require this file
    
执行 grun 命令：
------
Excute grunt command:
------
    $ grunt ↵
    
    > Running "ejs2seajs:template" (ejs2seajs) task
    > File "src/js/modules/my-module1/tpls.js" created.

    > Running "watch" task
    > Waiting...