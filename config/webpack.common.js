const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');

module.exports = {
	entry: [paths.src + '/index.js'],

	output: {
		path: paths.build,
		filename: '[name].[contenthash].bundle.js',
		assetModuleFilename: 'assets/[name][ext]',
		clean: true,
	},

	plugins: [
		new HtmlWebpackPlugin({
			title: 'Aerounion',
			favicon: paths.src + '/images/favicon.png',
			template: paths.src + '/template.html',
			filename: 'index.html',
		}),
	],

	module: {
		rules: [
			{ test: /\.js$/i, use: ['babel-loader'] },
			{ test: /\.(jpe?g|webp|?:ico|gif|png|)$/i, type: 'asset/resource' },
			{ test: /\.(woff(2)?|eot|ttf|otf|svg|)$/i, type: 'asset/inline' },
		],
	},
};
