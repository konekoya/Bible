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
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: "style!css"
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.es6']
  }

};