const path = require('path');
const shell = require('shelljs');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const devConfig = require('../webpack.dev.config');
const webpackCommonConfig = require('../webpack.common.config');
const dllConfig = require('../webpack.dll.config.js');
const dllContextPath = devConfig.devServer.contentBase;
const manifestPath = path.join(dllContextPath, 'vendors-manifest.json');
const ddlBundleConfigPath = path.join(dllContextPath,"bundle-config.json");
const PORT = require('../package.json').webpackDevServerPort;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const indexSrcPath = path.join(__dirname,"../src/index.html")

function startDevServer() {
	const ddlBundleConfig = require(ddlBundleConfigPath);
	let  ddlBundleName = ddlBundleConfig.vendors.js;
	
  devConfig.entry = {
    "main.bundle": [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://localhost:${PORT}${devConfig.output.publicPath}`,
      'webpack/hot/only-dev-server',
      './index',
    ],
  };
 
   
   devConfig.plugins.push(new webpack.DllReferencePlugin({
    context: dllContextPath,
    manifest: require(manifestPath),
  }));
  devConfig.plugins.push(new HtmlWebpackPlugin({
            filename: 'index.html',
            chunks: ['main.bundle'],
            template: 'index.html',
            bundleName: devConfig.output.publicPath+ddlBundleConfig.vendors.js,
            minify: false 
        }));

  Object.assign(devConfig,webpackCommonConfig);	
  new WebpackDevServer(webpack(devConfig), {
    publicPath: devConfig.output.publicPath,
    contentBase: devConfig.devServer.contentBase,
    hot: true,
    noInfo: false,
    quiet: false,
    https: false,
	inline: true,
	compress: true,
	stats: {
        chunks: false,
        children: false,
        colors: true
    },
    historyApiFallback: true,
  }).listen(PORT, (err) => {
    if (err) {
      console.log(err);
    }
    console.log(`Listening at http://localhost:${PORT}${devConfig.output.publicPath}`);
  });
}




if (
  !shell.test('-e', manifestPath) // dll doesn't exist
 // dll hash has changed
) {
  delete require.cache[manifestPath]; // force reload the new manifest
  console.log('vendors have changed, rebuilding dll...');
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
    startDevServer();
  });
} else {
  console.log('vendors dll is up to date, no need to rebuild.');
  startDevServer();
}
