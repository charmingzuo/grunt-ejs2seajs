通过grunt任务将ejs模板编译为seajs模块
========
Compile ejs files to seajs module with grunt
========
优点：
--------
- 便于调试
- Easy to debug


- 可用于nodejs
- Nodejs usable


- 避免XSS
- No XSS

---
![alt debugging in chrome](http://ww1.sinaimg.cn/mw690/3e4b2a8dgw1eq5fnb946nj20xf0j9q8e.jpg "debugging in chrome")
---

_为了足够简单，目前只支持 <%= %>， <%- %> 和 <% %> 标签_

_For simple and thin, only support tags <%= %> , <%- %> or <% %>_

--------

Gruntfile.js
--------
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
--------
Files example:
--------
    ..
    |_ tpls/
    | |_ a.ejs
    | |_ b.ejs
    |_ tpls.js <- require this file
    
执行 grun 命令：
--------
Excute grunt command:
--------
    $ grunt ↵
    
    > Running "ejs2seajs:template" (ejs2seajs) task
    > File "src/js/modules/my-module1/tpls.js" created.

    > Running "watch" task
    > Waiting...