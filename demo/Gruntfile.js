'use strict';


/**
 *
 * 可以参考该文件来修改你工程中的代码.
 * You can edit your code like this.
 */

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
    grunt.registerTask('buildtpls', ['ejs2seajs']);
};
