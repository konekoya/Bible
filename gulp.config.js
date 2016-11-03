module.exports = function() {
  const build = './build/';
  const src = './src/'

  const config = {
    // webserver port
    port: 8000,

    // Files paths
    build: build,
    bowerDir: './bower_components',
    fonts: './bower_components/font-awesome/fonts/**/*.*',
    scss: `${src}scss/**/*.scss`,
    jsAll: `${src}js/**/*.js`,
    js: `${src}js/*.js`,
    scripture: `${src}js/scripture/*.js`
  };

  return config;
};
