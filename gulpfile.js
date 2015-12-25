var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('js', function() {
  log('Analyzing source with JSHint and JSCS');
  return gulp.src('./js/*.js')
    .pipe($.plumber())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.uglify())
    .pipe($.concat('app.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('sass', function() {
  log('Compiling SCSS --> CSS');
  return gulp.src('./scss/style.scss')
    .pipe($.sassGlob())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
    .pipe(gulp.dest('build/css'));
});

gulp.task('watch', function() {
  gulp.watch('./js/*.js', ['js']);
  gulp.watch('./scss/**/*.scss', ['sass']);
});

gulp.task('default', ['js', 'sass', 'watch']);

////////////

function log(msg) {
  if (typeof(msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.green(msg(item)));
      }
    }
  } else {
    $.util.log($.util.colors.green(msg));
  }
}
