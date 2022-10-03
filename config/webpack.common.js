const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const target = process.env.NODE_ENV === 'development' ? 'web' : 'browserslist';
const devtool = target === 'web' ? 'inline-source-map' : false;

module.exports = {
	target,
	devtool,
	context: path.resolve(__dirname, '../src'),
	entry: ['@babel/polyfill', '/index.js'],
	output: {
		path: path.resolve(__dirname, '../dist'),
	},
	cache: {
		type: 'filesystem',
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Aerounion',
			favicon: 'assets/icons/favicon.png',
			template: 'template.html',
			filename: 'index.html',
		}),
	],

	module: {
		rules: [
			{
				test: /\.(?:ico|jpe?g|webp|gif|png)$/i,
				type: 'asset/resource',
				// generator: {
				// 	filename: '[path][name]-[hash][ext]',
				// },
			},
			{
				test: /\.(woff2?|svg)$/i,
				type: 'asset/inline',
			},
			{
				test: /\.m?js$/i,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
		],
	},
};
