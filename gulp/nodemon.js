(function() {
    'use strict'

module.exports = function(gulp) {

    return function(cb) {
        var nodemon = require('gulp-nodemon');
        var called = false;

        return nodemon({
            script: './bin/www',
            env: { 'DEBUG': 'webapp:*' },
            ignore: [
                'gulpfile.js',
                'node_modules/'
            ]
        })
        .on('start', function() {
            if(!called) {
                called = true;
                cb();
            }
        })
        .on('restart', function () {
            console.log('restarted!')
          });
        

    };

};
})();