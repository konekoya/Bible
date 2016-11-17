const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


// Try this solution
// http://stackoverflow.com/questions/35908253/webpack-how-to-bundle-entries-to-multiple-common-chunks-with-commonschunkplugin
module.exports = {
  entry: {
    app: "./src/js/app.js",
    bible: ['./src/js/scripture/app'],
    vendor: ['jquery']
  },
  output: {
    path: path.resolve('build/'),
    publicPath: '/build/assets/',
    filename: 'bundle.js'
  },

  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new webpack.optimize.CommonsChunkPlugin('bible', 'bible.bundle.js'),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
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