var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('js', function() {
    return gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('build/js'));
});

gulp.task('sass', function() {
    return sass('./scss/style.scss', { style: 'expanded'})
        .pipe(gulp.dest('build/css'));

});

gulp.task('watch', function() {
  gulp.watch('./js/*.js', ['js']);
  gulp.watch('./scss/**/*.scss', ['sass']);
 });

gulp.task('default', ['js', 'sass', 'watch']);
