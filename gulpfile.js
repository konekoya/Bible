var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')({lazy: true});
var del = require('del');
var cssnano = require('cssnano');
var mainBowerFiles = require('main-bower-files');
var runSequence = require('run-sequence');

gulp.task('help',$.taskListing);

gulp.task('bower-scripts', ['clean-scripts'], function(){
  return gulp
    .src(mainBowerFiles('**/*.js'))
    .pipe($.plumber())
    // .pipe($.uglify())
    .pipe($.concat('lib.js'))
    .pipe(gulp.dest(config.build + 'js'));
});

gulp.task('scripts', ['bower-scripts'], function() {
  log('Analyzing source with JSHint and JSCS');
  return gulp
    .src(config.js)
    .pipe($.if(args.verbose, $.print()))
    .pipe($.plumber())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.uglify())
    .pipe($.concat('bible.js'))
    .pipe(gulp.dest(config.build + 'js'));
});

gulp.task('bower-styles', ['clean-styles'], function(){
  return gulp
    .src(mainBowerFiles('**/*.scss'))
    .pipe($.sassGlob())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.csslint('./csslintrc.json'))
    .pipe($.csslint.reporter())
    .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
    .pipe($.postcss([
      cssnano()
    ]))
    .pipe($.concat('lib.css'))
    .pipe(gulp.dest(config.build + 'css'));
});

gulp.task('styles', ['bower-styles'], function() {
  log('Compiling SCSS --> CSS');
  return gulp
    .src(config.scss)
    .pipe($.sassGlob())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.csslint('./csslintrc.json'))
    .pipe($.csslint.reporter())
    .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
    .pipe($.postcss([
      cssnano()
    ]))
    .pipe($.concat('bible.css'))
    .pipe(gulp.dest(config.build + 'css'));
});


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

gulp.task('webserver', function() {
  log('Starting webserver at port ' + config.port );
  return gulp
    .src('./')
    .pipe($.webserver({
      port: config.port,
      livereload: true,
      directoryListing: {
        enable: true,
        path: 'app'
      },
      open: true
    }));
});

gulp.task('watch', function() {
  gulp.watch(config.js, ['scripts']);
  gulp.watch(config.scss, ['styles']);
});

gulp.task('default', function() {
  runSequence('fonts', 'bower-scripts', 'scripts', 'styles', 'watch', 'webserver');
});

//////////// helper functions

function clean(path) {
  log('Cleaning ' + $.util.colors.green(path));
  del.sync(path);
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
