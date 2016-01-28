module.exports = function() {
  var build = './build/';

  var config = {
    // webserver port
    port: 8000,

    // Files paths
    build: build,
    bowerDir: './bower_components',
    fonts: './bower_components/font-awesome/fonts/**/*.*',
    scss: './scss/**/*.scss',
    js: './js/**/*.js'
  };

  return config;
};
