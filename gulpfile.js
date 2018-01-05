var gulp = require('gulp');
var run = require('gulp-run-command').default;
var path = require('path');

gulp.task('copy-files', require('./gulp/copy-files')(gulp, path));

gulp.task('start', ['copy-files'], require('./gulp/nodemon')(gulp));

gulp.task('default', ['start'], function() {
});