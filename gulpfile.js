var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('help',$.taskListing);

gulp.task('scripts', function() {
  log('Analyzing source with JSHint and JSCS');
  return gulp
    .src('./js/*.js')
    .pipe($.if(args.verbose, $.print()))
    .pipe($.plumber())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.uglify())
    .pipe($.concat('bible.js'))
    .pipe(gulp.dest(config.build + 'js'));
});

gulp.task('styles', function() {
  log('Compiling SCSS --> CSS');
  return gulp
    .src('./scss/**/*.scss')
    .pipe($.sassGlob())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.csslint('./csslintrc.json'))
    .pipe($.csslint.reporter())
    .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
    .pipe(gulp.dest(config.build + 'css'));
});

gulp.task('fonts', function() {
  log('Copying fonts to build directory');
  return gulp
    .src(config.fonts)
    .pipe(gulp.dest(config.build + 'fonts'));
});

gulp.task('watch', function() {
  gulp.watch('./js/*.js', ['js']);
  gulp.watch('./scss/**/*.scss', ['styles']);
});

gulp.task('default', ['fonts', 'scripts', 'styles', 'watch']);

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
