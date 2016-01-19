var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')({lazy: true});
var del = require('del');

gulp.task('help',$.taskListing);

gulp.task('scripts', ['clean-scripts'], function() {
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

gulp.task('styles', ['clean-styles'], function() {
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

// gulp.task('clean')

gulp.task('fonts', ['clean-fonts'], function() {
  log('Copying fonts to build directory');
  return gulp
    .src(config.fonts)
    .pipe(gulp.dest(config.build + 'fonts'));
});

gulp.task('clean', function() {
  var delconfig = [].concat(config.build);
  log('Cleaning: ' + $.util.colors.green(delconfig));
  del(delconfig);
});

gulp.task('clean-scripts', function() {
  clean(config.build + 'js');
});

gulp.task('clean-styles', function() {
  clean(config.build + 'css');
});

gulp.task('clean-fonts', function() {
  clean(config.build + 'fonts');
});

gulp.task('clean-images', function() {
  clean(config.build + 'images');
});

gulp.task('watch', function() {
  gulp.watch('./js/*.js', ['js']);
  gulp.watch('./scss/**/*.scss', ['styles']);
});

gulp.task('default', ['fonts', 'scripts', 'styles', 'watch']);

////////////

function clean(path) {
  log('Cleaning ' + $.util.colors.green(path));
  del(path);
}

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
