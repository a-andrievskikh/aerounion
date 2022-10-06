const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
	output: {
		clean: true,
		filename: 'js/[name].[contenthash].bundle.js',
		assetModuleFilename: '[path][hash][query]',
	},

	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, '../src/assets'),
					to: path.resolve(__dirname, '../dist/assets'),
				},
			],
		}),
	],

	module: {
		rules: [
			{
				test: /\.(c|sa|sc)ss$/i,
				use: [
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
							sourceMap: false,
							modules: false,
						},
					},
					'postcss-loader',
					'sass-loader',
				],
			},
		],
	},

	optimization: {
		minimize: true,
		minimizer: [new CssMinimizerPlugin(), '...'],
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
