const path = require('path');

module.exports = {
  entry: ['./src/js/app.js'],
  output: {
    path: path.resolve('build/js'),
    publicPath: '/build/assets/js/',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.(es6|js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style!css'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.es6']
  }

};