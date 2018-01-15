var gulp = require('gulp');
var run = require('gulp-run-command').default;
var path = require('path');
var pug = require('gulp-pug');


gulp.task('views', require('./gulp/views')(gulp, pug));

gulp.task('copy-files', ['views'], require('./gulp/copy-files')(gulp, path));

gulp.task('start', ['copy-files'], require('./gulp/nodemon')(gulp));

gulp.task('default', ['start'], function() {
});