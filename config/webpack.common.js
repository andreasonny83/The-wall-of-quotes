const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const helpers = require('./helpers');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts',
  },

  resolve: {
    extensions: ['', '.js', '.ts']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['ts-loader', 'angular2-template']
      }, {
        test: /\.html$/,
        loader: 'html'
      }, {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      }, {
        test: /\.css$/,
        include: helpers.root('public'),
        loader: ExtractTextPlugin.extract('css!postcss')
      }, {
        test: /\.css$/,
        include: helpers.root('src'),
        loader: 'raw!postcss'
      }, {
        test: /\.json/,
        include: helpers.root('src'),
        loader: 'file?name=[name].[ext]'
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),


    new CopyWebpackPlugin([
      { from: 'src/assets', to: 'assets' }
    ]),
  ]
};
