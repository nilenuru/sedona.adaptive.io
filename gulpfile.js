var gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  concatCss = require('gulp-concat'),
  cleanCSS = require('gulp-clean-css'),
  rename = require("gulp-rename"),
  //postcss = require('gulp-postcss'),
  watch = require('gulp-watch');

  gulp.task('sass', function(){
      return gulp.src('source/sass/**/*.scss')
          .pipe(sass())
          .pipe(gulp.dest('source/css'))
          .pipe(browserSync.reload({stream: true}))
  });

  gulp.task('browser-sync', function() {
      browserSync({
          server: {
              baseDir: 'source'
          },
          notify: false
      });
  });

  gulp.task('default', function() {
    return gulp.src('source/css/*.css')
      .pipe(concatCss('style.css'))
      .pipe(cleanCSS({
        compatibility: 'ie8'
      }))
      //  .pipe(postcss())
      .pipe(rename('style_min.css'))
      .pipe(gulp.dest('source/css'))
  });

  gulp.task('watch', function() {
      gulp.watch('source/sass/**/*.scss', gulp.parallel('sass'));
  });
  gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch'));
