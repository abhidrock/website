(function() {
    'use strict';

    module.exports = function(gulp, pug) {
        return function() {
            gulp.src('pug/**/*.pug')
                .pipe(pug({
                    doctype: 'html',
                    pretty: false
                 }))
                .pipe(gulp.dest('public/'));
        }
    }
})();