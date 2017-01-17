const path = require('path');
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
module.exports = {
  devtool: false,
  context: path.join(__dirname, 'src'),
  entry: {
    main: [
	  'babel-polyfill',
      './index'
    ],
  },
  output: {
    path: path.join(__dirname, 'prod'),
    filename: '[name].bundle.js',
    publicPath: './'
  },
  plugins: [
    new LodashModuleReplacementPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({
      ENV: JSON.stringify('prod')
    })
  ]
};
