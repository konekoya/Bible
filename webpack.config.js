const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');


module.exports = {
  devtool: '#inline-source-map',
  entry: {
    vendor: ['jquery'],
    // bible: './src/js/scripture/app.js',
    app: "./src/js/app.js"
  },
  output: {
    path: path.resolve('build/'),
    publicPath: '/build/assets/',
    filename: '[name].js'
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
    new DashboardPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor'],
      minChunks: Infinity
    })
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
