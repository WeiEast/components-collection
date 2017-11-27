'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const pkg = require('../package.json');
const webpack = require('webpack')
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = function (isMixed) {
  var plugins = [];

  const ExtractTextPlugin = require("extract-text-webpack-plugin");
  const extractLessPlugin = new ExtractTextPlugin({
    filename: "components/[name]/[name].css"
  });

  plugins.push(new webpack.DefinePlugin({
    NODE_ENV: '"production"',
    'process.env.NODE_ENV': '"production"'
  }));
  !isMixed && plugins.push(extractLessPlugin);
  // plugins.push(new webpack.optimize.UglifyJsPlugin({
  //   compress: {
  //     warnings: true,
  //     drop_console: true,
  //     // dead_code: false,
  //     // drop_debugger: true,
  //     // passes: 2
  //   }
  // }));
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

  const mixedCss = [
    {
      loader: "css-loader"
    }, {
      loader: "postcss-loader"
    }, {
      loader: "less-loader"
    }
  ];
  const exportCss = extractLessPlugin.extract({
    use: [{
      loader: "css-loader"
    }, {
      loader: "postcss-loader"
    }, {
      loader: "less-loader"
    }],
    fallback: "style-loader"
  });

  return {
    context: path.resolve(__dirname, '../'),
    entry: {
      Toast: './packages/components/Toast/Toast.js',
      MessageBox: './packages/components/MessageBox/MessageBox.js'
    },
    output: {
      path: config.build.assetsRoot,
      filename: 'components/[name]/' + (isMixed ? '[name].mixed.js' : '[name].js'),
      library: ["Bxs", "[name]"],
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
          use: isMixed ? mixedCss : exportCss
        }
      ]
    },
    plugins: plugins
  }
}






