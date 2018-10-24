const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.base');

module.exports = merge(baseWebpackConfig, {
  context: path.resolve(__dirname, '../'),
  entry: {
    index: './example/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['doc'],
      template: 'index.html',
      filename: 'index.html',
      inject: true
    })
  ],
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
