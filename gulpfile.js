var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps');

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
