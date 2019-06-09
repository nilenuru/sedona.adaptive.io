var gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglifyjs'),
  cleanCSS = require('gulp-clean-css'),
  rename = require("gulp-rename"),
  postcss = require('gulp-postcss'),
  watch = require('gulp-watch');

gulp.task('sass', function() {
  return gulp.src('src/sass/style.scss')
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'src'
    },
    notify: false
  });
});

gulp.task('scripts', function() {
  return gulp.src([
      'src/js/script.js'
    ])
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/js'));
});

/*gulp.task('css-libs', function() {
  return gulp.src('src/css/style.css')
      .pipe(cleanCSS())
      .pipe(rename('style.min.css'))
      //.pipe(concat('style.css'))
      .pipe(gulp.dest('src/css'));
      //.pipe(cleanCSS({compatibility: 'ie8'
      //  .pipe(postcss())
});*/
gulp.task('watch', function() {
  gulp.watch('src/sass/style.scss', gulp.parallel('sass'));
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch(['src/js/common.js', 'src/libs/**/*.js'], gulp.parallel('scripts'));
});

gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch','scripts'));
