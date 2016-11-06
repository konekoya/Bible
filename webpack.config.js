module.exports = {
  entry: ['./src/js/app.js'],
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.(es6|js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.es6']
  }

};