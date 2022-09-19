const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');

module.exports = {
	entry: [paths.src + './main.js'],

	output: {
		path: paths.build,
		filename: '[name].[contenthash].bundle.js',
		publicPath: '/',
		clean: true,
	},

	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{
					from: paths.public,
					to: 'assets',
					globOptions: {
						ignore: ['*.DS_Store'],
					},
					noErrorOnMissing: true,
				},
			],
		}),
		new HTMLWebpackPlugin({
			title: 'Aerounion',
			favicon: paths.src + './images/favicon.png',
			template: paths.src + './template.html',
			filename: 'index.html',
		}),
	],
	module: {
		rules: [
			{ test: /\.js$/i, use: [babel - loader] },
			{ test: /\.(?:ico|gif|png|jpe?g)$/i, type: 'asset/resource' },
			{ test: /\.(woff(2)?|eot|ttf|otf|svg)$/, type: 'asset/inline' },
		],
	},

	resolve: {
		modules: [paths.src, 'node_modules'],
		extentions: ['.js', '.jsx', '.json'],
		alias: {
			'@': paths.src,
			assets: paths.public,
		},
	},
};
