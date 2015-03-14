优点：
--------
- 便于调试
- Easy to debug


- 可用于nodejs
- Nodejs usable


- 避免XSS
- No XSS

---
支持在Chrome开发者工具中断点调试：

Debugging in chrome dev tools:

![alt debugging in chrome](http://ww1.sinaimg.cn/mw690/3e4b2a8dgw1eq5fnb946nj20xf0j9q8e.jpg "debugging in chrome")
---

_为了足够简单，目前只支持 __<%= %>__， __<%- %>__ 和 __<% %>__ 标签_

_For simple and thin, only support tags __<%= %>__ , __<%- %>__ or __<% %>___

--------

安装
--------
Installation
--------


在你的Gruntfile.js所在目录下，执行：

In your project's gruntfile directory, run:

    npm install grunt-ejs2seajs --save-dev

添加下面这句到你的Gruntfile.js中：

Then add this line to your project's gruntfile:

    grunt.loadNpmTasks('grunt-ejs2seajs');


Gruntfile.js
--------
        ejs2seajs: {
            template: {
                src: [
                    'src/js/**/tpls' // target to the "tpls" directories
                ],
                expand: true
            }
        }

        grunt.loadNpmTasks('grunt-ejs2seajs');
    

tpls目录的结构：
--------
example:
--------
    ..
    |_ tpls/
    | |_ a.ejs
    | |_ b.ejs
    |_ tpls.js <- require this file
    
启动 grun：
--------
start grunt:
--------
    $ grunt ↵
    
    > Running "ejs2seajs:template" (ejs2seajs) task
    > File "src/js/modules/my-module1/tpls.js" created.

    > Running "watch" task
    > Waiting...