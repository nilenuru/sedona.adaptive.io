gulp.task('default', function() {
  return gulp.src('src/**/*.*')

    .pipe(gulp.dest(function(file) {
      return file.extname == '.src/js' ? 'js' :
        file.extname == 'src/css' ? 'css' : 'dest';
    }));
});


open-in-browsers
pigments
minimap
autocomplete-paths
