var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var uglify = require('gulp-uglify');
var minifyCSS  = require('gulp-minify-css');
var rename = require("gulp-rename");
var livereload = require('gulp-server-livereload');

var bundler = watchify(browserify({
  entries: ['./src/app.jsx'],
  transform: [reactify],
  extensions: ['.jsx'],
  debug: true,
  cache: {},
  packageCache: {},
  fullPaths: true
}));

var bundle = function() {
  return bundler
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('main.js'))
    .pipe(buffer())
    //.pipe(uglify())
    .pipe(gulp.dest('./js/'))
};
bundler.on('update', bundle);

gulp.task('build', function() {
  bundle()
});

gulp.task('serve', function(done) {
  gulp.src('')
    .pipe(livereload({
      port: 9999,
      livereload: {
        enable: true,
        filter: function(filePath, cb) {
          cb( (/main\.js/.test(filePath)) || (/style\.min\.css/.test(filePath)))
        }
      },
      open: true
    }));
});

gulp.task('minify-css', function() {
    return gulp.src('./css/style.css')
        .pipe(minifyCSS({
            keepBreaks: true,
        }))
        .pipe(rename(function(path) {
          path.basename += ".min";
          path.extname = ".css";
        }))
        .pipe(gulp.dest('./css/'));
});

gulp.task('watch', function() {
  gulp.watch('./css/style.css', ['minify-css']);
});

gulp.task('default', ['minify-css', 'build', 'serve', 'watch']);
