const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {

	// plugins: [
	// 	new CopyPlugin({
	// 		patterns: [
	// 			{
	// 				from: path.resolve(__dirname, '../src/assets'),
	// 				to: path.resolve(__dirname, '../dist/assets'),
	// 			},
	// 		],
	// 	}),
	// ],



	optimization: {
		minimize: true,
		runtimeChunk: {
			name: 'runtime',
		},
	},

	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
});
