const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base');
require('shelljs/global');

process.env.NODE_ENV = 'production';

module.exports = merge(baseWebpackConfig, {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: 'dist/',
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  externals: {
    vue: 'vue'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false,
        drop_console: true
      }
    })
  ]
});
