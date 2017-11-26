'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const pkg = require('../package.json');
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractLessPlugin = new ExtractTextPlugin({
  filename: "bxui.css"
});

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = function (isMinify) {
  var plugins = [];
  plugins.push(new webpack.DefinePlugin({
    NODE_ENV: '"production"',
    'process.env.NODE_ENV': '"production"'
  }));
  plugins.push(extractLessPlugin);
  if (isMinify) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      }
    }));
  }
  if (config.oss && config.oss.enable) {
    const AliOSSPlugin = require('webpack-alioss-plugin')
    plugins.push(new AliOSSPlugin({
      accessKeyId: config.oss.accessKeyId,
      accessKeySecret: config.oss.accessKeySecret,
      region: config.oss.region,
      bucket: config.oss.bucket,
      prefix: config.oss.prefix + '/' + pkg.version,
      exclude: config.oss.exclude,
      enableLog: config.oss.enableLog,
      ignoreError: config.oss.ignoreError,
      deleteMode: false
    }));
  }
  return {
    context: path.resolve(__dirname, '../'),
    entry: {
      bxs: './packages/bxs.js'
    },
    output: {
      path: config.build.assetsRoot,
      filename: isMinify ? '[name].min.js' : '[name].js',
      library: 'Bxs',
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@packages': resolve('packages')
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: [resolve('packages')]
        },
        {
          test: /\.less$/,
          use: extractLessPlugin.extract({
            use: [{
              loader: "css-loader"
            }, {
              loader: "postcss-loader"
            }, {
              loader: "less-loader"
            }],
            fallback: "style-loader"
          })
        }
      ]
    },
    plugins: plugins
  }
}


