## Advantage:
## 优点：
- Easy to debug
- 便于调试


- Nodejs usable
- 可用于nodejs


- No XSS
- 避免XSS

---
Debugging in chrome dev tools:

支持在Chrome开发者工具中断点调试：

![alt debugging in chrome](http://ww1.sinaimg.cn/mw690/3e4b2a8dgw1eq5fnb946nj20xf0j9q8e.jpg "debugging in chrome")
---

_For simple and thin, only support tags __<%= %>__ , __<%- %>__ or __<% %>___

_为了足够简单，目前只支持 __<%= %>__， __<%- %>__ 和 __<% %>__ 标签_

--------

## Installation
## 安装


In your project's gruntfile directory, run:

在你的Gruntfile.js所在目录下，执行：

```bash
npm install grunt-ejs2seajs --save-dev
```

Then add this line to your project's gruntfile:

添加下面这句到你的Gruntfile.js中：

```javascript
grunt.loadNpmTasks('grunt-ejs2seajs');
```


Usage
---------
```javascript
ejs2seajs: {
    template: {
        src: [
            'src/js/**/tpls' // target to the "tpls" directories
        ],
        expand: true
    }
}
```
    

example directories:

目录结构示例：
```
...
|_ tpls/
| |_ a.ejs
| |_ b.ejs
|_ tpls.js <- require this file
```

then start grunt, you will see the log like this:
    
启动 grun 后看到下面的输出即正常：

```bash
$ grunt ↵

> Running "ejs2seajs:template" (ejs2seajs) task
> File "src/js/modules/my-module1/tpls.js" created.

> Running "watch" task
> Waiting...
```