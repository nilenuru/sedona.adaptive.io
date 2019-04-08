var gulp = require('gulp');
sass = require('gulp-sass');
gulp.task('sass', function() {
  return gulp.src('source/sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('source/css'))
});

gulp.task('watch', function() {
    gulp.watch('source/sass/**/*.scss', gulp.series('sass'));
});
