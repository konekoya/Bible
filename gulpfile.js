var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')({lazy: true});
var del = require('del');
var cssnano = require('cssnano');
var mainBowerFiles = require('main-bower-files');

// Temporary fix, remove this plugin after upgrade to Gulp 4
var runSequence = require('run-sequence');

gulp.task('help',$.taskListing);

gulp.task('bower-scripts', ['clean-scripts'], () =>{
  return gulp
    .src(mainBowerFiles('**/*.js'))
    .pipe($.plumber())
    // .pipe($.uglify())
    // .pipe($.concat('lib.js'))
    .pipe(gulp.dest(config.temp + 'js/libs/'));
});

gulp.task('scripts', ['bower-scripts'], () => {
  log('Analyzing source with JSHint and JSCS');
  return gulp
    .src(config.jsAll)
    .pipe($.if(args.verbose, $.print()))
    .pipe($.plumber())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    // .pipe($.uglify())
    // .pipe($.concat('bible.js'))
    .pipe(gulp.dest(config.temp + 'js/'));
});

gulp.task('scripts:full', ['bower-scripts'], () => {
  log('Analyzing source with JSHint and JSCS');
  return gulp
    .src([config.scripture, config.js])
    .pipe($.if(args.verbose, $.print()))
    .pipe($.plumber())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.uglify())
    .pipe($.concat('bible.js'))
    .pipe(gulp.dest(config.build + 'js'));
});

gulp.task('bower-styles', ['clean-styles'], () =>{
  return gulp
    .src(mainBowerFiles('**/*.css'))
    .pipe($.csslint('./csslintrc.json'))
    .pipe($.csslint.reporter())
    .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
    // .pipe($.postcss([
    //   cssnano()
    // ]))
    // .pipe($.concat('lib.css'))
    .pipe(gulp.dest(config.temp + 'css/'));
});

gulp.task('styles', ['bower-styles'], () => {
  log('Compiling SCSS --> CSS');
  return gulp
    .src(config.scss)
    .pipe($.sassGlob())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.csslint('./csslintrc.json'))
    .pipe($.csslint.reporter())
    .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
    // .pipe($.postcss([
    //   cssnano()
    // ]))
    // .pipe($.concat('bible.css'))
    .pipe(gulp.dest(config.temp + 'css/'));
});

gulp.task('html', () => {
  return gulp
    .src('./index.html')
    .pipe(gulp.dest(config.build));
});

// gulp.task('images', () => {
// });


gulp.task('fonts', ['clean-fonts'], () => {
  log('Copying fonts to build directory');
  return gulp
    .src(config.fonts)
    .pipe(gulp.dest(config.temp + 'fonts/'));
});

gulp.task('clean', () => {
  var delconfig = [].concat(config.build);
  log('Cleaning: ' + $.util.colors.green(delconfig));
  del(delconfig);
});

gulp.task('clean-scripts', () => {
  clean(config.build + 'js');
});

gulp.task('clean-styles', () => {
  clean(config.build + 'css');
});

gulp.task('clean-fonts', () => {
  clean(config.build + 'fonts');
});

gulp.task('clean-images', () => {
  clean(config.build + 'images');
});

gulp.task('webserver', () => {
  log('Starting webserver at port ' + config.port );
  return gulp
    .src(config.src)
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

gulp.task('watch', () => {
  gulp.watch(config.js, ['scripts']);
  gulp.watch(config.scss, ['styles']);
});

gulp.task('default', () => {
  runSequence('html', 'fonts', 'scripts', 'styles', 'watch', 'webserver');
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
