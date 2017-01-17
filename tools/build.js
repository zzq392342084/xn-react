'use strict';
// Summary:
//  Build for production
const shell = require('shelljs');
const path = require('path');
const helpers = require('./cli/helpers');
const webpack = require('webpack');
const prodConfig = require('../webpack.prod.config');
const webpackCommonConfig = require('../webpack.common.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dllConfig = require('../webpack.dll.config.js');
const dllContextPath = prodConfig.output.path;
const manifestPath = path.join(dllContextPath, 'vendors-manifest.json');
const ddlBundleConfigPath = path.join(dllContextPath,"bundle-config.json");
const AssetsPlugin = require('assets-webpack-plugin');
const indexSrcPath = path.join(__dirname,"../src/index.html");
const outputFile = prodConfig.output.filename;


if (
  !shell.test('-e', manifestPath) // dll doesn't exist
 // dll hash has changed
 || !shell.test("-e",outputFile)
) {
  delete require.cache[manifestPath]; // force reload the new manifest
  console.log('vendors emits, building dll...');
  // build dll
  dllConfig.output = {
    path: dllContextPath,
    filename: '[name].[hash].js',
    library: '[name]_library'
  };

  // dllConfig.output.library = dllName;
  dllConfig.plugins.push(new webpack.DllPlugin({
    path: manifestPath,
    name: '[name]_library',
    context: dllContextPath,
  }));
dllConfig.plugins.push(new AssetsPlugin({
	filename: 'bundle-config.json', 
	path: dllContextPath
}));
 Object.assign(dllConfig,webpackCommonConfig);	
  webpack(dllConfig, (err) => {
    if (err) {
      console.log('dll build failed:');
      console.log(err.stack || err);
      return;
    }
    console.log('dll build success.');
   buildAppBundles();
  });
} else {
  console.log('vendors dll is up to date, no need to rebuild.');
  buildAppBundles();
}
function buildAppBundles(){
const ddlBundleConfig = require(ddlBundleConfigPath);
let  ddlBundleName = ddlBundleConfig.vendors.js;
prodConfig.warnings = true;
Object.assign(prodConfig,webpackCommonConfig);	

prodConfig.plugins.push(new webpack.DllReferencePlugin({
    context: dllContextPath,
    manifest: require(manifestPath),
  }));
prodConfig.plugins.push(	new HtmlWebpackPlugin({
            filename: 'index.html',
            chunks: ['main'],
            template: 'index.html',
			bundleName:prodConfig.output.publicPath+ddlBundleName,
            minify: {
				 collapseWhitespace: true,
                collapseInlineTagWhitespace: true,
                removeRedundantAttributes: true,
                removeEmptyAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeComments: true
			}
            
	}));
	const start = new Date().getTime();
webpack(prodConfig, (err, result) => {
  if (err) console.log(err);
  else {
    const end = new Date().getTime();
    console.log('Done, build time: ', end - start, 'ms');
  }
});

}


