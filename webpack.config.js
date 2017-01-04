const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


// Try this solution
// https://github.com/webpack/webpack/issues/1016#issuecomment-182093533
module.exports = {
  entry: {
    vendor: ['jquery'],
    bible: './src/js/scripture/app.js',
    app: "./src/js/app.js"
  },
  output: {
    path: path.resolve('build/'),
    publicPath: '/build/assets/',
    filename: '[name].js'
  },

  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'bible'],
      minChunks: Infinity
    })
    // new webpack.optimize.CommonsChunkPlugin('bible', 'bible.bundle.js')
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