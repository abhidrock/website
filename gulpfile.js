var gulp = require('gulp');
var run = require('gulp-run-command').default;
var path = require('path');
var pug = require('gulp-pug');
var livereload = require('gulp-livereload');


gulp.task('views', require('./gulp/views')(gulp, pug));

gulp.task('copy-files', ['views'], require('./gulp/copy-files')(gulp, path));

gulp.task('start', ['copy-files'], require('./gulp/nodemon')(gulp, livereload));

gulp.task('default', ['start'], function() {
    //gulp.watch('src/**/*.js', ['start']);
    gulp.watch('pug/**/*.pug', ['views']);
});