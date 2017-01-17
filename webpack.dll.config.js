const webpack = require('webpack');
module.exports = {
  entry: {
    vendors: [
      'babel-polyfill',
      'lodash',
	  'history',
      'react',
      'react-dom',
      'react-router',
      'react-redux',
      'react-router-redux',
      'redux',
      'redux-logger',
      'redux-thunk',
    ],
  }, 
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
  ]
};
