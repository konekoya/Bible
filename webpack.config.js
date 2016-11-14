const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  entry: ['./src/js/app.js'],
  output: {
    path: path.resolve('build/'),
    publicPath: '/build/assets/',
    filename: 'bundle.js'
  },

  plugins: [
    new ExtractTextPlugin('bundle.css')
  ],

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
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.es6']
  }

};