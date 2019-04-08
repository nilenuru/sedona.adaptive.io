var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    gulp = require('gulp'),
    concatCss = require('gulp-concat')

gulp.task('default', function() {
    return gulp.src('source/css/*.css')
        .pipe(concatCss('styles/style111.css'))
        .pipe(gulp.dest('source/css'))
});
