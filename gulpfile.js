var gulp = require('gulp'),
  sass = require('gulp-sass'),
  plumber = require('gulp-plumber'),
  postcss = require('gulp-postcss'),
  browserSync = require('browser-sync'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglifyjs'),
  rename = require("gulp-rename"),
  postcss = require('gulp-postcss'),
  imagemin = require('gulp-imagemin'),
  webp = require('imagemin-webp'),
  extReplace = require('gulp-ext-replace'),
  svgstore = require('gulp-svgstore'),
  posthtml = require('gulp-posthtml'),
  include = require('posthtml-include'),
  del = require('del'),
  watch = require('gulp-watch');

gulp.task('sass', function () {
  return gulp.src('src/sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([require('postcss-cssnext')]))
    .pipe(gulp.dest('src/css'))
    .pipe(postcss([require('cssnano')]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('exportWebP', function () {
  let src = 'src/img/**/*.{png,jpg}';
  let dest = 'src/img';

  return gulp.src(src)
    .pipe(imagemin([
      webp({
        quality: 90
      })
    ]))
    .pipe(extReplace('.webp'))
    .pipe(gulp.dest(dest));
});

gulp.task('sprite', function () {
  return gulp.src('src/img/icons/*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('src/img/icons/'));
});

gulp.task('html', function () {
  return gulp.src('src/*.html')
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest('src'));
});

gulp.task('compress', function () {
  gulp.src('src/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.gifsicle({
        interlaced: true
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.svgo({
        plugins: [{
            removeViewBox: true
          },
          {
            cleanupIDs: false
          }
        ]
      })
    ]))
    .pipe(gulp.dest('src/img'))
});

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: 'src'
    },
    notify: false
  });
});

gulp.task('scripts', function () {
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

gulp.task("copy", function () {
  return gulp.src([
      "src/fonts/**/*.{woff,woff2}",
      "src/img/**",
      "src/js/**"
    ], {
      base: "src"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task('watch', function () {
  gulp.watch('src/sass/style.scss', gulp.parallel('sass'));
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch(['src/js/common.js', 'src/libs/**/*.js'], gulp.parallel('scripts'));
});

gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch', 'scripts', 'exportWebP', 'html', 'compress', 'sprite'));
