'use strict';

var path = require('path'),
    fs = require('fs');

module.exports = function (grunt) {
    grunt.registerMultiTask('ejs2seajs', 'Convert ejs to seajs module', function () {

        var cwd = process.cwd();

        this.files.forEach(function (f) {
            f.src.filter(function (filepath) {
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('File nout found:"' + filepath);
                    return false;
                }
                if (!grunt.file.isDir(filepath)) {
                    grunt.log.warn('Target is not directory:"' + filepath);
                    return false;
                } else {
                    return true;
                }
            }).forEach(function (dirname) {
                var filePath = path.join(cwd, dirname);

                var files = fs.readdirSync(filePath)
                    .filter(function (basename) {
                        return /\.ejs$/.test(basename);
                    })
                    .map(function (basename) {
                        var filename = path.join(filePath, basename),
                            ejsCode = fs.readFileSync(filename).toString();
                        return {
                            name: basename,
                            code: ejsCode
                        };
                    });

                var modJsCode = parseFiles(files),
                    destFile = dirname + '.js';

                grunt.file.write(destFile, modJsCode);
                grunt.log.writeln('File "' + destFile + '" created.');
            });
        });
    });
};


/**
 * 转换模版为模块（将模版内容创建独立的模块，并以require方式替换js模块中的引用）
 * @param {Array<{code:String, name:String}>} files js模块源码
 * @author jameszuo
 */
function parseFiles(files) {

    var tpls = files.map(function (f) {
        var name = f.name.replace(/\.[^/.]+$/, ''),
            code = f.code,
            fn = codeToFunction(code);

        return '"' + name + '": ' + fn.toString();
    }).join(',\n');

    return 'define(function (require, exports, module) {\n' +
        'var ' +
        "__a={'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',\"'\":'&#39;'},\n" +
        '__b=/[&<>"\']/g,\n' +
        '__e=function (s) {s = String(s);return s.replace(__b, function (m) {return __a[m]});},\n\n' +
        'tpls = module.exports = {\n' +
        tpls +
        '}' +
        '});';
}


/**
 * 转换模板代码为function
 * @param {String} code 子模板源码
 * @author jameszuo
 */
function codeToFunction(code) {
    if (!code) {
        return "function(){return ''}";
    }

    var regCode = /(?:(?:\r\n|\r|\n)\s*?)?<%([\-=]?)([\w\W\r\n]*?)%>(?:\r\n|\r|\n)?/gmi,
        index = 0,
        exec,
        len,
        res = ['var __p=[],_p=function(s){__p.push(s)};\n'],
        jscode,
        eq;

    while (exec = regCode.exec(code)) {

        len = exec[0].length;

        if (index !== exec.index) {
            res.push(";_p('");
            res.push(
                code
                    .slice(index, exec.index)
                    .replace(/\\/gmi, "\\\\")
                    .replace(/'/gmi, "\\'")
                    .replace(/\r\n|\r|\n/g, "\\r\\n\\\r\n")
            );
            res.push("');\r\n");
        }

        index = exec.index + len;

        eq = exec[1];
        jscode = exec[2];

        // escape html
        if (eq === '=') {
            res.push(';_p(__e(');
            res.push(jscode);
            res.push('));\r\n');
        }
        // no escape
        else if (eq === '-') {
            res.push(';_p(');
            res.push(jscode);
            res.push(');\r\n');
        } else {
            res.push(jscode);
        }
    }

    res.push(";_p('");
    res.push(
        code
            .slice(index)
            .replace(/\\/gmi, "\\\\")
            .replace(/'/gmi, "\\'")
            .replace(/\r\n|\r|\n/g, "\\r\\n\\\r\n")
    );
    res.push("');", '\r\n\r\n', 'return __p.join("");\r\n}', ',\r\n\r\n');
    res.length--;

    return ['function (data) {\r\n', res.join('')].join('');
}
