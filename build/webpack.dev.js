const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base');

module.exports = merge(baseWebpackConfig, {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '/dist'),
    publicPath: '/dist/',
    filename: '[name].js'
  },
  devServer: {
    contentBase: './',
    compress: true,
    port: 8000,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: false,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m'
      }
    }
  }
});
