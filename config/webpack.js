var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '../src/app.js'),
  devtool: 'eval',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'js/app.js'
  },
  stats: {
    colors: true,
    reasons: true

  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        loader: "html"
      },
      {
        test: /\.json$/,
        loader: "json"
      }
    ]
  }
};
